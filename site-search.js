/**
 * Hands-On DO Sessions — Site-Wide Search
 * A dependency-free client-side search across every page and section of the project.
 * Opens from the 🔍 Search button in the shared nav, ⌘K / Ctrl+K, or the "/" key.
 */

(function () {
    'use strict';

    const PAGES = {
        'index.html': { step: 'Step 01', label: 'Studio & Rig' },
        'shortcuts.html': { step: 'Step 02', label: 'Shortcut Suite' },
        'obs-implementations.html': { step: 'Step 03', label: 'OBS & Scenes' },
        'obs-settings.html': { step: 'Reference', label: 'OBS Settings Snapshot' },
        'tv-projector.html': { step: 'Reference', label: 'TV Projector' },
        'lighting.html': { step: 'Step 04', label: 'Lighting & Dark' },
        'hard-part.html': { step: 'Step 05', label: 'The Hard Part' },
        'courage.html': { step: 'Step 06', label: 'Courage to DO' },
        'rationale.html': { step: 'Step 07', label: 'The Rationale' },
        'pivot.html': { step: 'Step 08', label: 'The Pivot' },
        'cover.html': { step: 'Step 09', label: 'Official Cover' }
    };

    const SITE_INDEX = [
        // ---------- Step 01: Studio Dashboard & Rig ----------
        { page: 'index.html', anchor: '', icon: '🏠', title: 'Studio Dashboard & Pre-Shoot Rig', desc: 'The Hands-On DO home base: hardware, checklist, curriculum and the Age of AI thought process.', keywords: 'home dashboard studio rig overview mac pro macbook m1 sony zv-1 scarlett 2i2 elgato obs' },
        { page: 'index.html', anchor: 'cover-banner', icon: '🖼️', title: 'Recorded Sessions & Code Vault Cover (1460x752)', desc: 'Official Skool course banner artwork sized exactly to 1460 x 752 px.', keywords: 'cover banner artwork skool course vault 1460 752 graphic' },
        { page: 'index.html', anchor: 'thought-process', icon: '🧠', title: 'The "Age of AI" Thought Process', desc: 'Rigorous architectural specification, tool routing and agentic orchestration instead of blind generation.', keywords: 'age of ai thought process mental models architecture' },
        { page: 'index.html', anchor: 'thought-process', icon: '🧩', title: 'Decomposition & Spec Architecture', desc: 'Moving from vague vibes to deterministic task decomposition and verifiable atomic increments.', keywords: 'decomposition spec architecture task atomic requirements' },
        { page: 'index.html', anchor: 'thought-process', icon: '🧰', title: 'Tool Crafting & Clear Boundaries', desc: 'Equipping agents with schema-validated tools, semantic routers and safety boundaries.', keywords: 'tool crafting boundaries schema validation semantic router agent' },
        { page: 'index.html', anchor: 'thought-process', icon: '✅', title: 'Deterministic Verification & Evals', desc: 'Human-in-the-loop pair programming governed by test suites, evals and runtime validation.', keywords: 'verification evals testing runtime validation human in the loop' },
        { page: 'index.html', anchor: 'thought-process', icon: '🤖', title: 'Resilient Multi-Agent Orchestration', desc: 'Coordinating autonomous subagent pools, stateful handoffs and self-healing pipelines.', keywords: 'multi agent orchestration subagent pool handoff self healing' },
        { page: 'index.html', anchor: 'repos', icon: '📦', title: 'Featured Repositories Walkthrough', desc: 'task-decomposition, semantic-tool-routing-demo, tool-selection-boundary-demo, resilient-subagent-pool-orchestrator, remotion-with-a-prompt and sep-3-agentic-coding.', keywords: 'repos repositories github task-decomposition semantic-tool-routing tool-selection-boundary resilient-subagent-pool remotion sep-3-agentic-coding' },
        { page: 'index.html', anchor: 'schedule', icon: '📅', title: '3-Day Weekly Production Cadence', desc: 'Monday Level 1, Tuesday Level 2, Friday Level 3 shoots and YouTube deep dives.', keywords: 'schedule cadence monday tuesday friday weekly shoots level 1 2 3' },
        { page: 'index.html', anchor: 'curriculum', icon: '📚', title: 'Modular Curriculum Blueprint', desc: 'Progressive beginner, intermediate and advanced session tracks for high retention.', keywords: 'curriculum blueprint beginner intermediate advanced modular tracks' },
        { page: 'index.html', anchor: 'studio-setup', icon: '🏠', title: 'Studio Setup & Room Environment Protocol', desc: 'Flat-room tidy-up, lighting calibration and acoustic noise isolation before every shoot.', keywords: 'studio setup room environment declutter tidy acoustics noise isolation flat' },
        { page: 'index.html', anchor: 'hardware-routing', icon: '⚙️', title: 'Hardware Routing & OBS Studio Configuration', desc: 'Sony ZV-1 zero-latency video route, Scarlett 2i2 audio, Mac encoding and the 3 primary OBS scenes.', keywords: 'hardware routing obs configuration video audio cam link encoder mkv bitrate' },
        { page: 'index.html', anchor: 'confidence-monitor', icon: '🖥️', title: 'TV Confidence Monitor (HDMI Cable)', desc: 'HDMI from the Mac to the TV plus the OBS Fullscreen Projector, so framing and lighting are verified on the big screen.', keywords: 'tv confidence monitor hdmi cable display fullscreen projector framing macbook pro mac m1 eye line' },
        { page: 'index.html', anchor: 'footage-setup', icon: '🎥', title: 'Background Visuals & What\'s On The Footage', desc: 'Optical bokeh, 5600K vs 2700K color separation and total ambient control in a flat room.', keywords: 'background visuals footage bokeh aperture color temperature 5600k 2700k separation' },
        { page: 'index.html', anchor: 'footage-setup', icon: '🗣️', title: 'Scene 1: Talking Head (The Hook)', desc: 'Fullscreen camera feed for hooks, mental models and wrap-ups — the camera scene.', keywords: 'scene 1 talking head camera scene hook fullscreen sony zv-1' },
        { page: 'index.html', anchor: 'footage-setup', icon: '🧑‍💻', title: 'Scene 2: Screen Share + Picture-in-Picture', desc: 'Mac display capture with a 20% facecam PIP for live coding and AI pair programming.', keywords: 'scene 2 screen share pip picture in picture coding facecam editor zoom' },
        { page: 'index.html', anchor: 'footage-setup', icon: '🖥️', title: 'Scene 3: Full Screen Deep Dive', desc: '100% monitor capture for terminal logs, architecture diagrams and multi-agent timelines.', keywords: 'scene 3 full screen monitor deep dive terminal logs architecture' },
        { page: 'index.html', anchor: 'assistant', icon: '🤖', title: 'Production Assistant Protocol', desc: 'The 7-minute launch protocol: lens-only declutter, 3 power switches, 5-second seat-down rule and never-stop stumble recovery.', keywords: 'production assistant protocol 7 minute launch lens only declutter power switches seat down stumble work shoot mac pro' },
        { page: 'index.html', anchor: 'checklist', icon: '📋', title: 'Pre-Shoot & Production Checklist (5 Stages)', desc: 'Storage, production materials, background staging, rig setup and signal testing — 23 trackable items.', keywords: 'checklist pre-shoot 5 stages storage materials background rig testing progress' },
        { page: 'index.html', anchor: 'pipeline', icon: '🚀', title: 'Dual-Distribution Engine: Skool + YouTube', desc: 'Shoot once, publish twice: Skool modules, YouTube segments and MKV-to-MP4 remux ingestion.', keywords: 'pipeline distribution skool youtube remux mkv mp4 publishing repurposing' },

        // ---------- Step 02: Complete Shortcut Suite ----------
        { page: 'shortcuts.html', anchor: '', icon: '⌨️', title: 'Complete Shortcut Suite', desc: 'Six system-level OBS shortcuts for recording, scenes, exports and preview control.', keywords: 'shortcuts hotkeys option key keyboard obs control suite' },
        { page: 'shortcuts.html', anchor: 'suite', icon: '🔴', title: 'Start / Stop Recording (⌥ Option + 1)', desc: 'Toggle recording instantly from any application; HUD confirms 🔴 started / ⏹️ stopped.', keywords: 'option 1 start stop recording toggle hotkey red' },
        { page: 'shortcuts.html', anchor: 'suite', icon: '🖥️', title: 'Screen Scene (⌥ Option + 2)', desc: 'Jump straight to the full-screen macOS display capture scene.', keywords: 'option 2 screen scene display capture coding scene' },
        { page: 'shortcuts.html', anchor: 'suite', icon: '📷', title: 'Camera Scene (⌥ Option + 3)', desc: 'Jump straight to the full-screen camera scene for hooks and eye contact.', keywords: 'option 3 camera scene talking head zv-1 insta360' },
        { page: 'shortcuts.html', anchor: 'suite', icon: '📁', title: 'Open Movies Folder (⌥ Option + 4)', desc: 'Opens ~/Movies in Finder, the OBS default save location.', keywords: 'option 4 movies folder finder recording save location' },
        { page: 'shortcuts.html', anchor: 'suite', icon: '✅', title: 'Copy Last Recording (⌥ Option + 5)', desc: 'Loads the newest MP4/MKV into the clipboard — file for Finder/Slack, path for text editors.', keywords: 'option 5 copy last recording clipboard pasteboard mp4 mkv export' },
        { page: 'shortcuts.html', anchor: 'suite', icon: '👁️', title: 'Show / Close Preview (⌥ Option + 6)', desc: 'Brings OBS to the front for a framing check, then hides it again to clear the screen.', keywords: 'option 6 preview show close toggle obs front hide framing' },
        { page: 'shortcuts.html', anchor: 'scenes', icon: '🎬', title: 'Camera Scene & Screen Scene on the MacBook Pro', desc: 'The two core scenes one keystroke apart: 📷 camera (⌥3) and 🖥️ screen (⌥2).', keywords: 'camera scene screen scene macbook pro scenes two core system level' },

        // ---------- Step 03: OBS Implementations & Scenes ----------
        { page: 'obs-implementations.html', anchor: '', icon: '🛠️', title: 'OBS Implementations & Scenes', desc: 'Chronological log of the OBS automation built for the MacBook Pro studio.', keywords: 'obs implementations scenes automation macbook pro setup studio' },
        { page: 'obs-implementations.html', anchor: 'implementation-log', icon: '🧭', title: 'Session Implementation Log', desc: 'Nine-step chronological breakdown of the workflow automation session.', keywords: 'implementation log session chronological timeline setup report' },
        { page: 'obs-implementations.html', anchor: 'insta360', icon: '📦', title: 'Insta360 Software Installation', desc: 'Insta360 Link Controller installed via Homebrew and the macOS graphical installer.', keywords: 'insta360 link controller homebrew installer camera software' },
        { page: 'obs-implementations.html', anchor: 'hotkeys', icon: '⌨️', title: 'OBS Scene & Recording Hotkeys', desc: 'System-level shortcuts registered in basic.ini and cleanslate.json.', keywords: 'obs hotkeys basic.ini cleanslate.json profiles scene recording' },
        { page: 'obs-implementations.html', anchor: 'hud', icon: '🔴', title: 'Custom On-Screen HUD Indicator', desc: 'obs_indicator.py with AppKit/Foundation and OBS WebSockets, running as a LaunchAgent with pills and audio cues.', keywords: 'hud indicator obs_indicator.py appkit foundation websockets launchagent plist ping pop tink pill' },
        { page: 'obs-implementations.html', anchor: 'secondbrain', icon: '🧠', title: 'Second Brain Reporting', desc: 'Configuration documented into the Azure files Second Brain vault.', keywords: 'second brain reporting azure files vault documentation untitled md' },
        { page: 'obs-implementations.html', anchor: 'movies', icon: '📁', title: 'Workspace Quick Access (⌥ Option + 4)', desc: 'Carbon global hotkey opens ~/Movies in Finder with the Movies Folder HUD.', keywords: 'workspace quick access movies folder finder carbon hotkey' },
        { page: 'obs-implementations.html', anchor: 'clipboard', icon: '📋', title: 'Instant Clipboard Export (⌥ Option + 5)', desc: 'Newest MP4/MKV loaded into a dual pasteboard for instant sharing.', keywords: 'clipboard export dual pasteboard newest recording slack finder path' },
        { page: 'obs-implementations.html', anchor: 'splits', icon: '⏱️', title: 'Time-Based Recording Splits', desc: 'RecSplitFileType and RecSplitFileTime finalize footage exactly every 5 minutes.', keywords: 'recording splits 5 minute recsplitfiletype recsplitfiletime 90mb threshold crash resilient' },
        { page: 'obs-implementations.html', anchor: 'preview', icon: '👁️', title: 'Program Preview Toggle (⌥ Option + 6)', desc: 'Workspace toggle that summons OBS for a framing check and hides it again.', keywords: 'program preview toggle option 6 obs hide front framing check' },
        { page: 'obs-implementations.html', anchor: 'tv-confidence', icon: '🖥️', title: 'TV Confidence Monitor (New Today)', desc: 'HDMI cable from the MacBook Pro to the TV, configured as a dedicated confidence monitor.', keywords: 'tv confidence monitor hdmi cable macbook pro new big screen framing check' },
        { page: 'obs-implementations.html', anchor: 'scenes', icon: '🎬', title: 'The Two Core Scenes on the MacBook Pro', desc: 'Camera scene (⌥3), screen scene (⌥2), recording toggle (⌥1) and preview (⌥6).', keywords: 'core scenes camera screen macbook pro recording toggle preview' },

        // ---------- Step 03 Companion: OBS Settings Snapshot ----------
        { page: 'obs-settings.html', anchor: '', icon: '💾', title: 'OBS Settings Snapshot (Repository Backup)', desc: 'The complete live OBS Studio configuration saved into the repo: profile, scenes, hotkeys and HUD script.', keywords: 'obs settings snapshot backup save restore profile scenes config repository' },
        { page: 'obs-settings.html', anchor: 'manifest', icon: '📦', title: 'What Is In the OBS Snapshot', desc: 'global.ini, user.ini, Untitled profile, cleanslate scenes, obs_indicator.py and the WebSocket plugin config.', keywords: 'manifest files global.ini user.ini basic.ini cleanslate untitled obs_indicator websocket config backup contents' },
        { page: 'obs-settings.html', anchor: 'global', icon: '🌐', title: 'Global Application & UI Layer', desc: 'NeverDisableHotkeys, OpenGL renderer with VSync off, cleanslate active, menu bar control and compact UI.', keywords: 'global application ui layer hotkey focus neverdisablehotkeys renderer opengl vsync systray density' },
        { page: 'obs-settings.html', anchor: 'output', icon: '🎞️', title: 'Recording & Video Pipeline Settings', desc: 'Advanced output, MP4 to ~/Movies, 1080p60 Rec.709 NV12 and 5-minute time-based splits.', keywords: 'recording output video pipeline advanced mp4 movies 1080p60 rec709 nv12 splits 5 minute filename format audio 48khz aac' },
        { page: 'obs-settings.html', anchor: 'hotkeys', icon: '⌨️', title: 'The Six-Keystroke Studio Hotkey Map', desc: '⌥1 record, ⌥2 screen, ⌥3 camera, ⌥4 Movies, ⌥5 clipboard and ⌥6 preview — across three config files.', keywords: 'hotkey map six keystroke studio option 1 2 3 4 5 6 recording screen camera movies clipboard preview' },
        { page: 'obs-settings.html', anchor: 'scenes', icon: '🎬', title: 'Active Scene Collection: cleanslate', desc: 'Camera and screen scenes, Capture Card Device, macOS Screen Capture and the 300 ms Fade transition.', keywords: 'scene collection cleanslate camera screen capture card macos screen capture fade transition json' },
        { page: 'obs-settings.html', anchor: 'hud', icon: '🔴', title: 'HUD Indicator & Automation Script Backup', desc: 'obs_indicator.py pills, audio cues, global hotkeys and the LaunchAgent that keeps it alive.', keywords: 'hud indicator automation script obs_indicator py pills audio cues launchagent plist' },
        { page: 'obs-settings.html', anchor: 'security', icon: '🔐', title: 'Redacted Credentials in the Snapshot', desc: 'AuthSecret, AuthSalt and the WebSocket password are redacted; how to re-set them after a restore.', keywords: 'security credentials redacted authsecret authsalt websocket password secret restore re set' },
        { page: 'obs-settings.html', anchor: 'restore', icon: '♻️', title: 'OBS Backup & Restore Runbook', desc: 'Copy-paste commands to re-capture a snapshot after changes and to rebuild the studio on a new Mac.', keywords: 'backup restore runbook commands snapshot update rebuild new mac terminal copy paste' },

        // ---------- Step 03 Companion: TV Projector Automation ----------
        { page: 'tv-projector.html', anchor: '', icon: '📺', title: 'TV Projector Automation (Option + 7)', desc: 'One keystroke opens or moves the OBS Program fullscreen projector onto the Samsung TV via the OBS WebSocket API.', keywords: 'tv projector automation samsung confidence monitor option 7 hotkey fullscreen projector move display' },
        { page: 'tv-projector.html', anchor: 'problem', icon: '🧩', title: 'The Projector Problem and the Fix', desc: 'Why the projector defaults to the MacBook screen and how name-based Samsung detection fixes it.', keywords: 'problem fix projector defaults macbook display samsung name detection monitor index' },
        { page: 'tv-projector.html', anchor: 'flow', icon: '🔀', title: 'How the TV Projector Works (GetMonitorList + OpenVideoMixProjector)', desc: 'Two WebSocket requests: list monitors, then open the PROGRAM mix fullscreen on the TV monitor index.', keywords: 'getmonitorlist openvideomixprojector websocket program mix monitor index obs 32' },
        { page: 'tv-projector.html', anchor: 'setup', icon: '⚙️', title: 'TV Projector One-Time Setup', desc: 'Install the script, restart the HUD agent and enable CloseExistingProjectors so projector windows never stack.', keywords: 'setup install script launchagent closeexistingprojectors user.ini stacking hotkey restart' },
        { page: 'tv-projector.html', anchor: 'usage', icon: '⌨️', title: 'TV Projector Daily Use & CLI Modes', desc: 'Option+7 in sessions; --open, --move, --close, --list, --type and --monitor for everything else.', keywords: 'usage command line open move close list type preview multiview monitor name flags' },
        { page: 'tv-projector.html', anchor: 'move', icon: '🔁', title: 'Moving a Projector That Is Already Open', desc: 'Close via Escape through System Events and re-open on the TV; Accessibility permission note.', keywords: 'move existing projector close escape system events accessibility permission apple script' },
        { page: 'tv-projector.html', anchor: 'troubleshooting', icon: '🛠️', title: 'TV Projector Troubleshooting', desc: 'WebSocket unreachable, wrong display, stacked windows, blocked AppleScript and dead hotkey fixes.', keywords: 'troubleshooting websocket unreachable wrong display stacked windows assistive access hotkey dead' },
        { page: 'tv-projector.html', anchor: 'protocol', icon: '🔬', title: 'Under the Hood: Projector WebSocket Payload', desc: 'The exact OpenVideoMixProjector JSON request with videoMixType PROGRAM and monitorIndex 1.', keywords: 'under the hood payload json openvideomixprojector videomixtype program monitorindex rpc version 1' },

        // ---------- Step 04: A-Roll Lighting & Darkness ----------
        { page: 'lighting.html', anchor: '', icon: '💡', title: 'A-Roll Lighting & Darkness', desc: 'Low-key cinematic lighting for a standard flat without thousands in studio gear.', keywords: 'lighting darkness a-roll cinematic low key flat studio' },
        { page: 'lighting.html', anchor: 'negative-space', icon: '🌑', title: 'Darkness is Negative Space', desc: 'Start from black and sculpt only the face, hands and warm rim light.', keywords: 'darkness negative space canvas blackout contrast ratio rembrandt' },
        { page: 'lighting.html', anchor: 'overlit-trap', icon: '⚠️', title: 'The Overlit Flat Room Trap', desc: 'Ceiling lights bounce off white walls and destroy cinematic contrast.', keywords: 'overlit trap ceiling light flat room zoom call bad lighting' },
        { page: 'lighting.html', anchor: 'cinematic-formula', icon: '✨', title: 'The Cinematic Darkness Formula', desc: 'Total darkness, one 5600K key light at 45°, Rembrandt contour and a 2700K practical.', keywords: 'cinematic darkness formula key light 5600k 2700k practical rembrandt' },
        { page: 'lighting.html', anchor: 'lighting-blueprint', icon: '🗺️', title: 'The 4-Zone Low-Key Studio Blueprint', desc: 'Key light, negative fill, accent/edge light and controlled falloff with an ASCII layout.', keywords: '4 zone blueprint key light negative fill accent edge falloff honeycomb grid schematic' },
        { page: 'lighting.html', anchor: 'zv1-settings', icon: '📷', title: 'Sony ZV-1 Exposure & Sensor Calibration', desc: 'Manual mode, f/1.8–f/2.2, 1/120s at 60fps, ISO 125–400, 5600K white balance and Clean HDMI.', keywords: 'sony zv-1 exposure settings aperture shutter iso white balance eye af clean hdmi calibration' },
        { page: 'lighting.html', anchor: 'lighting-routine', icon: '💡', title: '5-Minute Pre-Shoot Lighting Routine', desc: 'Kill the room, power the key light, check falloff on the TV confidence monitor, verify IRE and mic position.', keywords: 'pre shoot lighting routine 5 minute shadow falloff tv confidence monitor waveform ire microphone' },
        { page: 'lighting.html', anchor: 'why-low-key', icon: '🎨', title: 'Why Low-Key Lighting Fits "Hands-On DO"', desc: 'Darkness creates focus and intensity; the viewer sees only you, the terminal and the code.', keywords: 'why low key lighting fits aesthetic strategy focus intensity' },

        // ---------- Step 05: The Hard Part ----------
        { page: 'hard-part.html', anchor: '', icon: '🎭', title: 'The Hard Part: Being Yourself', desc: 'Dropping the performance mask and daring to be completely yourself on camera.', keywords: 'hard part being yourself authentic persona vulnerability camera mask' },
        { page: 'hard-part.html', anchor: 'showing-up', icon: '🎬', title: 'Showing Up Isn\'t Just Pressing "Record"', desc: 'The performance mask is exhausting and viewers see through it; real showing up is candid engineering.', keywords: 'showing up record performance mask real showing up candid' },
        { page: 'hard-part.html', anchor: 'authenticity-moat', icon: '🤖', title: 'The Moat of Authenticity in the Age of AI', desc: 'Perfection is a commodity; raw human authenticity is the scarcest asset.', keywords: 'moat authenticity age of ai scarcity natural pace uncopyable style' },
        { page: 'hard-part.html', anchor: 'inner-critic', icon: '🎙️', title: 'Overcoming the Internal Critic', desc: 'Speak to one developer at 11 PM, not the crowd; vulnerability is magnetism.', keywords: 'internal critic lens fear vulnerability magnetism expert burden' },
        { page: 'hard-part.html', anchor: 'rules', icon: '💡', title: 'The 4 Rules for Being Yourself On Camera', desc: 'Breathe and pause, speak your real thoughts, smile at the glitches, care more about them.', keywords: '4 rules being yourself breathe pause real thoughts glitches care' },
        { page: 'hard-part.html', anchor: 'connection', icon: '❤️', title: 'The Reward: True Connection', desc: 'Viewers stop seeing an instructor and start seeing a fellow builder.', keywords: 'reward connection community trust fellow builder' },

        // ---------- Step 06: The Courage to DO ----------
        { page: 'courage.html', anchor: '', icon: '🔥', title: 'The Courage to DO', desc: 'The foundational driver: courage over readiness, bugs on camera and dancing for an empty room.', keywords: 'courage to do key to the game foundational driver readiness' },
        { page: 'courage.html', anchor: 'myth-of-readiness', icon: '⏳', title: 'The Myth of "Feeling Ready"', desc: 'Readiness never arrives; action produces the state you are waiting for.', keywords: 'myth of readiness waiting feeling ready procrastination action' },
        { page: 'courage.html', anchor: 'real-bugs', icon: '🐞', title: 'The Courage to Show Real Bugs on Camera', desc: 'Normalize runtime errors, failed prompts and syntax bugs; trust is built in the struggle.', keywords: 'real bugs errors failed prompts debug trust authentic struggle' },
        { page: 'courage.html', anchor: 'empty-room', icon: '💃', title: 'The Courage to Dance for an Empty Room', desc: 'Perform for the immortal archive, not the live audience count.', keywords: 'empty room dance archive skool live audience patience' },
        { page: 'courage.html', anchor: 'courage-sequence', icon: '⚡', title: 'The 5-Second Pre-Shoot Courage Sequence', desc: 'Clear the lens frame, flip 3 switches, sit down, start recording, "Welcome back to Hands-On DO."', keywords: '5 second countdown courage sequence pre shoot start recording welcome back' },
        { page: 'courage.html', anchor: 'compounding', icon: '📈', title: 'How Courage Compounds into Undeniability', desc: 'Every rep makes the next recording easier and the body of work impossible to ignore.', keywords: 'compounding undeniability reps consistency body of work' },

        // ---------- Step 07: The Rationale ----------
        { page: 'rationale.html', anchor: '', icon: '💃', title: 'Why We DO: The Rationale', desc: 'The founder keeps dancing, compounds the DO vault and helps members frozen in fear.', keywords: 'rationale why we do founder keep dancing compound vault fear' },
        { page: 'rationale.html', anchor: 'dancing-leader', icon: '🕺', title: 'The Leader Dancing When No One Is Dancing', desc: 'Derek Sivers\' "first follower" leadership metaphor and the embedded video.', keywords: 'derek sivers dancing leader first follower youtube video leadership metaphor' },
        { page: 'rationale.html', anchor: 'zero-ai-broll', icon: '🚫', title: 'Zero AI-Generated B-Roll', desc: 'Real engineers smell AI slop instantly; show real hands, real terminal and a real voice.', keywords: 'zero ai broll synthetic stock footage slop real hands terminal authentic' },
        { page: 'rationale.html', anchor: 'early-to-bed', icon: '🛌', title: 'Early to Bed, Energy to Shoot', desc: 'Biological foundation for commanding three shoots a week with verbal clarity.', keywords: 'early to bed energy sleep stamina shoots clarity biological foundation' },
        { page: 'rationale.html', anchor: 'outer-circle', icon: '🌐', title: 'Reaching the Outer Circle', desc: 'A beacon for developers feeling overwhelmed, paralyzed and isolated by AI velocity.', keywords: 'outer circle beacon developers overwhelmed paralyzed isolated ai velocity' },
        { page: 'rationale.html', anchor: 'skills-gap', icon: '⚡', title: 'Filling the Skills Gap with AI', desc: 'Deconstructing real working repositories to bridge the practical execution gap.', keywords: 'skills gap execution gap repositories deconstruction bridging' },
        { page: 'rationale.html', anchor: 'compounding-vault', icon: '📚', title: 'The DO Sessions Pile Up (Compounding)', desc: 'Every recorded session compounds into an evergreen, searchable body of work.', keywords: 'compounding vault sessions pile up evergreen archive body of work' },

        // ---------- Step 08: The Pivot ----------
        { page: 'pivot.html', anchor: '', icon: '🔄', title: 'The Pivot: From 1-on-1s to Asynchronous Vault', desc: 'Retiring unrecorded 1-on-1 workshops in favor of a 3-tier categorized vault on Skool.', keywords: 'pivot 1-on-1 one on one workshops asynchronous vault skool strategic' },
        { page: 'pivot.html', anchor: 'bottleneck', icon: '⏳', title: 'The 1-on-1 Ephemeral Bottleneck', desc: '120 minutes of high-intensity teaching vanished the moment the call ended.', keywords: '1-on-1 bottleneck ephemeral unrecorded zero leverage scheduling barrier london time' },
        { page: 'pivot.html', anchor: 'asynchronous-vault', icon: '🗄️', title: 'The Asynchronous DO Vault', desc: 'Every session recorded, remuxed, tagged and permanently accessible on Skool.', keywords: 'asynchronous vault recorded remuxed tagged skool self paced 4k 1080p' },
        { page: 'pivot.html', anchor: 'tier-curriculum', icon: '🎓', title: 'The 3-Tier Curriculum Structure', desc: 'Level 1 Beginner, Level 2 Intermediate and Level 3 Advanced vault tracks.', keywords: '3 tier curriculum beginner intermediate advanced levels vault structure' },
        { page: 'pivot.html', anchor: 'template-copy', icon: '📝', title: 'The Official New Skool Post Template', desc: 'Copy-ready announcement template for the asynchronous vault launch.', keywords: 'skool post template announcement copy ready launch' },

        // ---------- Step 09: Official Cover ----------
        { page: 'cover.html', anchor: '', icon: '🖼️', title: 'Official Cover Image (1460 x 752 px)', desc: 'The Skool classroom cover artwork, downloadable as PNG and JPG.', keywords: 'cover image artwork 1460 752 download png jpg skool classroom' },
        { page: 'cover.html', anchor: 'specs', icon: '🎯', title: 'Skool Course Dimensions', desc: '1460 x 752 px, 1.94:1 aspect ratio, safe area and weight guidance.', keywords: 'skool dimensions size aspect ratio safe area weight png' },
        { page: 'cover.html', anchor: 'specs', icon: '🎬', title: 'Visual Rig Elements on the Cover', desc: 'Mac Pro tower, Sony ZV-1, Scarlett 2i2 halos and Elgato mic on the artwork.', keywords: 'visual rig elements mac pro sony zv-1 scarlett 2i2 elgato cover artwork' },
        { page: 'cover.html', anchor: 'specs', icon: '📚', title: 'The 3-Tier Vault Badges', desc: 'Beginner, Intermediate and Advanced badges on the cover graphic.', keywords: '3 tier vault badges beginner intermediate advanced cover' },
        { page: 'cover.html', anchor: 'apply', icon: '🚀', title: 'How to Apply This Cover to Your Skool Classroom', desc: 'Download, open Skool classroom, edit course and upload the 1460x752 image.', keywords: 'apply cover skool classroom upload edit course banner how to' }
    ];

    const MAX_RESULTS = 24;
    let overlay = null;
    let input = null;
    let resultsEl = null;
    let metaEl = null;
    let activeIndex = -1;
    let currentResults = [];

    // ---------- Helpers ----------
    function normalize(str) {
        return (str || '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9\s#+.-]/g, ' ').replace(/\s+/g, ' ').trim();
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function highlight(text, tokens) {
        let safe = escapeHtml(text);
        tokens.forEach(function (token) {
            if (token.length < 2) return;
            const escapedToken = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const re = new RegExp('(' + escapedToken + ')', 'ig');
            safe = safe.replace(re, '<mark>$1</mark>');
        });
        return safe;
    }

    function entryHref(entry) {
        return entry.page + (entry.anchor ? '#' + entry.anchor : '');
    }

    function scoreEntry(entry, query, tokens) {
        const title = normalize(entry.title);
        const desc = normalize(entry.desc);
        const keywords = normalize(entry.keywords);
        const haystack = title + ' ' + desc + ' ' + keywords + ' ' + normalize(entry.page) + ' ' + normalize(PAGES[entry.page] ? PAGES[entry.page].label : '');

        for (let i = 0; i < tokens.length; i++) {
            if (haystack.indexOf(tokens[i]) === -1) return -1;
        }

        let score = 0;
        if (title === query) score += 40;
        if (title.indexOf(query) !== -1) score += 25;
        tokens.forEach(function (token) {
            if (title.indexOf(token) !== -1) score += 10;
            if (keywords.indexOf(token) !== -1) score += 6;
            if (desc.indexOf(token) !== -1) score += 4;
        });
        return score;
    }

    function search(query) {
        const normalizedQuery = normalize(query);
        if (!normalizedQuery) return [];
        const tokens = normalizedQuery.split(' ').filter(function (t) { return t.length > 0; });

        return SITE_INDEX
            .map(function (entry) {
                return { entry: entry, score: scoreEntry(entry, normalizedQuery, tokens) };
            })
            .filter(function (r) { return r.score > 0; })
            .sort(function (a, b) { return b.score - a.score; })
            .slice(0, MAX_RESULTS)
            .map(function (r) { return r.entry; });
    }

    // ---------- Rendering ----------
    function renderResults(query) {
        currentResults = search(query);
        activeIndex = currentResults.length ? 0 : -1;

        if (!query) {
            metaEl.textContent = SITE_INDEX.length + ' indexed sections across 9 steps. Try "camera scene", "TV monitor", "shortcuts" or "dancing".';
            resultsEl.innerHTML = '';
            return;
        }

        const tokens = normalize(query).split(' ').filter(function (t) { return t.length > 0; });

        if (!currentResults.length) {
            metaEl.textContent = 'No matches for "' + query + '".';
            resultsEl.innerHTML = '<div class="site-search-empty"><strong>🔍</strong>No sections matched "' + escapeHtml(query) + '".<br>Try a broader term like "scenes", "lighting" or "courage".</div>';
            return;
        }

        metaEl.textContent = currentResults.length + ' result' + (currentResults.length === 1 ? '' : 's') + ' for "' + query + '"';

        resultsEl.innerHTML = currentResults.map(function (entry, index) {
            const page = PAGES[entry.page] || { step: '', label: entry.page };
            return '<a class="site-search-result' + (index === 0 ? ' active' : '') + '" href="' + entryHref(entry) + '" data-index="' + index + '">' +
                '<div class="site-search-result-top">' +
                    '<span class="site-search-step">' + escapeHtml(page.step) + '</span>' +
                    '<span class="site-search-title">' + entry.icon + ' ' + highlight(entry.title, tokens) + '</span>' +
                    '<span class="site-search-page">' + escapeHtml(entry.page) + '</span>' +
                '</div>' +
                '<div class="site-search-desc">' + highlight(entry.desc, tokens) + '</div>' +
            '</a>';
        }).join('');
    }

    function setActive(index) {
        const items = resultsEl.querySelectorAll('.site-search-result');
        if (!items.length) return;
        if (index < 0) index = items.length - 1;
        if (index >= items.length) index = 0;
        items.forEach(function (item) { item.classList.remove('active'); });
        items[index].classList.add('active');
        items[index].scrollIntoView({ block: 'nearest' });
        activeIndex = index;
    }

    function openOverlay(prefill) {
        if (!overlay) return;
        overlay.hidden = false;
        document.body.classList.add('site-search-open');
        input.value = prefill || '';
        renderResults(input.value);
        setTimeout(function () { input.focus(); input.select(); }, 30);
    }

    function closeOverlay() {
        if (!overlay) return;
        overlay.hidden = true;
        document.body.classList.remove('site-search-open');
        input.blur();
    }

    function bindEvents() {
        const trigger = document.getElementById('site-search-trigger');
        if (trigger) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                openOverlay('');
            });
        }

        input.addEventListener('input', function () { renderResults(input.value); });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive(activeIndex + 1);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive(activeIndex - 1);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const items = resultsEl.querySelectorAll('.site-search-result');
                if (items[activeIndex]) items[activeIndex].click();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                closeOverlay();
            }
        });

        resultsEl.addEventListener('click', function (e) {
            if (e.target.closest('.site-search-result')) closeOverlay();
        });

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeOverlay();
        });

        document.addEventListener('keydown', function (e) {
            const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
            const typing = tag === 'input' || tag === 'textarea' || (e.target && e.target.isContentEditable);

            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                overlay.hidden ? openOverlay('') : closeOverlay();
                return;
            }
            if (e.key === '/' && !typing && overlay && overlay.hidden) {
                e.preventDefault();
                openOverlay('');
                return;
            }
            if (e.key === 'Escape' && overlay && !overlay.hidden) {
                closeOverlay();
            }
        });
    }

    function buildOverlay() {
        overlay = document.createElement('div');
        overlay.id = 'site-search-overlay';
        overlay.className = 'site-search-overlay';
        overlay.hidden = true;
        overlay.innerHTML =
            '<div class="site-search-panel" role="dialog" aria-modal="true" aria-label="Search all Hands-On DO content">' +
                '<div class="site-search-head">' +
                    '<span class="site-search-head-icon">🔍</span>' +
                    '<input id="site-search-input" type="search" placeholder="Search all content — scenes, shortcuts, lighting, courage…" autocomplete="off" spellcheck="false">' +
                    '<button type="button" class="site-search-close" id="site-search-close">ESC</button>' +
                '</div>' +
                '<div class="site-search-meta" id="site-search-meta"></div>' +
                '<div class="site-search-results" id="site-search-results"></div>' +
                '<div class="site-search-foot">' +
                    '<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>' +
                    '<span><kbd>↵</kbd> open</span>' +
                    '<span><kbd>esc</kbd> close</span>' +
                    '<span><kbd>⌘</kbd><kbd>K</kbd> or <kbd>/</kbd> toggle</span>' +
                '</div>' +
            '</div>';
        document.body.appendChild(overlay);

        input = document.getElementById('site-search-input');
        resultsEl = document.getElementById('site-search-results');
        metaEl = document.getElementById('site-search-meta');

        document.getElementById('site-search-close').addEventListener('click', closeOverlay);
        bindEvents();
        renderResults('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildOverlay);
    } else {
        buildOverlay();
    }
})();
