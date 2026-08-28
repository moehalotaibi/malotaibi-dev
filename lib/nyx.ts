// NYX detail-page content for /projects/nyx.
// Source: Moe's NYX project brief — every capability listed is real and
// verified on his machine; nothing is aspirational. Copy is tightened from
// the brief's own wording — no invented features, metrics, or outcomes.
// Renders through the same editorial template as the case studies.

import type { CaseSection } from "./case-studies";
import type { Stat } from "./content";

export type NyxDetail = {
  tag: string;
  title: string;
  headline: string;
  description: string;
  heroStat: Stat;
  stats: Stat[];
  meta: { role: string; platform: string; status: string };
  hud: { src: string; alt: string };
  sections: CaseSection[];
};

export const nyx: NyxDetail = {
  tag: "Side Project",
  title: "NYX",
  headline:
    "Designing and building a voice assistant that lives on my Mac — on-device speech, a real memory, and hands on the machine",
  description:
    "A voice-first AI assistant for macOS — designed, art-directed, and shipped end-to-end with an agentic AI backend.",
  heroStat: { value: "100%", label: "Speech recognition on-device" },
  stats: [
    { value: "~25", label: "Typed MCP tools" },
    { value: "10", label: "Milestones, built in order" },
    { value: "~2", label: "Days, brief to daily driver" },
  ],
  meta: {
    role: "Product Design & Direction",
    platform: "macOS · Tauri 2",
    status: "Daily driver",
  },
  hud: {
    src: "/work/nyx-canvas.png",
    alt: "NYX HUD — paper theme with the status orb and conversation panel",
  },
  sections: [
    {
      id: "voice",
      title: "Voice, end to end",
      kicker: "Speech",
      intro:
        "Say her name, talk, get an answer out loud. The full spoken loop — recognition, reply, interruption — was built as one system.",
      items: [
        {
          title: "Recognition, fully on-device",
          body: "Whisper large-v3-turbo runs on Apple's Neural Engine via MLX. My voice is transcribed locally and never leaves the Mac.",
        },
        {
          title: "Sentence-streaming replies",
          body: "Replies stream from ElevenLabs sentence by sentence as raw PCM, so she starts speaking before the full answer is generated. macOS's built-in voice is the automatic fallback, and every reply logs its engine and character cost.",
        },
        {
          title: "Barge-in",
          body: "Talking over her stops her mid-sentence. The mic monitor calibrates against her own speaker bleed, so she never interrupts herself.",
        },
        {
          title: "Wake-word mode",
          body: "An optional toggle: say the wake phrase and a hands-free conversation opens — the mic re-arms after each answer until a closing phrase ends it, and silence auto-stops each turn. Push-to-talk stays the default. A custom wake model is the one piece still pending; she currently listens through a stand-in.",
        },
      ],
    },
    {
      id: "memory",
      title: "A real memory",
      kicker: "Memory",
      intro:
        "Every conversation turn and every durable fact persists between sessions — “what do you know about me?” gets a real answer.",
      items: [
        {
          title: "SQLite, crash-safe",
          body: "Conversation turns and durable facts are stored in SQLite with WAL journaling; memory writes survive crashes.",
        },
        {
          title: "Background fact extraction",
          body: "After each exchange, a background task extracts new facts about me — never delaying the spoken reply.",
        },
        {
          title: "Injected at boot",
          body: "Everything she knows is loaded into her system prompt when she starts.",
        },
        {
          title: "remember / forget",
          body: "Both are first-class tools she chooses to use herself — not keyword triggers.",
        },
      ],
    },
    {
      id: "control",
      title: "Hands on the Mac",
      kicker: "Control",
      intro:
        "Apps, volume, and media go through a whitelisted AppleScript bridge; the browser and screen have their own paths.",
      items: [
        {
          title: "Apps, URLs, volume",
          body: "Opens apps by name or alias (“open my browser” → Arc), opens URLs and deep links, reads system vitals, and controls volume and media.",
        },
        {
          title: "Browser autopilot",
          body: "Her own Playwright browser window with a persistent profile, so logins survive. Navigate, read, click, and fill by voice — anything that submits is hard-gated behind my verbal confirmation.",
        },
        {
          title: "Screen capture vision",
          body: "“Look at my screen” captures, downscales, and feeds her vision — she answers the question asked instead of inventorying the pixels.",
        },
        {
          title: "Frontmost-app awareness",
          body: "She detects the frontmost app, the active Arc tab's URL, or the open document, and summarizes it on request.",
        },
      ],
    },
    {
      id: "files",
      title: "Files, both directions",
      kicker: "Documents",
      intro: "She reads documents and creates them — both from a voice request.",
      items: [
        {
          title: "Reads",
          body: "PDFs, Word documents, Excel sheets, and plain text; views images.",
        },
        {
          title: "Creates",
          body: "PDF, Word, Excel, and text files on the Desktop from a voice request — structured headings and tables, filenames derived from the content, and existing files never overwritten.",
        },
        {
          title: "Upload handoff",
          body: "An upload button in the HUD hands her any file; she acknowledges it and waits for the next instruction before acting on it.",
        },
      ],
    },
    {
      id: "communication",
      title: "Drafts, never sends",
      kicker: "Communication",
      intro: "Messages to humans are drafted, never auto-sent.",
      items: [
        {
          title: "WhatsApp drafts",
          body: "She drafts messages to my saved contacts with the text pre-filled. She cannot press send — only I can.",
        },
        {
          title: "Architectural, not prompted",
          body: "The rule lives in the tool layer, not in a prompt suggestion. The same pattern gates destructive browser actions behind spoken confirmation.",
        },
      ],
    },
    {
      id: "living-data",
      title: "Living data",
      kicker: "Day to day",
      intro: "The small capabilities that get used every day.",
      items: [
        {
          title: "Weather",
          body: "Live weather from Open-Meteo for Riyadh or any city, feeding both her voice and a HUD card.",
        },
        {
          title: "Search",
          body: "Live web search through Brave's API.",
        },
        {
          title: "Timers",
          body: "“Set a timer for ten minutes” — she announces when it's up, waiting for a quiet moment instead of cutting in.",
        },
        {
          title: "Replay and greeting",
          body: "“What did I just say?” gets a verbatim replay, and boot opens with a time-aware greeting.",
        },
      ],
    },
    {
      id: "interface",
      title: "The interface",
      kicker: "Design",
      intro:
        "The HUD is a Tauri 2 desktop app in React, TypeScript, Tailwind v4, and Motion — the same stack as this portfolio. The current theme is paper: warm off-white, ink text, hairline borders, JetBrains Mono throughout, and a single quiet terracotta accent.",
      items: [
        {
          title: "The orb is the status",
          body: "Slow rotation at rest, rings pulsing to my mic level while listening, a fast sweep while thinking, and a core that throbs to the actual speech amplitude while she talks — driven by live audio data over WebSocket, not canned animation.",
        },
        {
          title: "Three zones",
          body: "Telemetry, weather, session stats, and an optional camera card on the left; the orb in the center; the conversation panel with typed input and file upload on the right; a collapsible mission log along the bottom, showing every state change and tool call as it happens.",
        },
        {
          title: "One tokens file",
          body: "Every color, glow, radius, font, column width — even the layout's max-width — lives in a single tokens file. The interface's entire personality reskins by editing CSS variables; the previous theme, near-black with cyan glows, is preserved in a comment.",
        },
        {
          title: "The disconnect state",
          body: "If the backend link drops, the whole theme flips to a signal-red state.",
        },
        {
          title: "Boot sequence",
          body: "A typed-line startup animation with a two-tone chime synthesized in WebAudio — no audio assets — then her spoken greeting.",
        },
        {
          title: "Keyboard first",
          body: "A global hotkey (⌘⇧J), a full typed input path beside voice, and the camera off by default.",
        },
      ],
    },
    {
      id: "architecture",
      title: "Architecture",
      kicker: "System",
      numbered: true,
      intro:
        "Three layers on one machine. Every capability is a typed tool registered with the Agent SDK's MCP server — no string-matched intent routing anywhere — and the mission log shows every call with its arguments.",
      items: [
        {
          title: "The HUD",
          body: "Tauri 2 with React, TypeScript, Tailwind, and Motion — orb, panels, conversation, mission log. It talks to the backend over a local WebSocket (127.0.0.1, JSON events).",
        },
        {
          title: "The Python sidecar",
          body: "An asyncio process that owns the physical layer: mic capture, the ONNX wake word, barge-in, MLX Whisper recognition, ElevenLabs PCM playback, telemetry, weather, timers, and uploads.",
        },
        {
          title: "The agent",
          body: "The Claude Agent SDK runs the session and streams replies, with ~25 custom MCP tools covering apps, browser, files, screen, memory, weather, search, WhatsApp, and documents.",
        },
        {
          title: "Underneath",
          body: "SQLite (WAL) for memory, .env for secrets, and macOS TCC permissions — mic, screen recording, automation, camera — each an explicit, expected step.",
        },
      ],
    },
    {
      id: "build",
      title: "How it was built",
      kicker: "Process",
      numbered: true,
      intro:
        "Ten planned milestones from one brief, built in order and tested live before advancing — a designer's product rules as hard constraints from day one, with Claude Code as the engineering partner.",
      items: [
        {
          title: "Voice loop",
          body: "Streaming TTS with interruption and visible quota burn.",
        },
        {
          title: "The HUD",
          body: "The Tauri shell, orb states wired to real audio levels.",
        },
        {
          title: "Memory before capabilities",
          body: "Character first, then hands.",
        },
        {
          title: "Mac control",
          body: "Apps, browser, AppleScript — with existence checks and readable errors instead of crashes.",
        },
        {
          title: "Screen analysis",
          body: "Capture, downscale, answer the question asked.",
        },
        {
          title: "Live search and weather",
          body: "Brave search and Open-Meteo, wired to voice and HUD.",
        },
        {
          title: "Media",
          body: "Deliberately skipped.",
        },
        {
          title: "Message drafts",
          body: "WhatsApp drafts — send withheld by design.",
        },
        {
          title: "Files",
          body: "Read, create, upload.",
        },
        {
          title: "Polish",
          body: "Timers, replay, greeting, chime, camera.",
        },
      ],
    },
    {
      id: "fixes",
      title: "The real-world fixes",
      kicker: "Field notes",
      intro: "The build survived the mess that makes projects interesting.",
      items: [
        {
          title: "Raw-PCM streaming",
          body: "The TTS SDK's audio helpers needed system dependencies that didn't exist on the machine — solved by streaming raw PCM straight to the audio device.",
        },
        {
          title: "Echo calibration",
          body: "She kept hearing herself through the speakers. Solved with runtime calibration against her own speaker bleed.",
        },
        {
          title: "The geocoding bug",
          body: "The first weather API geocoded Riyadh to South Africa. Replaced.",
        },
        {
          title: "The machine itself",
          body: "No package manager, an ancient system Python, thread-unsafe UI frameworks, zombie processes — handled one at a time.",
        },
      ],
    },
    {
      id: "privacy",
      title: "Privacy posture",
      kicker: "Trust",
      intro: "The safety rules were constraints from day one, not additions.",
      items: [
        {
          title: "Local speech",
          body: "Speech recognition is 100% local; audio never leaves the machine.",
        },
        {
          title: "No API key",
          body: "The AI backend authenticates through my existing Claude sign-in — no API key exists in the project.",
        },
        {
          title: "Unreadable secrets",
          body: "Secrets live in .env and are deny-listed from her file access — she refuses to read them even when asked.",
        },
        {
          title: "Camera off by default",
          body: "The wake-word mic sampler runs only when explicitly armed, and only while she is otherwise idle.",
        },
      ],
    },
  ],
};
