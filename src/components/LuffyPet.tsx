import { useEffect, useRef, useState } from "react";
import sheet from "@/assets/media/luffy-sheet.webp";

/**
 * Desk companion built from the codex-pets `luffy-gear-5` sprite kit.
 * 8 columns × 9 rows, each frame 96 × 104 in the downscaled sheet.
 * He wanders on his own, waves when you greet him, and panics while dragged.
 */
const FRAME_W = 96;
const FRAME_H = 104;

type Clip = { row: number; frames: number; fps: number };

const CLIPS = {
  idle: { row: 0, frames: 6, fps: 6 },
  runRight: { row: 1, frames: 8, fps: 11 },
  runLeft: { row: 2, frames: 8, fps: 11 },
  wave: { row: 3, frames: 4, fps: 6 },
  jump: { row: 4, frames: 5, fps: 9 },
  panic: { row: 5, frames: 8, fps: 14 },
  waiting: { row: 6, frames: 6, fps: 5 },
  review: { row: 8, frames: 6, fps: 6 },
} satisfies Record<string, Clip>;

type ClipName = keyof typeof CLIPS;

/** clips that end and hand control back, with their duration in ms */
const ONE_SHOT: Partial<Record<ClipName, number>> = {
  wave: 2200,
  jump: 900,
  review: 2600,
};

const STORAGE_KEY = "luffy-pet-on";

export function LuffyPet() {
  const [on, setOn] = useState(false);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOn(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  useEffect(() => {
    if (!on) return;
    const el = spriteRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const groundY = () => Math.max(90, window.innerHeight - 150);
    const maxX = () => Math.max(0, window.innerWidth - FRAME_W - 12);

    let x = 34;
    let y = groundY();
    let facing: 1 | -1 = 1;
    let clip: ClipName = "idle";
    let frame = 0;
    let frameTime = 0;
    let stateTime = 0;
    let until = 1400;
    let dragging = false;
    let hopVY = 0;
    let last = performance.now();
    let raf = 0;

    const setClip = (next: ClipName, hold?: number) => {
      if (clip === next) return;
      clip = next;
      frame = 0;
      frameTime = 0;
      stateTime = 0;
      until = hold ?? ONE_SHOT[next] ?? 1400 + Math.random() * 2600;
    };

    const wander = () => {
      const roll = Math.random();
      if (roll < 0.46) {
        facing = Math.random() < 0.5 ? 1 : -1;
        if (x < 60) facing = 1;
        if (x > maxX() - 60) facing = -1;
        setClip(facing === 1 ? "runRight" : "runLeft", 1600 + Math.random() * 2600);
      } else if (roll < 0.62) setClip("wave");
      else if (roll < 0.74) setClip("review");
      else if (roll < 0.86) setClip("waiting", 2200 + Math.random() * 1800);
      else setClip("idle", 1600 + Math.random() * 2000);
    };

    const draw = () => {
      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
      el.style.backgroundPosition = `${-frame * FRAME_W}px ${-CLIPS[clip].row * FRAME_H}px`;
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;

      const c = CLIPS[clip];
      frameTime += dt;
      const step = 1000 / c.fps;
      while (frameTime >= step) {
        frameTime -= step;
        frame = (frame + 1) % c.frames;
      }

      if (!dragging) {
        stateTime += dt;
        if (clip === "runRight" || clip === "runLeft") {
          x += facing * 0.062 * dt;
          if (x <= 4) {
            x = 4;
            facing = 1;
            setClip("runRight", 1800);
          } else if (x >= maxX()) {
            x = maxX();
            facing = -1;
            setClip("runLeft", 1800);
          }
        }
        // settle back down after a hop or a drag
        const ground = groundY();
        if (y !== ground) {
          hopVY += 0.0022 * dt * dt;
          y = Math.min(ground, y + hopVY);
          if (y === ground) hopVY = 0;
        }
        if (stateTime >= until) wander();
      }

      draw();
      raf = requestAnimationFrame(tick);
    };

    // pointer interactions
    let offX = 0;
    let offY = 0;
    let moved = false;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = false;
      offX = e.clientX - x;
      offY = e.clientY - y;
      setClip("panic", 99999);
      el.setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      moved = true;
      x = Math.min(Math.max(0, e.clientX - offX), maxX());
      y = Math.min(Math.max(0, e.clientY - offY), window.innerHeight - FRAME_H);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      hopVY = 0;
      setClip(moved ? "jump" : "wave");
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    draw();
    if (reduced) {
      setClip("idle", 1e9);
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [on]);

  const toggle = () => {
    setOn((v) => {
      localStorage.setItem(STORAGE_KEY, v ? "0" : "1");
      return !v;
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        className="fixed bottom-5 left-5 z-[70] inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/90 px-4 py-2.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-brown shadow-[var(--shadow-float)] backdrop-blur transition-colors duration-300 hover:border-primary hover:text-primary"
      >
        <span aria-hidden="true" className="text-primary">
          {on ? "✕" : "✦"}
        </span>
        {on ? "Send Luffy home" : "Free the pet"}
      </button>

      {on && (
        <div
          ref={spriteRef}
          role="img"
          aria-label="Pixel Luffy walking across the page — drag him anywhere"
          className="fixed left-0 top-0 z-[65] cursor-grab touch-none select-none active:cursor-grabbing"
          style={{
            width: FRAME_W,
            height: FRAME_H,
            backgroundImage: `url(${sheet})`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
          }}
        />
      )}
    </>
  );
}
