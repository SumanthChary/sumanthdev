import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";

/**
 * Live demo of the one thing AirWrite is really about: turning jittery hand-tracking into a
 * steady line. Move the cursor over the canvas — a simulated ~30 fps camera adds landmark
 * noise (grey), and the same filter the app uses cleans it up (orange).
 *
 * The filter and its constants are copied from AirWrite's AirCanvas.tsx:
 * One Euro filter (minCutoff 1.7, beta 0.012, dCutoff 1.0) + an easing pass (0.45) per frame.
 */
const MIN_CUTOFF = 1.7;
const BETA = 0.012;
const D_CUTOFF = 1.0;
const EASE = 0.45;

const CAMERA_MS = 33; // a webcam's ~30 fps
const NOISE_PX = 8; // simulated landmark jitter
const KEEP_MS = 2200; // how long a trail lingers

const ORANGE = "#E0531F";
const INK = "91, 58, 36";

type Pt = { x: number; y: number; t: number };

class OneEuro2D {
  private init = false;
  private x = 0;
  private y = 0;
  private dx = 0;
  private dy = 0;
  private t = 0;

  reset() {
    this.init = false;
  }

  step(rx: number, ry: number, now: number): [number, number] {
    if (!this.init) {
      this.x = rx;
      this.y = ry;
      this.dx = 0;
      this.dy = 0;
      this.t = now;
      this.init = true;
      return [rx, ry];
    }
    const dt = Math.max(1, now - this.t) / 1000;
    const alpha = (cutoff: number) => {
      const r = 2 * Math.PI * cutoff * dt;
      return r / (r + 1);
    };
    const ad = alpha(D_CUTOFF);
    this.dx += ad * ((rx - this.x) / dt - this.dx);
    this.dy += ad * ((ry - this.y) / dt - this.dy);
    const cutoff = MIN_CUTOFF + BETA * Math.hypot(this.dx, this.dy);
    const a = alpha(cutoff);
    this.x += a * (rx - this.x);
    this.y += a * (ry - this.y);
    this.t = now;
    return [this.x, this.y];
  }
}

/** roughly-gaussian noise without a dependency */
const jitter = (rand: () => number) => (rand() + rand() + rand() - 1.5) * NOISE_PX * 1.4;

/** deterministic RNG so the idle sample looks the same on every load */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawTrails(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  raw: Pt[],
  smooth: Pt[],
  now: number,
) {
  ctx.clearRect(0, 0, w, h);
  const fade = (t: number) => Math.max(0, 1 - (now - t) / KEEP_MS);

  // raw, jittery tracking
  ctx.lineWidth = 1.2;
  ctx.lineJoin = "round";
  for (let i = 1; i < raw.length; i++) {
    const a = fade(raw[i]!.t) * 0.6;
    if (a <= 0) continue;
    ctx.strokeStyle = `rgba(${INK}, ${a})`;
    ctx.beginPath();
    ctx.moveTo(raw[i - 1]!.x, raw[i - 1]!.y);
    ctx.lineTo(raw[i]!.x, raw[i]!.y);
    ctx.stroke();
  }
  for (const p of raw) {
    const a = fade(p.t) * 0.7;
    if (a <= 0) continue;
    ctx.fillStyle = `rgba(${INK}, ${a})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // the filtered line
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  for (let i = 1; i < smooth.length; i++) {
    const a = fade(smooth[i]!.t);
    if (a <= 0) continue;
    ctx.strokeStyle = ORANGE;
    ctx.globalAlpha = a;
    ctx.beginPath();
    ctx.moveTo(smooth[i - 1]!.x, smooth[i - 1]!.y);
    ctx.lineTo(smooth[i]!.x, smooth[i]!.y);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // the "pen" — only while there's a live trail
  const head = smooth[smooth.length - 1];
  if (head && fade(head.t) > 0.4) {
    ctx.strokeStyle = ORANGE;
    ctx.lineWidth = 2;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(head.x, head.y, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

/** a deterministic idle sample: the same wavy line, raw vs filtered */
function drawSample(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const rand = mulberry32(7);
  const filter = new OneEuro2D();
  const raw: Pt[] = [];
  const smooth: Pt[] = [];
  const N = 56;
  let ex = 0;
  let ey = 0;
  for (let i = 0; i < N; i++) {
    const u = i / (N - 1);
    const x = w * (0.1 + 0.8 * u);
    const y = h * 0.5 + h * 0.2 * Math.sin(u * Math.PI * 4 + 0.3);
    const t = i * CAMERA_MS;
    const rx = x + jitter(rand);
    const ry = y + jitter(rand);
    raw.push({ x: rx, y: ry, t });
    const [fx, fy] = filter.step(rx, ry, t);
    if (i === 0) {
      ex = fx;
      ey = fy;
    }
    // two eased sub-steps per camera frame, like the 60 Hz render loop
    for (let k = 0; k < 2; k++) {
      ex += (fx - ex) * EASE;
      ey += (fy - ey) * EASE;
      smooth.push({ x: ex, y: ey, t });
    }
  }
  // draw at "now = last timestamp" so nothing is faded
  const last = raw[raw.length - 1]!.t;
  drawTrails(ctx, w, h, raw, smooth, last);
  // no pen head in the static sample
}

export function SmoothingDemo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let live = false;
    let inside = false;
    let raf = 0;
    const pointer = { x: 0, y: 0 };
    let raw: Pt[] = [];
    let smooth: Pt[] = [];
    let target: { x: number; y: number } | null = null;
    let display: { x: number; y: number } | null = null;
    let lastCam = 0;
    const filter = new OneEuro2D();

    const setHint = (visible: boolean) => {
      if (hintRef.current) hintRef.current.style.opacity = visible ? "1" : "0";
    };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!live) drawSample(ctx, w, h);
    };

    const loop = (now: number) => {
      raf = 0;
      if (inside && now - lastCam >= CAMERA_MS) {
        lastCam = now;
        const rx = pointer.x + jitter(Math.random);
        const ry = pointer.y + jitter(Math.random);
        raw.push({ x: rx, y: ry, t: now });
        const [fx, fy] = filter.step(rx, ry, now);
        target = { x: fx, y: fy };
        if (!display) display = { x: fx, y: fy };
      }
      if (target && display) {
        const settling = Math.hypot(target.x - display.x, target.y - display.y) > 0.25;
        display.x += (target.x - display.x) * EASE;
        display.y += (target.y - display.y) * EASE;
        // keep inking while the pointer is here or the pen is still catching up — then let it fade
        if (inside || settling) smooth.push({ x: display.x, y: display.y, t: now });
      }
      raw = raw.filter((p) => now - p.t < KEEP_MS);
      smooth = smooth.filter((p) => now - p.t < KEEP_MS);
      drawTrails(ctx, w, h, raw, smooth, now);

      if (!inside && raw.length === 0 && smooth.length === 0) {
        live = false;
        target = null;
        display = null;
        drawSample(ctx, w, h);
        setHint(true);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const place = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onEnter = (e: PointerEvent) => {
      place(e);
      inside = true;
      if (!live) {
        live = true;
        filter.reset();
        raw = [];
        smooth = [];
        target = null;
        display = null;
        setHint(false);
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      place(e);
      if (!inside) onEnter(e);
    };
    const onLeave = () => {
      inside = false;
    };

    canvas.addEventListener("pointerenter", onEnter);
    canvas.addEventListener("pointerdown", onEnter);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointercancel", onLeave);
    canvas.addEventListener("pointerup", (e) => e.pointerType === "touch" && onLeave());

    const ro = new ResizeObserver(sizeCanvas);
    ro.observe(wrap);
    sizeCanvas();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerdown", onEnter);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointercancel", onLeave);
    };
  }, []);

  return (
    <Reveal className="mt-16 sm:mt-20">
      <p className="mono-label m-0 text-brown-soft">Try it — the smoothing, live</p>
      <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight">
        Move your cursor. Watch the jitter disappear.
      </h2>
      <p className="mt-3 max-w-[60ch] text-[0.96rem] leading-relaxed text-brown">
        A webcam sees your hand about thirty times a second, and every reading wobbles. Grey is that
        raw tracking. Orange is what AirWrite actually draws.
      </p>

      <div
        ref={wrapRef}
        className="relative mt-7 overflow-hidden rounded-xl border border-border bg-background"
        style={{
          backgroundImage: "radial-gradient(rgba(21,17,13,0.13) 1px, transparent 1.3px)",
          backgroundSize: "26px 26px",
        }}
      >
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Interactive demo: move the cursor to see jittery raw tracking in grey and the smoothed line in orange"
          className="block h-[250px] w-full cursor-crosshair sm:h-[320px]"
          style={{ touchAction: "pan-y" }}
        />
        <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-brown">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-brown/50" />
            Raw tracking (simulated jitter)
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1 w-4 rounded-full bg-primary" />
            After the filter
          </span>
        </div>
        <p
          ref={hintRef}
          className="pointer-events-none absolute inset-x-0 bottom-4 m-0 text-center font-mono text-[0.66rem] uppercase tracking-[0.12em] text-brown-soft transition-opacity duration-300"
        >
          Move your cursor over the canvas
        </p>
      </div>
      <p className="mb-0 mt-3 font-mono text-[0.62rem] uppercase tracking-[0.08em] text-brown-soft">
        Same constants as the app — One Euro filter, minCutoff 1.7 · β 0.012 · easing 0.45 ·
        simulated 30 fps camera
      </p>
    </Reveal>
  );
}
