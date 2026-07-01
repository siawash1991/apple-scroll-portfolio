# codex.md — Agent Context (Cursor / Codex)

> Primary reference for AI agents working on this repository. Read before any session.

## Project Summary

**Type:** Static single-page personal portfolio  
**Style:** Apple product-page scroll experience (dark theme, glass nav, pinned hero)  
**Hero Effect:** Face splits on scroll → reveals robot underneath (scroll-linked, not timed)  
**Language:** Persian (RTL) UI copy; code comments English preferred  
**Deploy:** Vercel (static)  
**Repo:** GitHub

## Current Phase

| Phase | Status |
|-------|--------|
| Site skeleton (4 sections) | ✅ Done |
| GSAP + ScrollTrigger wired | ✅ Done |
| Hero placeholder reveal | ✅ Done |
| Frame sequence infrastructure | ✅ Ready (awaiting user video) |
| Real images / video frames | ⏳ Pending user assets |
| Personal content (About/Contact) | ⏳ Placeholder |
| Responsive polish | ⏳ Partial |

## Tech Stack (do not change without approval)

- HTML5, CSS3, Vanilla JS (ES modules)
- GSAP 3.13 + ScrollTrigger (CDN)
- No React, no build step, no backend
- ffmpeg for frame extraction (local script only)

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure: Hero, About, Projects, Contact |
| `css/style.css` | Apple-inspired dark UI, glass, RTL |
| `js/hero-scroll.js` | **Main effect** — placeholder OR canvas frame sequence |
| `js/sections.js` | Scroll-in reveals for content sections |
| `js/nav.js` | Nav background on scroll |
| `js/main.js` | Bootstrap + ScrollTrigger.registerPlugin |
| `scripts/extract-frames.sh` | ffmpeg → `assets/images/frames/frame-XXXX.webp` |
| `ROADMAP.md` | Session-by-session progress (update after each session) |

## Hero Scroll — Two Modes

### Mode A: Placeholder (current)

CSS-based split face halves animate with ScrollTrigger pin + scrub.  
Active when `FRAME_CONFIG.useFrameSequence === false`.

### Mode B: Frame Sequence (when video ready)

1. User provides hero video (MP4/MOV).
2. Run: `./scripts/extract-frames.sh /path/video.mp4 24`
3. Update `js/hero-scroll.js`:

```js
const FRAME_CONFIG = {
  useFrameSequence: true,
  framePath: "/assets/images/frames/frame-",
  frameCount: <number from script output>,
  frameExtension: "webp",
  framePadLength: 4,
};
```

4. Canvas draws frames synced to scroll progress.
5. Hide `#hero-placeholder`, show `#hero-canvas`.

## Design Guidelines

- **Apple-inspired:** black background, SF system fonts, large type, subtle glass controls
- **Content is hero** — glass only on nav, cards, contact links (not entire page)
- **RTL:** `dir="rtl"` on `<html>`; use logical properties where possible
- **Motion:** respect `prefers-reduced-motion`
- **No over-engineering:** minimal diff, no extra frameworks

## Coding Conventions

- BEM-like CSS: `.block__element--modifier`
- ES modules in `/js`
- Persian for user-facing copy; English for code/comments
- One logical commit per meaningful change
- Do not generate face/robot images — user provides assets

## Deployment

```bash
# Local
python3 -m http.server 8080

# Vercel
npx vercel --prod
```

`vercel.json` sets cache headers for `/assets/*`.

## User Workflow (Video → Site)

1. User records hero reveal video (face opening to show robot).
2. User sends video path or uploads to project.
3. Agent runs `extract-frames.sh`, updates `FRAME_CONFIG`, tests locally.
4. Agent deploys to Vercel.

## Open Questions for User

- Personal name / brand for nav title?
- Real email, GitHub, LinkedIn URLs?
- Custom domain on Vercel?
- Preferred video FPS (24 vs 30) for frame extraction?
- Face/robot images: static layers vs full video-only approach?

## Session Checklist

Before starting:
- [ ] Read `ROADMAP.md` current session
- [ ] Read this file

After finishing:
- [ ] Update `ROADMAP.md` checkboxes
- [ ] Test scroll on desktop + mobile width
- [ ] Do not commit unless user asks

## Related Docs

- `CLAUDE.md` — Persian project context (same project, Claude sessions)
- `ROADMAP.md` — 5-session learning roadmap
- `README.md` — Developer setup
