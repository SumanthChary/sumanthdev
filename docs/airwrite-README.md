# AirWrite ✍️

**Draw in thin air.** AirWrite is a hand-tracked drawing canvas that runs in your browser: raise your index finger at the webcam and the pen follows your fingertip. No mouse, no touchscreen, nothing to hold.

> Built with [TanStack Start](https://tanstack.com/start) and TypeScript. Hand tracking by [MediaPipe](https://ai.google.dev/edge/mediapipe) (Tasks Vision · HandLandmarker).

---

## ✨ What it does

- **Draw with one finger.** Raise just your index finger to draw; open or close your hand and the pen lifts.
- **Hover to click.** Every button works hands-free — hold a fingertip over it and a ring fills in 0.6 seconds, then it clicks.
- **Smooth by design.** A One Euro filter plus an easing pass at your screen's refresh rate keeps strokes steady even when tracking jitters.
- **A real drawing toolbox.** Pen and eraser, colours, brush size, undo / redo, clear and pause — all usable by hand.
- **Save and record.** Export your drawing as a PNG, or record the session as a WebM screen capture.
- **Private by default.** The camera is only requested after you click start. Tracking runs entirely in your browser and nothing is uploaded.

---

## 🧠 How it works

1. **Track.** MediaPipe's `HandLandmarker` finds 21 landmarks on one hand (GPU delegate, with a CPU fallback).
2. **Detect the gesture.** The index finger counts as "pointing" when its tip is above its middle joint while the middle, ring and little fingers are not. Only a pointing hand draws.
3. **Filter.** The fingertip position goes through a [One Euro filter](https://gery.casiez.net/1euro/) (`minCutoff 1.7`, `beta 0.012`) — heavy smoothing when your hand is slow, light when it is fast.
4. **Ease.** A render loop at the monitor's refresh rate eases the pen toward the filtered point, so the ink follows your hand rather than the camera's frame rate.

Raw landmark data jitters; making it feel like drawing was the whole project.

---

## ⚡ Tech stack

* **Framework:** [TanStack Start](https://tanstack.com/start) (React)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Hand tracking:** [MediaPipe Tasks Vision](https://ai.google.dev/edge/mediapipe/solutions/vision/hand_landmarker)
* **Rendering:** HTML Canvas
* **Build tool & server:** [Vite](https://vitejs.dev/) + [Bun](https://bun.sh/)
* **Formatting & linting:** [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)

---

## 🚀 Getting started

You need [Bun](https://bun.sh/) and a webcam.

```bash
git clone https://github.com/SumanthChary/airwrite.git
cd airwrite
bun install
bun dev
```

Open `http://localhost:3000`, click start, allow the camera, and point.

### Scripts

| Command | Description |
| --- | --- |
| `bun dev` | Starts the development server |
| `bun build` | Builds the project for production |
| `bun start` | Runs the production build |
| `bun lint` | Runs ESLint to check for code issues |
| `bun format` | Formats code using Prettier |

---

## 📁 Project structure

```text
airwrite/
├── public/                     # Static assets
├── src/
│   ├── components/AirCanvas.tsx   # Hand tracking, filtering, drawing, toolbar
│   └── routes/                    # TanStack Start routes
├── bunfig.toml                 # Bun runtime configuration
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies and scripts
```

---

## 📄 License

Maintained by [SumanthChary](https://github.com/SumanthChary).
