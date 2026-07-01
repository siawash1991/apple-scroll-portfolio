# Portfolio — Apple-Style Scroll Site

Personal portfolio with an Apple-inspired scroll-driven **Face → Robot Reveal** hero effect.

## Live Demo

**Production:** https://vibecode-cursor.vercel.app

**GitHub:** https://github.com/siawash1991/apple-scroll-portfolio

## Stack

- HTML5 / CSS3 / Vanilla JavaScript (ES modules)
- [GSAP 3](https://gsap.com/) + ScrollTrigger
- Static site — no backend
- Deployed on [Vercel](https://vercel.com)

## Project Structure

```
/
├── index.html
├── css/style.css
├── js/
│   ├── main.js           # Entry point
│   ├── hero-scroll.js    # Hero pin + reveal / frame sequence
│   ├── sections.js       # Section scroll reveals
│   └── nav.js            # Nav glass on scroll
├── assets/
│   ├── images/           # Face, robot, project images
│   │   └── frames/       # Video frames (scroll sequence)
│   └── icons/
├── scripts/
│   └── extract-frames.sh # ffmpeg frame extraction
├── ROADMAP.md
├── CLAUDE.md
├── codex.md
└── vercel.json
```

## Local Development

```bash
# Option 1: Python
python3 -m http.server 8080

# Option 2: npx serve
npx serve .

# Open http://localhost:8080
```

## Video → Scroll Frames

When your hero video is ready:

```bash
chmod +x scripts/extract-frames.sh
./scripts/extract-frames.sh /path/to/your-video.mp4 24
```

Then update `js/hero-scroll.js`:

```js
const FRAME_CONFIG = {
  useFrameSequence: true,
  frameCount: 120, // match extracted count
  // ...
};
```

## Sections

1. **Hero** — Scroll-pinned Face → Robot reveal (placeholder until frames ready)
2. **About** — Personal intro
3. **Projects** — Portfolio cards
4. **Contact** — Email, GitHub, LinkedIn

## License

MIT
