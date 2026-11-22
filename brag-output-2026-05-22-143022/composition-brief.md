# Hyperframes Composition Brief: Abinivesh M Portfolio Brag

## Objective
Create a short launch-style brag video for Abinivesh M's scroll-scrubbing cinematic portfolio website.

## Output
- Composition directory: C:\Users\abini\Desktop\portfolio\brag-output-2026-05-22-143022\composition\
- Rendered video: C:\Users\abini\Desktop\portfolio\brag-output-2026-05-22-143022\brag.mp4
- Format: landscape — 1920x1080
- Duration: 18 seconds

## Source Material
- Project root: C:\Users\abini\Desktop\portfolio\
- Primary files read: index.html, style.css, config.js
- Product name: Abinivesh M
- Tagline / strongest claim: "I build AI products that ship."
- Key UI or visual moment to recreate: Glass panel over black studio background, Anton headline type, stat chips, project chips
- Copy that must appear verbatim:
  - "Abinivesh M"
  - "AI Product Engineer & SDE"
  - "I build AI products that ship."
  - "113" / "LeetCode"
  - "3×" / "Hackathon wins"
  - "2×" / "IIT finals"
  - "NexusShield · Flutter/FastAPI/PostgreSQL/Gemini"
  - "SkillNexus AI · 6-agent LLM swarm"
  - "TrackX · ANPR/ONNX/FastAPI/React"
  - "Let's build something."

## Creative Direction
- Tone preset: cinematic
- Creative direction: scroll-scrubbing film portfolio
- Interpretation: Wide shots, big type, dramatic reveals. Fewer scenes (4-5), longer holds. Confidence through restraint. Transitions are dramatic wipes and crossfades.
- Angle: The portfolio *is* the product: one continuous shot, scroll-driven, with no cuts. The hook is the cinematic presentation itself — a personal site that feels like a trailer, not a document.
- Hook: "Abinivesh M" in giant Anton type on two lines (second line in accent blue #3B82F6), slamming in against pure black, then subtitle types in underneath.
- Outro / punchline: Hold on contact panel + social links for 1 second, then cut to black.
- Avoid:
  - Generic SaaS language ("streamline your workflow", etc.)
  - Abstract filler visuals (color washes, generic motion graphics)
  - Unrelated visual redesign

## Visual Identity
- Background: #000 (pure black)
- Text: #f5efe7 (off-white)
- Accent: #3B82F6 (blue)
- Display font: Anton
- Body font: Inter
- Visual references from the project: Glass panel rgba(16,12,9,0.62) with backdrop-filter blur and 1px border; topbar nav with AM. logo; stat cards; project chips; contact links

## Storyboard
Scene summary:
1. Hook — 3.0s — "Abinivesh M" slams in (Anton, white + accent blue), subtitle types in below
2. Stats — 5.0s — Glass panel fades in, 3 stat cards arrive one by one
3. Work — 5.0s — Glass panel fades in, project chips appear sequentially
4. Contact — 5.0s — Glass panel fades in, "Let's build something." headline, links slide in one at a time

## Audio
- Audio role: cinematic support
- Audio arc: Low swell under name reveal, supports stat and chip sequences with subtle presence, ducks under final logo hold
- Music: warm cinematic bed
- Music treatment: start at 0.5s, fade out under final logo card, one dry logo hit on name reveal
- Music cue guidance: detect at composition via npx hyperframes beats; target strong cues at ~3.0s (name reveal) and ~15.0s (final logo landing)
- Audio-reactive treatment: subtle; use music RMS/bass to make hero glow and card presence breathe
- Audio-coupled moments:
  - Hook — typed text with subtle key ticks
  - Stats — card-by-card sequence with soft arrival sounds
  - Work — chip-by-chip reveal
  - Contact — links slide in with subtle motion sounds
  - Outro — one dry logo hit on final hold
- SFX selection guidance: card sounds for card-like reveals, short announcement cues for major payoffs, key/click sounds for text, restraint when edit is busy
- SFX analysis guidance: Prefer low high-frequency-risk files for repeated or polished moments
- Exact SFX choice: Hyperframes should choose filenames, timestamps, density, and volume based on implemented animation
- Audio files: copy chosen music into composition/assets/music/

## Hyperframes Instructions
Load composition-building Hyperframes skills: hyperframes (format, motion, look), hyperframes-registry, media-use, hyperframes-cli. Skip storyline step, SPEC.md, types, usage, history, feedback, REVIEW.md. check is the gate.

Requirements:
- Show at least one real UI/copy/visual element from source project
- Keep all text readable in final render
- Keep video within 15-25 seconds
- Include music/SFX layer
- Treat audio notes as guidance, not fixed cue sheet
- Major reveals may move toward nearby strong cues within 0.15s; smaller entrances within 0.10s
- Use SFX to support motion and interaction
- Honor planned music treatment
- Consider audio-reactive workflow for subtle glow/halo/card presence
- Use local assets for audio
- Run hyperframes check before render
- Keep creation and rendering local