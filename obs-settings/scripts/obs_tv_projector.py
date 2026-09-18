#!/usr/bin/env python3
"""
OBS TV Projector for macOS - put the OBS fullscreen projector on the Samsung TV.

Talks to OBS Studio over its built-in WebSocket server (obs-websocket 5.x) and
uses GetMonitorList + OpenVideoMixProjector, so the projector is created on the
TV display directly instead of on the MacBook screen.

Modes:
  --list                    Show the monitors exactly as OBS numbers them.
  --open                    Open a fullscreen projector on the TV (default).
  --move                    Close every open projector, then open one on the TV.
  --close                   Close every open projector window (best effort; the
                            first run needs Accessibility permission).
  --enable-close-existing   Set BasicWindow.CloseExistingProjectors=true in
                            OBS user.ini (quit OBS first) so opening a projector
                            on a monitor replaces the old one instead of
                            stacking another window.

Options:
  --type program|preview|multiview   Which video mix to project (default: program).
  --monitor N                        Force an OBS monitor index (see --list).
  --name TEXT                        Display name to look for (default: samsung).
"""

import argparse
import base64
import hashlib
import json
import os
import subprocess
import sys
import time
import uuid

OBS_STUDIO_DIR = os.path.expanduser("~/Library/Application Support/obs-studio")
WS_CONFIG_FILE = os.path.join(OBS_STUDIO_DIR, "plugin_config", "obs-websocket", "config.json")
USER_INI_FILE = os.path.join(OBS_STUDIO_DIR, "user.ini")

MIX_TYPES = {
    "program": "OBS_WEBSOCKET_VIDEO_MIX_TYPE_PROGRAM",
    "preview": "OBS_WEBSOCKET_VIDEO_MIX_TYPE_PREVIEW",
    "multiview": "OBS_WEBSOCKET_VIDEO_MIX_TYPE_MULTIVIEW",
}

BUILTIN_MARKERS = ("built-in", "retina", "color lcd", "internal")

CLOSE_PROJECTORS_SCRIPT = """
tell application "System Events"
    tell process "OBS"
        set frontmost to true
        set closedCount to 0
        repeat with w in windows
            try
                if (name of w as text) contains "Projector" then
                    perform action "AXRaise" of w
                    delay 0.15
                    key code 53
                    set closedCount to closedCount + 1
                    delay 0.25
                end if
            end try
        end repeat
        return closedCount
    end tell
end tell
"""


def load_ws_config():
    try:
        with open(WS_CONFIG_FILE) as f:
            cfg = json.load(f)
        return cfg.get("server_port", 4444), cfg.get("server_password", "")
    except Exception:
        return 4444, ""


def connect():
    try:
        from websockets.sync.client import connect as ws_connect
    except ImportError:
        raise RuntimeError(
            "The 'websockets' package is missing. Run this with OBS's Python, e.g. "
            "/opt/homebrew/bin/python3 (pip3 install websockets if needed)."
        )

    import ssl  # noqa: F401  (keeps websockets happy on some builds)

    port, password = load_ws_config()
    ws = ws_connect(f"ws://127.0.0.1:{port}", open_timeout=3, close_timeout=2)

    hello = json.loads(ws.recv(timeout=3))
    auth = hello.get("d", {}).get("authentication", {})
    challenge, salt = auth.get("challenge"), auth.get("salt")

    identify = {"rpcVersion": 1}
    if challenge and salt and password:
        h1 = hashlib.sha256((password + salt).encode("utf-8")).digest()
        secret = base64.b64encode(h1).decode("utf-8")
        h2 = hashlib.sha256((secret + challenge).encode("utf-8")).digest()
        identify["authentication"] = base64.b64encode(h2).decode("utf-8")

    ws.send(json.dumps({"op": 1, "d": identify}))
    resp = json.loads(ws.recv(timeout=3))
    if resp.get("op") != 2:
        ws.close()
        raise RuntimeError("OBS rejected the WebSocket handshake (bad password?).")
    return ws


def request(ws, request_type, request_data=None, timeout=6):
    request_id = str(uuid.uuid4())
    payload = {"op": 6, "d": {"requestType": request_type, "requestId": request_id}}
    if request_data:
        payload["d"]["requestData"] = request_data
    ws.send(json.dumps(payload))

    deadline = time.time() + timeout
    while time.time() < deadline:
        msg = json.loads(ws.recv(timeout=timeout))
        if msg.get("op") == 7 and msg["d"].get("requestId") == request_id:
            return msg["d"]
    raise RuntimeError(f"{request_type} timed out")


def get_monitors(ws):
    response = request(ws, "GetMonitorList")
    status = response.get("requestStatus", {})
    if not status.get("result"):
        raise RuntimeError(f"GetMonitorList failed: {status.get('comment', status)}")
    return response["responseData"]["monitors"]


def describe_monitor(monitor):
    return (
        f"{monitor['monitorIndex']}  {monitor['monitorName']:<28} "
        f"{monitor['monitorWidth']}x{monitor['monitorHeight']} "
        f"at {monitor['monitorPositionX']},{monitor['monitorPositionY']}"
    )


def pick_tv_monitor(monitors, name_hint, forced_index=None):
    if forced_index is not None:
        return next((m for m in monitors if m["monitorIndex"] == forced_index), None)

    for monitor in monitors:
        if name_hint.lower() in monitor["monitorName"].lower():
            return monitor

    externals = [
        m for m in monitors
        if not any(marker in m["monitorName"].lower() for marker in BUILTIN_MARKERS)
    ]
    if externals:
        return max(externals, key=lambda m: m["monitorWidth"] * m["monitorHeight"])
    return None


def close_existing_enabled():
    try:
        with open(USER_INI_FILE) as f:
            lines = f.read().splitlines()
    except OSError:
        return False

    in_section = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("[") and stripped.endswith("]"):
            in_section = stripped[1:-1] == "BasicWindow"
        elif in_section and stripped.split("=", 1)[0].strip().lower() == "closeexistingprojectors":
            return stripped.split("=", 1)[1].strip().lower() == "true"
    return False


def is_obs_running():
    result = subprocess.run(["pgrep", "-x", "OBS"], capture_output=True, text=True)
    return result.returncode == 0


def close_projectors():
    result = subprocess.run(
        ["osascript", "-e", CLOSE_PROJECTORS_SCRIPT], capture_output=True, text=True
    )
    if result.returncode != 0:
        stderr = result.stderr.strip()
        if "assistive access" in stderr or "-25211" in stderr:
            print(
                "⚠️  macOS blocked UI scripting. Grant Accessibility to the Python that runs\n"
                "    this script (System Settings -> Privacy & Security -> Accessibility),\n"
                "    or click the projector window once and press Esc to close it."
            )
        else:
            print(f"⚠️  Could not close projectors via System Events: {stderr}")
        return 0
    return int((result.stdout or "0").strip() or 0)


def cmd_list(args):
    ws = connect()
    monitors = get_monitors(ws)
    print("Monitors as OBS sees them:\n")
    for monitor in monitors:
        line = describe_monitor(monitor)
        if pick_tv_monitor([monitor], args.name) is monitor:
            line += "   <-- TV"
        print("  " + line)

    tv = pick_tv_monitor(monitors, args.name)
    print()
    if tv:
        print(f"TV match: {tv['monitorName']} (monitor index {tv['monitorIndex']})")
    else:
        print(f"No display matched '{args.name}'. Pick an index with --monitor N.")

    print(
        "CloseExistingProjectors: "
        + ("enabled" if close_existing_enabled() else "disabled (projectors can stack on the TV)")
    )
    ws.close()
    return 0


def cmd_open(args):
    ws = connect()
    try:
        monitors = get_monitors(ws)
        tv = pick_tv_monitor(monitors, args.name, args.monitor)
        if not tv:
            print(f"❌ No display matched '{args.name}'. Connected displays:")
            for monitor in monitors:
                print("  " + describe_monitor(monitor))
            return 1

        mix = MIX_TYPES[args.type]
        response = request(
            ws,
            "OpenVideoMixProjector",
            {"videoMixType": mix, "monitorIndex": tv["monitorIndex"]},
        )
        status = response.get("requestStatus", {})
        if not status.get("result"):
            print(f"❌ OBS refused to open the projector: {status.get('comment', status)}")
            return 1

        print(f"✅ {args.type.upper()} projector opened fullscreen on {tv['monitorName']} (monitor {tv['monitorIndex']})")
        if not close_existing_enabled():
            print(
                "⚠️  Tip: run '--enable-close-existing' while OBS is quit so pressing the\n"
                "    hotkey again replaces the TV projector instead of stacking windows."
            )
        return 0
    finally:
        ws.close()


def cmd_close(args):
    if not is_obs_running():
        print("OBS is not running - nothing to close.")
        return 0
    closed = close_projectors()
    if closed:
        print(f"✅ Closed {closed} projector window(s).")
    else:
        print("No projector windows found (or they could not be closed automatically).")
    return 0


def cmd_move(args):
    if is_obs_running():
        closed = close_projectors()
        if closed:
            print(f"Closed {closed} projector window(s) first.")
        time.sleep(0.6)
    return cmd_open(args)


def cmd_enable_close_existing(args):
    if is_obs_running():
        print("❌ OBS is running. Quit OBS first - it rewrites user.ini when it exits.")
        return 1

    try:
        with open(USER_INI_FILE) as f:
            lines = f.read().splitlines()
    except OSError:
        print(f"❌ Could not find {USER_INI_FILE}")
        return 1

    section_start = None
    section_end = len(lines)
    replaced = False

    for index, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith("[") and stripped.endswith("]"):
            if section_start is not None:
                section_end = index
                break
            if stripped[1:-1] == "BasicWindow":
                section_start = index
        elif section_start is not None and stripped.split("=", 1)[0].strip().lower() == "closeexistingprojectors":
            lines[index] = "CloseExistingProjectors=true"
            replaced = True

    if section_start is None:
        if lines and lines[-1].strip():
            lines.append("")
        lines.extend(["[BasicWindow]", "CloseExistingProjectors=true"])
    elif not replaced:
        insert_at = section_end if section_end > section_start else len(lines)
        lines.insert(insert_at, "CloseExistingProjectors=true")

    with open(USER_INI_FILE, "w") as f:
        f.write("\n".join(lines) + "\n")

    print("✅ CloseExistingProjectors=true written to user.ini.")
    print("   Start OBS again - opening a projector on a monitor now replaces the old one.")
    return 0


def main():
    parser = argparse.ArgumentParser(description="Open the OBS fullscreen projector on the Samsung TV.")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--list", action="store_true", help="show monitors as OBS numbers them")
    group.add_argument("--open", action="store_true", help="open a projector on the TV (default)")
    group.add_argument("--move", action="store_true", help="close existing projectors, then open on the TV")
    group.add_argument("--close", action="store_true", help="close every open projector window")
    group.add_argument("--enable-close-existing", action="store_true", help="write CloseExistingProjectors=true to user.ini")
    parser.add_argument("--type", choices=sorted(MIX_TYPES), default="program", help="video mix to project")
    parser.add_argument("--monitor", type=int, help="force an OBS monitor index")
    parser.add_argument("--name", default="samsung", help="display name to look for (default: samsung)")
    args = parser.parse_args()

    if not os.path.exists(WS_CONFIG_FILE):
        print(f"❌ {WS_CONFIG_FILE} not found. Is OBS Studio installed?")
        return 1

    try:
        if args.list:
            return cmd_list(args)
        if args.close:
            return cmd_close(args)
        if args.enable_close_existing:
            return cmd_enable_close_existing(args)
        if args.move:
            return cmd_move(args)
        return cmd_open(args)
    except OSError as exc:
        print(f"❌ Could not reach OBS on 127.0.0.1 — is OBS running and the WebSocket server enabled? ({exc})")
        return 1
    except RuntimeError as exc:
        print(f"❌ {exc}")
        return 1
    except Exception as exc:
        print(f"❌ {exc}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
