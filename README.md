# Hands-On DO Sessions: Building in the Age of AI

Video production, curriculum, and studio hub for Hands-On DO masterclasses shot in-room on Apple M1 Silicon, Sony ZV-1, and Focusrite Scarlett 2i2.

These sessions deconstruct real-world open-source repositories from [github.com/rifaterdemsahin](https://github.com/rifaterdemsahin) and articulate the exact **thought process of how to build software in the age of AI**.

---

## 🧠 The "Age of AI" Thought Process

1. **Decomposition & Spec Architecture**: Transforming ambiguous requirements into atomic, deterministic, and verifiable task specifications before generating code.
2. **Tool Crafting & Strict Boundaries**: Equipping autonomous agents with resilient, schema-validated tools, semantic routers, and safety boundaries.
3. **Deterministic Verification & Evals**: Human-in-the-loop pair programming governed by test suites, behavioral evals, and runtime validation.
4. **Resilient Multi-Agent Orchestration**: Coordinating autonomous subagent pools, stateful handoffs, error escalation policies, and self-healing pipelines.

---

## 📦 Featured Repositories Walkthrough

- [`task-decomposition`](https://github.com/rifaterdemsahin/task-decomposition) — Level 1: Foundational prompt-to-spec decomposition patterns.
- [`semantic-tool-routing-demo`](https://github.com/rifaterdemsahin/semantic-tool-routing-demo) — Level 2: Vector embedding routing for tool selection.
- [`tool-selection-boundary-demo`](https://github.com/rifaterdemsahin/tool-selection-boundary-demo) — Level 2: Boundary test suites preventing invalid tool invocations.
- [`resilient-subagent-pool-orchestrator`](https://github.com/rifaterdemsahin/resilient-subagent-pool-orchestrator) — Level 3: Distributed multi-agent pools with heartbeat and error escalation.
- [`remotion-with-a-prompt`](https://github.com/rifaterdemsahin/remotion-with-a-prompt) — Level 3: AI-driven programmatic video rendering in React.
- [`sep-3-agentic-coding`](https://github.com/rifaterdemsahin/sep-3-agentic-coding) — Level 2: Daily engineering OS with CLI agents and MCP skills.

---

## 📅 Weekly Production Schedule (3 Shoots / Week)
- **Monday (Level 1 — Beginner Sessions)**: AI mental models, environment bootstrapping & repo walkthroughs.
- **Tuesday (Level 2 — Intermediate Sessions)**: Tool routing, safety boundaries, and live agentic pair programming.
- **Friday (Level 3 — Advanced Sessions & YouTube)**: Multi-agent orchestration, complex scaling, and YouTube deep-dive cuts.

---

## 💡 The Founder's "Keep Dancing" Rationale & Leadership Metaphor

Why run live hands-on workshops on Skool when attendance can be sparse?

- **🎬 The Derek Sivers Leadership Metaphor ([Watch on YouTube](https://www.youtube.com/watch?v=fW8amMCVAJQ))**: Leadership starts with a person willing to stand alone, looking ridiculous, dancing on an empty hill before anyone joins. The first follower validates the leader, but the movement only begins because the leader had the courage to dance alone.
- **🚫 Zero AI-Generated B-Roll**: Anyone can prompt synthetic stock video, text-to-speech voiceovers, or abstract slide decks. Real engineers smell AI slop instantly. Erdem **cannot** rely on AI B-roll. He must show his real hands, real terminal, live debugging, and authentic human voice.
- **🛌 Early to Bed, Energy to Shoot**: True hands-on execution cannot be phoned in. It requires immense cognitive presence and verbal clarity. Going to bed early is the biological foundation that gives Erdem the stamina to command 3 shoots a week (Mon, Tue, Fri).
- **🌐 Reaching the Outer Circle**: While close peers already understand the vision, the broader *outer circle*—thousands of developers feeling overwhelmed, paralyzed, and isolated by the AI velocity—needs an accessible beacon.
- **⚡ Filling the Skills Gap with AI**: Viewers don't lack interest; they suffer from a practical execution gap. By deconstructing real working repositories from [github.com/rifaterdemsahin](https://github.com/rifaterdemsahin), Erdem bridges their skills gaps hands-on.

Read the full philosophical breakdown and watch the embedded video at [rationale.html#dancing-leader](file:///Users/rifaterdemsahin/projects/handson-do-sessions/rationale.html#dancing-leader) or online at [https://rifaterdemsahin.github.io/handson-do-sessions/rationale.html#dancing-leader](https://rifaterdemsahin.github.io/handson-do-sessions/rationale.html#dancing-leader).

---

## 📋 5-Stage Studio Production Checklist

1. **Stage 1: Putting Items in Storage (Room Decluttering)**: Clearing laundry, drying racks, desk mugs, loose paperwork, and floor cables out of the camera's sightline.
2. **Stage 2: Getting Production Materials (Retrieving Gear)**: Unpacking Sony ZV-1 camera, Scarlett 2i2 audio interface, Elgato mic, XLR cables, continuous AC dummy battery, Cam Link 4K, and the TV HDMI cable.
3. **Stage 3: Setting the Background & Visual Environment**: Background depth staging, window blinds closed for daylight control, warm background accent lighting, and 45° soft directional key light.
4. **Stage 4: Setting Up the Rig (Hardware & Cabling)**: Eye-level camera mounting with AF-C, Clean HDMI out verification, mic positioned 4–6 inches from mouth with 48V phantom power, Mac M1 connected to wall power, and the **TV confidence monitor** wired via HDMI with the OBS Fullscreen Projector pointed at it.
5. **Stage 5: Testing & OBS Signal Verification**: Calibrating Scarlett gain halos (green/yellow peaks), OBS audio meter (-12dB to -6dB), 15s clapper test for sync offset (50ms–200ms), MKV recording validation, and confirming the live program feed on the TV confidence monitor.

Interactive version with progress tracking available at [index.html#checklist](file:///Users/rifaterdemsahin/projects/handson-do-sessions/index.html#checklist).

---

## 🖥️ TV Confidence Monitor (New Studio Addition)

A cable now runs from the Mac (MacBook Pro / Mac M1) straight into the TV, turning it into a dedicated big-screen confidence monitor for every session:

- **HDMI Route & Input**: Connect the HDMI cable to the TV and switch the TV to the matching HDMI source before the take.
- **Extended Display**: In macOS System Settings → Displays, arrange the TV beside or behind the camera — never inside the lens frame.
- **OBS Fullscreen Projector**: Right-click the OBS Program preview → Fullscreen Projector → select the TV, so the live program feed fills the big screen.
- **Why It Matters**: Framing, lighting falloff, focus drift, and scene state are visible at a glance on a large screen in a way a laptop display hides.
- **Eye-Line Rule**: Keep the TV next to or behind the lens so checking your framing never breaks on-camera eye contact.

Reference: [index.html#confidence-monitor](file:///Users/rifaterdemsahin/projects/handson-do-sessions/index.html#confidence-monitor) and checklist items 22–23 at [index.html#checklist](file:///Users/rifaterdemsahin/projects/handson-do-sessions/index.html#checklist).

---

## 🔥 The Courage to DO: Key to the Game

Technical brilliance without courage is just unpublished code on a local machine. Why courage is the foundational driver of the whole production system:

- **The Courage to Be Imperfect**: Showing real runtime errors, failed prompts, and syntax bugs on camera normalizes the struggle and builds authentic trust.
- **The Courage to Shoot for an Empty Room**: Performing for the immortal archive on Skool rather than waiting for immediate live applause.
- **The 5-Second Courage Countdown**: (5) Clear only what's in the lens frame &rarr; (4) Flip the 3 power switches &rarr; (3) Sit in the chair with mic to mouth &rarr; (2) Hit Start Recording &rarr; (1) *"Welcome back to Hands-On DO."*

Read the full deep-dive at [courage.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/courage.html) or online at [https://rifaterdemsahin.github.io/handson-do-sessions/courage.html](https://rifaterdemsahin.github.io/handson-do-sessions/courage.html).

---

## 🤖 Production Assistant Protocol & Visual Setup

- **The "Work = Shoot" Rule on Mac Pro**: Whenever you sit down to work, code, or debug on the Mac Pro workstation, **turn on OBS/Screen Recording as well**! Never solve hard architectural puzzles or agentic coding sessions in isolation; every hour of genuine problem solving is compounding footage for the Hands-On DO vault.
- **7-Minute Launch Protocol**: "Lens-only" decluttering (never tidy the whole room before shooting), 3-switch hardware boot, 5-second sit-down rule, and the never-stop stumble recovery.
- **Visuals on the Footage**:
  - *Optical Bokeh*: Sony ZV-1 aperture set to `f/1.8`–`f/2.8` creating creamy depth of field from flat walls.
  - *Color Temperature Separation*: 5600K crisp daylight key light on face vs 2700K warm background lamp.
  - *The 3 Scenes*: Scene 1 (Talking Head / Hook) &bull; Scene 2 (Screen Share + 20% PIP Facecam at 135% editor zoom) &bull; Scene 3 (Clean Full Screen Monitor for architecture diagrams and logs).
- **Top Navigation Active Highlighting**: The sticky top menu dynamically highlights the active page across all standalone pills (`.nav-item-active`), dropdown links, and parent dropdown menus (`.nav-dropdown-active`) with glowing indicators and live pulse dots.
- **TV Confidence Monitor**: The TV now hangs off the Mac over HDMI as a big-screen confidence monitor — framing, lighting falloff and scene state are verified on it before every take (see the roadmap above).
- **Site-Wide Search**: The 🔍 Search button in the shared nav (also `⌘K` / `Ctrl+K` / `/`) searches 70+ indexed sections across all 9 pages and deep-links to exact anchors.

---

## 🎭 The Hard Part: Being Yourself on Camera

Technical hurdles and gear setups are solvable problems. The truly hard part of creating hands-on technical content is dropping the performance mask and daring to be completely yourself on camera:

- **The Myth of the YouTube Persona**: You don't need a high-energy broadcast announcer voice. Real developers connect with calm, thoughtful, authentic builders.
- **Vulnerability as an Uncopyable Moat**: In an era where AI can synthesize tutorials, generate slides, and clone code, your genuine, unscripted reasoning and human voice are your only irreplaceable assets.
- **Silence the Inner Director**: Don't pause to judge your accent, your facial expressions, or a minor stumble. Keep typing, keep speaking, keep building.

Read the full deep-dive at [hard-part.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/hard-part.html) or online at [https://rifaterdemsahin.github.io/handson-do-sessions/hard-part.html](https://rifaterdemsahin.github.io/handson-do-sessions/hard-part.html).

---

## 💡 A-Roll Cinematic Lighting: Using Darkness & Light to Shape the Frame

How to achieve cinematic, high-end YouTube/Skool footage in a standard flat room without thousands in studio gear:

- **Darkness is Your Canvas**: Turn off all overhead ceiling lights and blackout window blinds. Don't fight ambient clutter—cast it into shadow.
- **Directional Key Light + Honeycomb Grid**: Position a 5600K softbox at a 45° angle. The grid restricts beam spill, keeping the background in deep moody slate (#0f172a).
- **Negative Fill & Rembrandt Lighting**: Allow one side of your face to fall into natural contour shadow to create dimensional cinematic depth.
- **Warm 2700K Accent Lamp**: Place a warm practical lamp behind your shoulder to sculpt a subtle golden rim, separating you from the dark background.
- **Sony ZV-1 Manual Exposure Settings**: Manual video mode, aperture `f/1.8`–`f/2.2`, shutter speed `1/120s` (at 60fps), `ISO 125`–`400`, custom white balance locked at 5600K, Real-time Eye AF enabled, Clean HDMI Out enabled.

Read the full guide at [lighting.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/lighting.html) or online at [https://rifaterdemsahin.github.io/handson-do-sessions/lighting.html](https://rifaterdemsahin.github.io/handson-do-sessions/lighting.html).

---

## ⌨️ Complete Shortcut Suite & OBS Implementations (New)

The studio control surface is fully documented and one keystroke away. Shortcut | Action | Confirmation:

| Shortcut | Action | Confirmation |
| --- | --- | --- |
| `⌥ Option + 1` | Start / Stop Recording | 🔴 Recording Started / ⏹️ Recording Stopped |
| `⌥ Option + 2` | Screen Scene | 🖥️ Screen Scene |
| `⌥ Option + 3` | Camera Scene | 📷 Camera Scene |
| `⌥ Option + 4` | Open Movies Folder | 📁 Movies Folder (Opened in Finder) |
| `⌥ Option + 5` | Copy Last Recording | ✅ Copied to Clipboard + File Name |
| `⌥ Option + 6` | Show / Close Preview | 👁️ Preview Shown / 🙈 Preview Closed |

- **The Scenes**: 📷 **Camera Scene** (`⌥3`) and 🖥️ **Screen Scene** (`⌥2`) on the MacBook Pro, registered system-level in OBS `basic.ini` and `cleanslate.json`.
- **HUD Indicator**: `obs_indicator.py` (AppKit/Foundation + OBS WebSockets) runs as the LaunchAgent `com.rifaterdemsahin.obs-indicator.plist`, firing floating pills and audio cues on every state change.
- **Automation**: Insta360 Link Controller install, 5-minute time-based recording splits (`RecSplitFileType` / `RecSplitFileTime`), dual-pasteboard clipboard export, `~/Movies` quick access, and the program preview toggle.
- **Source Docs**: [`shortcuts.md`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/shortcuts.md) and [`obs-implementations.md`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/obs-implementations.md).

Interactive pages: [shortcuts.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/shortcuts.html) and [obs-implementations.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/obs-implementations.html).

---

## 🔍 Site-Wide Search (`site-search.js` + `site-search.css`)

Every page and every section of the project is indexed in a dependency-free, client-side search available from the 🔍 **Search** button in the shared top menu on all 9 pages:

- **Coverage**: 70+ indexed entries across all 9 steps — dashboard sections, shortcut keys, OBS scenes, the TV confidence monitor, lighting zones, courage sequences, rationale pillars, pivot tiers, cover specs, and the source markdown docs.
- **Shortcuts**: Open with the nav button, `⌘K` / `Ctrl+K`, or the `/` key. Navigate results with `↑ ↓`, open with `↵`, dismiss with `esc`.
- **Deep Links**: Every result jumps straight to the exact section anchor on the target page.

---

## 📖 Sequential Step-by-Step Reading Roadmap

Every page is logically numbered and interconnected with top stepper banners and bottom jump controls:

1. **Step 01 — Studio Dashboard & Rig ([`index.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/index.html))**: Hardware routing (Sony ZV-1, Scarlett 2i2, Elgato Mic, Mac M1), TV confidence monitor, 5-stage pre-shoot checklist, and the Age of AI thought process.
2. **Step 02 — Complete Shortcut Suite ([`shortcuts.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/shortcuts.html))**: The six `⌥` system-level shortcuts, HUD confirmations, and the camera/screen scenes on the MacBook Pro.
3. **Step 03 — OBS Implementations & Scenes ([`obs-implementations.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/obs-implementations.html))**: Insta360 install, scene hotkeys, HUD indicator LaunchAgent, clipboard export, 5-minute splits, preview toggle, and the TV confidence monitor log.
4. **Step 04 — A-Roll Lighting & Darkness ([`lighting.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/lighting.html))**: Low-key lighting, darkness as a canvas, negative fill, and Sony ZV-1 exposure settings.
5. **Step 05 — The Hard Part: Being Yourself ([`hard-part.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/hard-part.html))**: Dropping the mask, vulnerability as an uncopyable moat, and authentic communication on camera.
6. **Step 06 — The Courage to DO ([`courage.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/courage.html))**: The foundational driver, the myth of readiness, dancing for an empty room, and the 5-second countdown.
7. **Step 07 — Why We DO: The Rationale ([`rationale.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/rationale.html))**: The founder keeps dancing, compounding the DO vault, and helping members frozen in fear.
8. **Step 08 — The Strategic Pivot: 1-on-1s to Vault ([`pivot.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/pivot.html))**: Shifting from unrecorded, unscalable 1-on-1 meetings to an evergreen, 3-tier categorized vault on Skool (Beginner, Intermediate, Advanced).
9. **Step 09 — Official Cover Artwork ([`cover.html`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/cover.html))**: The 1460 x 752 px Skool classroom cover, downloadable as PNG/JPG.

---

## 🔄 The Strategic Pivot: Unrecorded 1-on-1s to Asynchronous Vault

Why retire the old unrecorded 1-on-1 workshops (`Monday Sept 14th @ 7pm-9pm London time`, unrecorded) in favor of the Hands-On DO Vault:
- **Zero Leverage of Unrecorded 1-on-1s**: 120 minutes of high-intensity teaching vanished into the ether the moment the call ended.
- **The Scheduling Barrier**: Busy engineers couldn't make rigid London time slots or commit 12 hours ahead.
- **The 3-Tier Categorized Curriculum**:
  - 🟢 **Level 1: Beginner Vault**: Mental models, environment setup, decomposition, and first agent loops.
  - 🟡 **Level 2: Intermediate Vault**: Semantic routing, tool safety boundaries, multi-modal hooks, and MCP tools.
  - 🔴 **Level 3: Advanced Vault**: Distributed multi-agent swarms, heartbeat recovery, and autonomous production pipelines.
- **Asynchronous Freedom**: Every session is recorded in 4K/1080p, remuxed, tagged, and permanently accessible on Skool for self-paced review.

Read the full pivot rationale and copyable Skool post template at [pivot.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/pivot.html) or online at [https://rifaterdemsahin.github.io/handson-do-sessions/pivot.html](https://rifaterdemsahin.github.io/handson-do-sessions/pivot.html).

---

## 📝 Sticky Notes Bottom Bar & Cookie Persistence

All pages feature a docked, expandable notes bottom bar (`notes-bar.js` + `notes-bar.css`):
- **Cookie Storage**: Auto-saves comments and production ideas to `document.cookie` (`handson_notes` with 365-day expiry) and syncs to `localStorage`.
- **📋 Copy This Note**: One-click copy for the current page's note with markdown formatting.
- **📑 Copy All Notes**: Aggregates notes from all 9 steps into a clean markdown document ready for pasting into Obsidian, Notion, or Slack.
- **Collapsible Dock**: Minimizes to a clean header strip (`▲ Expand / ▼ Minimize`) so reading is never obstructed.

---

## 🖼️ Official Cover Image (1460 x 752 px)

Official course graphic tailored specifically for Skool Community Classrooms and recorded technical video vault cards:
- **Dimensions**: Exactly `1460 x 752 px` (~1.94:1 aspect ratio matching native Skool course specs).
- **Artwork**: Features authentic Apple Mac Pro workstation, Sony ZV-1 camera, Scarlett 2i2 audio interface, and Wave microphone with Rembrandt low-key studio lighting.
- **Branding**: Displays the 3 progressive mastery tiers (Level 1: Beginner, Level 2: Intermediate, Level 3: Advanced) and GitHub repository link.
- **Files**: Lossless PNG at [`cover.png`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/cover.png) and [`assets/cover-1460x752.png`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/assets/cover-1460x752.png); JPG versions at [`cover.jpg`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/cover.jpg) and [`assets/cover-1460x752.jpg`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/assets/cover-1460x752.jpg).
- **Generator Script**: The artwork is regenerated with [`generate_cover.py`](file:///Users/rifaterdemsahin/projects/handson-do-sessions/generate_cover.py) (Pillow composition, outputs all four files).
- **Interactive Showcase**: Step 09 at [cover.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/cover.html) or online at [https://rifaterdemsahin.github.io/handson-do-sessions/cover.html](https://rifaterdemsahin.github.io/handson-do-sessions/cover.html).

---

## 🚀 Live Studio Dashboard & Web Links

- 🌐 **Live GitHub Pages Website**: [https://rifaterdemsahin.github.io/handson-do-sessions/](https://rifaterdemsahin.github.io/handson-do-sessions/)
- 🏠 **Step 01 — Studio Dashboard & Rig**: [https://rifaterdemsahin.github.io/handson-do-sessions/index.html](https://rifaterdemsahin.github.io/handson-do-sessions/index.html)
- ⌨️ **Step 02 — Complete Shortcut Suite**: [https://rifaterdemsahin.github.io/handson-do-sessions/shortcuts.html](https://rifaterdemsahin.github.io/handson-do-sessions/shortcuts.html)
- 🛠️ **Step 03 — OBS Implementations & Scenes**: [https://rifaterdemsahin.github.io/handson-do-sessions/obs-implementations.html](https://rifaterdemsahin.github.io/handson-do-sessions/obs-implementations.html)
- 💡 **Step 04 — Lighting & Darkness**: [https://rifaterdemsahin.github.io/handson-do-sessions/lighting.html](https://rifaterdemsahin.github.io/handson-do-sessions/lighting.html)
- 🎭 **Step 05 — The Hard Part (Be Yourself)**: [https://rifaterdemsahin.github.io/handson-do-sessions/hard-part.html](https://rifaterdemsahin.github.io/handson-do-sessions/hard-part.html)
- 🔥 **Step 06 — Courage to DO Page**: [https://rifaterdemsahin.github.io/handson-do-sessions/courage.html](https://rifaterdemsahin.github.io/handson-do-sessions/courage.html)
- 💃 **Step 07 — Keep Dancing Rationale**: [https://rifaterdemsahin.github.io/handson-do-sessions/rationale.html](https://rifaterdemsahin.github.io/handson-do-sessions/rationale.html)
- 🔄 **Step 08 — The Strategic Pivot**: [https://rifaterdemsahin.github.io/handson-do-sessions/pivot.html](https://rifaterdemsahin.github.io/handson-do-sessions/pivot.html)
- 🖼️ **Step 09 — Official Cover Image Showcase (1460x752)**: [https://rifaterdemsahin.github.io/handson-do-sessions/cover.html](https://rifaterdemsahin.github.io/handson-do-sessions/cover.html)
- 🖥️ **TV Confidence Monitor**: [https://rifaterdemsahin.github.io/handson-do-sessions/index.html#confidence-monitor](https://rifaterdemsahin.github.io/handson-do-sessions/index.html#confidence-monitor)
- 💻 **Local Development**: [http://localhost:30085/index.html](http://localhost:30085/index.html)
- 📄 **Source HTML**: [index.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/index.html) | [shortcuts.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/shortcuts.html) | [obs-implementations.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/obs-implementations.html) | [lighting.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/lighting.html) | [hard-part.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/hard-part.html) | [courage.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/courage.html) | [rationale.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/rationale.html) | [pivot.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/pivot.html) | [cover.html](file:///Users/rifaterdemsahin/projects/handson-do-sessions/cover.html)
- 📝 **Source Docs**: [shortcuts.md](file:///Users/rifaterdemsahin/projects/handson-do-sessions/shortcuts.md) | [obs-implementations.md](file:///Users/rifaterdemsahin/projects/handson-do-sessions/obs-implementations.md)
- 🐙 **GitHub Repository**: [https://github.com/rifaterdemsahin/handson-do-sessions](https://github.com/rifaterdemsahin/handson-do-sessions)


