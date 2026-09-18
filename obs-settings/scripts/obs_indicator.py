#!/usr/bin/env python3
"""
OBS Studio Visual Action Indicator & Global Hotkey Manager for macOS.
1. Listens to OBS WebSocket events and displays an on-screen HUD pill overlay
   plus native audio cues whenever scenes change or recording toggles.
2. Option + 4: Opens the macOS Finder Movies folder.
3. Option + 5: Copies the latest recording in the Movies folder to clipboard.
4. Option + 6: Shows / closes the OBS Program Preview (toggles OBS to front to verify
   what is being recorded, or dismisses it back to the background).
"""

import sys
import os
import json
import time
import asyncio
import hashlib
import base64
import threading
import subprocess
import ctypes
from ctypes import c_uint32, c_void_p, Structure, POINTER, byref, CFUNCTYPE

import websockets
import AppKit
import Foundation
import objc
from Foundation import NSObject, NSTimer, NSRunLoop

CONFIG_FILE = os.path.expanduser(
    "~/Library/Application Support/obs-studio/plugin_config/obs-websocket/config.json"
)

# --- Carbon Global Hotkey Setup ---
carbon = ctypes.cdll.LoadLibrary("/System/Library/Frameworks/Carbon.framework/Carbon")

class EventHotKeyID(Structure):
    _fields_ = [("signature", c_uint32), ("id", c_uint32)]

class EventTypeSpec(Structure):
    _fields_ = [("eventClass", c_uint32), ("eventKind", c_uint32)]

kEventClassKeyboard = 0x6b657962  # "keyb"
kEventHotKeyPressed = 6
kEventParamDirectObject = 0x2d2d2d2d  # "----"
typeEventHotKeyID = 0x686b6579  # "hkey"
optionKey = 2048  # altKey / optionKey modifier in Carbon

kVK_ANSI_4 = 0x15  # Virtual key code for '4'
kVK_ANSI_5 = 0x17  # Virtual key code for '5'
kVK_ANSI_6 = 0x16  # Virtual key code for '6'

HOTKEY_ID_MOVIES_FOLDER = 1
HOTKEY_ID_COPY_LAST_FILE = 2
HOTKEY_ID_TOGGLE_PREVIEW = 3

carbon.GetEventDispatcherTarget.restype = c_void_p
carbon.InstallEventHandler.argtypes = [c_void_p, c_void_p, c_uint32, POINTER(EventTypeSpec), c_void_p, POINTER(c_void_p)]
carbon.RegisterEventHotKey.argtypes = [c_uint32, c_uint32, EventHotKeyID, c_void_p, c_uint32, POINTER(c_void_p)]
carbon.GetEventParameter.argtypes = [c_void_p, c_uint32, c_uint32, POINTER(c_uint32), c_uint32, POINTER(c_uint32), c_void_p]

EventHandlerProc = CFUNCTYPE(c_uint32, c_void_p, c_void_p, c_void_p)


class IndicatorHUD(NSObject):
    def init(self):
        self = objc.super(IndicatorHUD, self).init()
        if not self:
            return None
        self.win = None
        self.hide_timer = None
        self.title_label = None
        self.sub_label = None
        self.content_view = None
        self.createWindow()
        return self

    def createWindow(self):
        screen = AppKit.NSScreen.mainScreen()
        screen_frame = screen.frame() if screen else AppKit.NSMakeRect(0, 0, 1920, 1080)
        width = 400
        height = 72
        x = (screen_frame.size.width - width) / 2
        y = screen_frame.size.height - height - 55

        frame = AppKit.NSMakeRect(x, y, width, height)
        style = AppKit.NSWindowStyleMaskBorderless

        self.win = AppKit.NSWindow.alloc().initWithContentRect_styleMask_backing_defer_(
            frame, style, AppKit.NSBackingStoreBuffered, False
        )
        self.win.setLevel_(AppKit.NSStatusWindowLevel + 2)
        self.win.setCollectionBehavior_(
            AppKit.NSWindowCollectionBehaviorCanJoinAllSpaces |
            AppKit.NSWindowCollectionBehaviorFullScreenAuxiliary |
            AppKit.NSWindowCollectionBehaviorStationary
        )
        self.win.setBackgroundColor_(AppKit.NSColor.clearColor())
        self.win.setOpaque_(False)
        self.win.setIgnoresMouseEvents_(True)
        self.win.setAlphaValue_(0.0)

        self.content_view = AppKit.NSView.alloc().initWithFrame_(AppKit.NSMakeRect(0, 0, width, height))
        self.content_view.setWantsLayer_(True)
        layer = self.content_view.layer()
        layer.setCornerRadius_(22.0)
        layer.setMasksToBounds_(True)

        # Title Label (top line)
        self.title_label = AppKit.NSTextField.alloc().initWithFrame_(AppKit.NSMakeRect(16, 36, width - 32, 24))
        self.title_label.setFont_(AppKit.NSFont.systemFontOfSize_weight_(16.0, AppKit.NSFontWeightBold))
        self.title_label.setTextColor_(AppKit.NSColor.whiteColor())
        self.title_label.setAlignment_(AppKit.NSTextAlignmentCenter)
        self.title_label.setBezeled_(False)
        self.title_label.setDrawsBackground_(False)
        self.title_label.setEditable_(False)
        self.title_label.setSelectable_(False)

        # Subtitle Label (bottom line)
        self.sub_label = AppKit.NSTextField.alloc().initWithFrame_(AppKit.NSMakeRect(16, 12, width - 32, 20))
        self.sub_label.setFont_(AppKit.NSFont.systemFontOfSize_weight_(13.0, AppKit.NSFontWeightMedium))
        self.sub_label.setTextColor_(AppKit.NSColor.colorWithCalibratedWhite_alpha_(0.85, 1.0))
        self.sub_label.setAlignment_(AppKit.NSTextAlignmentCenter)
        self.sub_label.setBezeled_(False)
        self.sub_label.setDrawsBackground_(False)
        self.sub_label.setEditable_(False)
        self.sub_label.setSelectable_(False)

        self.content_view.addSubview_(self.title_label)
        self.content_view.addSubview_(self.sub_label)
        self.win.setContentView_(self.content_view)
        self.win.orderFrontRegardless()

    def showHUD_(self, info):
        title = info.get("title", "")
        subtitle = info.get("subtitle", "")
        bg_rgb = info.get("bg", (0.12, 0.12, 0.14, 0.94))
        border_rgb = info.get("border", (0.4, 0.4, 0.4, 0.5))
        sound_name = info.get("sound", None)

        if sound_name:
            sound = AppKit.NSSound.soundNamed_(sound_name)
            if sound:
                sound.play()

        # Update layer colors
        layer = self.content_view.layer()
        layer.setBackgroundColor_(
            AppKit.NSColor.colorWithCalibratedRed_green_blue_alpha_(*bg_rgb).CGColor()
        )
        layer.setBorderColor_(
            AppKit.NSColor.colorWithCalibratedRed_green_blue_alpha_(*border_rgb).CGColor()
        )
        layer.setBorderWidth_(1.8)

        self.title_label.setStringValue_(title)
        self.sub_label.setStringValue_(subtitle)

        # Animate in
        self.win.setAlphaValue_(0.98)
        self.win.orderFrontRegardless()

        # Cancel previous hide timer
        if self.hide_timer:
            self.hide_timer.invalidate()
            self.hide_timer = None

        self.hide_timer = NSTimer.scheduledTimerWithTimeInterval_target_selector_userInfo_repeats_(
            2.0, self, "hideHUD:", None, False
        )

    def hideHUD_(self, timer):
        if self.win:
            AppKit.NSAnimationContext.beginGrouping()
            AppKit.NSAnimationContext.currentContext().setDuration_(0.3)
            self.win.animator().setAlphaValue_(0.0)
            AppKit.NSAnimationContext.endGrouping()
        self.hide_timer = None


hud_instance = None
c_handler_ref = None  # Prevent garbage collection of callback


def get_obs_ws_credentials():
    try:
        with open(CONFIG_FILE, "r") as f:
            cfg = json.load(f)
            port = cfg.get("server_port", 4444)
            password = cfg.get("server_password", "")
            return port, password
    except Exception:
        return 4444, ""


def trigger_display(title, subtitle="", bg=(0.12, 0.12, 0.14, 0.94), border=(0.4, 0.4, 0.4, 0.5), sound=None):
    if hud_instance:
        info = {
            "title": title,
            "subtitle": subtitle,
            "bg": bg,
            "border": border,
            "sound": sound
        }
        hud_instance.performSelectorOnMainThread_withObject_waitUntilDone_("showHUD:", info, False)


def copy_last_file_in_movies():
    movies_dir = os.path.expanduser("~/Movies")
    if not os.path.exists(movies_dir):
        trigger_display("⚠️ NO MOVIES FOLDER", "~/Movies directory not found", bg=(0.28, 0.14, 0.04, 0.95), border=(0.9, 0.6, 0.1, 0.8), sound="Basso")
        return

    files = [
        os.path.join(movies_dir, f)
        for f in os.listdir(movies_dir)
        if not f.startswith(".") and os.path.isfile(os.path.join(movies_dir, f))
    ]
    if not files:
        trigger_display("⚠️ NO RECORDINGS FOUND", "Movies folder is empty", bg=(0.28, 0.14, 0.04, 0.95), border=(0.9, 0.6, 0.1, 0.8), sound="Basso")
        return

    latest_file = max(files, key=os.path.getmtime)
    filename = os.path.basename(latest_file)

    try:
        pb = AppKit.NSPasteboard.generalPasteboard()
        pb.clearContents()
        url = Foundation.NSURL.fileURLWithPath_(latest_file)
        pb.writeObjects_([url])
        pb.setString_forType_(latest_file, AppKit.NSPasteboardTypeString)

        types = [str(t) for t in pb.types()]
        if any("file-url" in t or "plain-text" in t for t in types):
            trigger_display(
                "✅  COPIED TO CLIPBOARD",
                subtitle=filename,
                bg=(0.04, 0.22, 0.12, 0.96),
                border=(0.2, 0.9, 0.45, 0.95),
                sound="Ping"
            )
            safe_fn = filename.replace('"', '\\"')
            subprocess.Popen([
                "osascript", "-e",
                f'display notification "{safe_fn}" with title "✅ Copied to Clipboard" subtitle "Ready to paste (Cmd + V)"'
            ])
            print(f"Successfully copied: {filename}", flush=True)
        else:
            trigger_display("⚠️ COPY FAILED", "Pasteboard did not accept data", bg=(0.28, 0.04, 0.04, 0.95), border=(0.95, 0.2, 0.2, 0.9), sound="Basso")
    except Exception as e:
        trigger_display("⚠️ ERROR COPYING", str(e), bg=(0.28, 0.04, 0.04, 0.95), border=(0.95, 0.2, 0.2, 0.9), sound="Basso")


def toggle_obs_preview():
    workspace = AppKit.NSWorkspace.sharedWorkspace()
    obs = next((a for a in workspace.runningApplications() if a.bundleIdentifier() == "com.obsproject.obs-studio"), None)

    if not obs:
        subprocess.Popen(["open", "-a", "OBS"])
        trigger_display(
            "👁️  LAUNCHING OBS",
            subtitle="Opening OBS Studio Preview",
            bg=(0.08, 0.16, 0.24, 0.96),
            border=(0.2, 0.6, 0.9, 0.85),
            sound="Ping"
        )
        return

    if obs.isActive() and not obs.isHidden():
        obs.hide()
        trigger_display(
            "🙈  PREVIEW CLOSED",
            subtitle="OBS Window Dismissed",
            bg=(0.12, 0.12, 0.14, 0.96),
            border=(0.6, 0.6, 0.6, 0.8),
            sound="Pop"
        )
    else:
        obs.activateWithOptions_(AppKit.NSApplicationActivateIgnoringOtherApps)
        trigger_display(
            "👁️  PREVIEW SHOWN",
            subtitle="Viewing OBS Program Preview",
            bg=(0.04, 0.18, 0.22, 0.96),
            border=(0.15, 0.75, 0.85, 0.9),
            sound="Ping"
        )


def hotkey_event_handler(callRef, event, userData):
    hk_id = EventHotKeyID()
    carbon.GetEventParameter(
        event, kEventParamDirectObject, typeEventHotKeyID, None,
        ctypes.sizeof(EventHotKeyID), None, byref(hk_id)
    )

    if hk_id.id == HOTKEY_ID_MOVIES_FOLDER:
        # Option + 4: Open Movies folder in Finder
        movies_dir = os.path.expanduser("~/Movies")
        subprocess.Popen(["open", movies_dir])
        trigger_display(
            "📁  MOVIES FOLDER",
            subtitle="Opened ~/Movies in Finder",
            bg=(0.06, 0.16, 0.22, 0.96),
            border=(0.2, 0.65, 0.85, 0.85),
            sound="Tink"
        )
    elif hk_id.id == HOTKEY_ID_COPY_LAST_FILE:
        # Option + 5: Copy newest file in Movies folder to clipboard
        copy_last_file_in_movies()
    elif hk_id.id == HOTKEY_ID_TOGGLE_PREVIEW:
        # Option + 6: Show / Close Program Preview
        toggle_obs_preview()

    return 0


def setup_carbon_hotkeys():
    global c_handler_ref
    c_handler_ref = EventHandlerProc(hotkey_event_handler)
    spec = EventTypeSpec(kEventClassKeyboard, kEventHotKeyPressed)
    handlerRef = c_void_p()
    target = carbon.GetEventDispatcherTarget()

    carbon.InstallEventHandler(target, c_handler_ref, 1, byref(spec), None, byref(handlerRef))

    # 1. Option + 4 (Open Movies folder)
    h_id_4 = EventHotKeyID(0x48544b59, HOTKEY_ID_MOVIES_FOLDER)
    ref_4 = c_void_p()
    carbon.RegisterEventHotKey(kVK_ANSI_4, optionKey, h_id_4, target, 0, byref(ref_4))

    # 2. Option + 5 (Copy last file in Movies folder to clipboard)
    h_id_5 = EventHotKeyID(0x48544b59, HOTKEY_ID_COPY_LAST_FILE)
    ref_5 = c_void_p()
    carbon.RegisterEventHotKey(kVK_ANSI_5, optionKey, h_id_5, target, 0, byref(ref_5))

    # 3. Option + 6 (Show / Close OBS Program Preview)
    h_id_6 = EventHotKeyID(0x48544b59, HOTKEY_ID_TOGGLE_PREVIEW)
    ref_6 = c_void_p()
    carbon.RegisterEventHotKey(kVK_ANSI_6, optionKey, h_id_6, target, 0, byref(ref_6))

    print("Carbon hotkeys registered: Option+4 (Movies), Option+5 (Copy), Option+6 (Preview)", flush=True)


async def obs_listener_loop():
    while True:
        port, password = get_obs_ws_credentials()
        url = f"ws://127.0.0.1:{port}"
        try:
            async with websockets.connect(url) as ws:
                hello = json.loads(await ws.recv())
                auth = hello.get("d", {}).get("authentication", {})
                challenge = auth.get("challenge")
                salt = auth.get("salt")

                identify_d = {
                    "rpcVersion": 1,
                    "eventSubscriptions": 2047
                }

                if challenge and salt and password:
                    h1 = hashlib.sha256((password + salt).encode("utf-8")).digest()
                    secret = base64.b64encode(h1).decode("utf-8")
                    h2 = hashlib.sha256((secret + challenge).encode("utf-8")).digest()
                    identify_d["authentication"] = base64.b64encode(h2).decode("utf-8")

                await ws.send(json.dumps({"op": 1, "d": identify_d}))
                resp = json.loads(await ws.recv())
                if resp.get("op") != 2:
                    await asyncio.sleep(2)
                    continue

                print("Connected to OBS WebSocket. Listening for events...", flush=True)

                async for raw_msg in ws:
                    msg = json.loads(raw_msg)
                    op = msg.get("op")
                    if op == 5:  # Event
                        event_type = msg.get("d", {}).get("eventType")
                        event_data = msg.get("d", {}).get("eventData", {})

                        if event_type == "CurrentProgramSceneChanged":
                            scene_name = event_data.get("sceneName", "")
                            if scene_name.lower() == "screen":
                                trigger_display(
                                    "🖥️  SCREEN SCENE",
                                    subtitle="Active Program Scene",
                                    bg=(0.08, 0.14, 0.24, 0.95),
                                    border=(0.2, 0.5, 0.9, 0.8),
                                    sound="Tink"
                                )
                            elif scene_name.lower() == "camera":
                                trigger_display(
                                    "📷  CAMERA SCENE",
                                    subtitle="Active Program Scene",
                                    bg=(0.18, 0.10, 0.26, 0.95),
                                    border=(0.65, 0.3, 0.85, 0.8),
                                    sound="Tink"
                                )
                            else:
                                trigger_display(
                                    f"🎬  {scene_name.upper()}",
                                    subtitle="Active Program Scene",
                                    bg=(0.12, 0.12, 0.14, 0.95),
                                    border=(0.4, 0.4, 0.4, 0.6),
                                    sound="Tink"
                                )

                        elif event_type == "RecordStateChanged":
                            output_state = event_data.get("outputState", "")
                            output_active = event_data.get("outputActive", False)

                            if output_state == "OBS_WEBSOCKET_OUTPUT_STARTED" or output_active:
                                trigger_display(
                                    "🔴  RECORDING STARTED",
                                    subtitle="Recording in progress",
                                    bg=(0.28, 0.04, 0.04, 0.96),
                                    border=(0.95, 0.2, 0.2, 0.95),
                                    sound="Ping"
                                )
                            elif output_state == "OBS_WEBSOCKET_OUTPUT_STOPPED" or not output_active:
                                trigger_display(
                                    "⏹️  RECORDING STOPPED",
                                    subtitle="Saved to ~/Movies",
                                    bg=(0.12, 0.12, 0.14, 0.96),
                                    border=(0.6, 0.6, 0.6, 0.8),
                                    sound="Pop"
                                )

        except Exception:
            await asyncio.sleep(2)


def start_background_loop():
    asyncio.run(obs_listener_loop())


def main():
    global hud_instance
    app = AppKit.NSApplication.sharedApplication()
    app.setActivationPolicy_(AppKit.NSApplicationActivationPolicyAccessory)

    hud_instance = IndicatorHUD.alloc().init()

    # Register Option + 4, Option + 5, Option + 6 Global Hotkeys
    setup_carbon_hotkeys()

    # Start OBS event listener thread
    t = threading.Thread(target=start_background_loop, daemon=True)
    t.start()

    app.run()


if __name__ == "__main__":
    main()
