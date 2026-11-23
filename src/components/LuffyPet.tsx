import { useEffect, useRef, useState } from "react";
import sheet from "@/assets/media/luffy-sheet.webp";

/**
 * Luffy — summonable page companion built from the codex-pets `luffy-gear-5`
 * sprite kit. 8 columns × 9 rows, each frame 96 × 104 in the downscaled sheet.
 *
 * Click the button to summon him: he sprints in from the edge, lands with a
 * jump, plays around (runs, dances, waves, flexes), reacts when you click him
 * or scroll, then runs home, waves goodbye and leaves. Not draggable, and he
 * stays off the page entirely when reduced motion is on.
 */
const FRAME_W = 96;
const FRAME_H = 104;

type Clip = {
  row: number;
  frames: number;
  fps: number;
  /** ms before control passes on */ oneShot?: number;
};

type ClipName = "idle" | "run" | "sprint" | "wave" | "jump" | "cry" | "waiting" | "dash" | "flex";

const CLIPS: Record<ClipName, Clip> = {
  idle: { row: 0, frames: 6, fps: 6, oneShot: 2600 },
  run: { row: 1, frames: 8, fps: 12, oneShot: 2400 },
  sprint: { row: 2, frames: 8, fps: 14 },
  wave: { row: 3, frames: 4, fps: 6, oneShot: 2400 },
  jump: { row: 4, frames: 5, fps: 9, oneShot: 850 },
  cry: { row: 5, frames: 8, fps: 10, oneShot: 1900 },
  waiting: { row: 6, frames: 6, fps: 5, oneShot: 3600 },
  dash: { row: 7, frames: 6, fps: 10, oneShot: 1400 },
  flex: { row: 8, frames: 6, fps: 6, oneShot: 2600 },
};
type Phase = "enter" | "play" | "leave" | "bye";

const HOME_X = 26;
const PLAY_MS = 34_000;

const STORAGE_KEY = "luffy-pet-on";

export function LuffyPet() {
  const [on, setOn] = useState(false);
  // the label shows briefly so the toggle is discoverable, then tucks away
  const [hint, setHint] = useState(true);
  useEffect(() => {
    const id = window.setTimeout(() => setHint(false), 6000);
    return () => window.clearTimeout(id);
  }, []);
  const spriteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!on) return;
    const el = spriteRef.current;
    if (!el) return;

    // reduced motion: he never appears at all
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(false);
      return;
    }

    const groundY = () => Math.max(80, window.innerHeight - FRAME_H - 48);
    const maxX = () => Math.max(0, window.innerWidth - FRAME_W - 8);

    let phase: Phase = "enter";
    let clip: ClipName = "sprint";
    let frame = 0;
    let frameTime = 0;
    let stateTime = 0;
    let played = 0;
    let lastReact = 0;
    let x = window.innerWidth + FRAME_W + 24;
    let baseY = groundY();
    let dir: 1 | -1 = -1;
    let last = performance.now();
    let raf = 0;

    const setClip = (next: ClipName) => {
      clip = next;
      frame = 0;
      frameTime = 0;
      stateTime = 0;
    };

    const pickPlay = () => {
      const roll = Math.random();
      if (roll < 0.3) {
        dir = Math.random() < 0.5 ? 1 : -1;
        if (x < 60) dir = 1;
        if (x > maxX() - 60) dir = -1;
        setClip("run");
      } else if (roll < 0.46) setClip("dash");
      else if (roll < 0.6) setClip("wave");
      else if (roll < 0.74) setClip("flex");
      else if (roll < 0.88) setClip("waiting");
      else setClip("idle");
    };

    const draw = () => {
      const c = CLIPS[clip];
      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(baseY)}px, 0) scaleX(${dir})`;
      el.style.backgroundPosition = `${-frame * FRAME_W}px ${-c.row * FRAME_H}px`;
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
      stateTime += dt;

      baseY = groundY();
      // small hop arc while the jump clip runs
      if (clip === "jump" && c.oneShot) {
        const t = Math.min(1, stateTime / c.oneShot);
        baseY -= Math.sin(Math.PI * t) * 30;
      }

      switch (phase) {
        case "enter": {
          x += dir * 0.24 * dt;
          if (x <= HOME_X) {
            x = HOME_X;
            phase = "play";
            setClip("jump");
          }
          break;
        }
        case "play": {
          played += dt;
          if (clip === "run") {
            x += dir * 0.13 * dt;
            if (x <= 6) {
              x = 6;
              dir = 1;
            } else if (x >= maxX()) {
              x = maxX();
              dir = -1;
            }
          }
          if (c.oneShot !== undefined && stateTime >= c.oneShot) pickPlay();
          if (played >= PLAY_MS) phase = "leave";
          break;
        }
        case "leave": {
          dir = x > HOME_X ? -1 : 1;
          if (clip !== "run") setClip("run");
          x += dir * 0.17 * dt;
          if ((dir === -1 && x <= HOME_X) || (dir === 1 && x >= HOME_X)) {
            x = HOME_X;
            phase = "bye";
            setClip("wave");
          }
          break;
        }
        case "bye": {
          if (stateTime >= (CLIPS.wave.oneShot ?? 2400)) {
            setOn(false);
            return;
          }
          break;
        }
      }

      draw();
      raf = requestAnimationFrame(tick);
    };

    // reacts to clicks: a happy hop, then back to playing
    const onPoke = () => {
      if (phase === "leave" || phase === "bye") return;
      setClip("jump");
    };

    // reacts to scrolling: an excited dash (with a cooldown so it isn't constant)
    const onScroll = () => {
      const now = performance.now();
      if (phase === "play" && now - lastReact > 4000) {
        lastReact = now;
        setClip("dash");
      }
    };

    el.addEventListener("pointerdown", onPoke);
    window.addEventListener("scroll", onScroll, { passive: true });

    draw();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onPoke);
      window.removeEventListener("scroll", onScroll);
    };
  }, [on]);

  const toggle = () => {
    setOn((v) => {
      // storage can throw (private windows, blocked cookies) — the pet works without it
      try {
        localStorage.setItem(STORAGE_KEY, v ? "0" : "1");
      } catch {
        /* ignore */
      }
      return !v;
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-label={on ? "Send Luffy home" : "Summon Luffy"}
        className="luffy-toggle group fixed bottom-4 left-4 z-40 flex items-center gap-3 sm:bottom-5 sm:left-5"
      >
        <span className="relative block size-14 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:-rotate-6 group-active:scale-95">
          <span className="block size-full overflow-hidden rounded-full border border-border-strong bg-background shadow-[var(--shadow-float)]">
            <span
              className="luffy-face block size-full"
              style={{ backgroundImage: `url(${sheet})` }}
            />
          </span>
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-primary font-mono text-[0.6rem] leading-none text-primary-foreground"
          >
            {on ? "✕" : "✦"}
          </span>
        </span>
        <span
          className={`pointer-events-none whitespace-nowrap rounded-full border border-border-strong bg-background/90 px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-brown backdrop-blur transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 ${
            hint ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
          }`}
        >
          {on ? "Send Luffy home" : "Summon Luffy"}
        </span>
      </button>

      {on && (
        <div
          ref={spriteRef}
          role="img"
          aria-label="Luffy, a pixel pirate companion, playing on the page — click him and he reacts"
          className="fixed left-0 top-0 z-[65] cursor-pointer touch-none select-none"
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
