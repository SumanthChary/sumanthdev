import { useEffect, useRef, useState } from "react";
import luffyWalk from "@/assets/media/luffy-walk.webp";
import luffyIdle from "@/assets/media/luffy-idle.webp";

/**
 * A small desk companion. Toggleable, draggable, purely for delight.
 * Walking uses an 8-frame sprite strip; dragging swaps to the idle frame.
 */
export function LuffyPet() {
  const [on, setOn] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!on || pos) return;
    setPos({ x: 28, y: Math.max(80, window.innerHeight - 190) });
  }, [on, pos]);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => {
      setPos({
        x: Math.min(Math.max(0, e.clientX - offset.current.x), window.innerWidth - 96),
        y: Math.min(Math.max(0, e.clientY - offset.current.y), window.innerHeight - 104),
      });
    };
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        aria-pressed={on}
        className="fixed bottom-5 left-5 z-[70] inline-flex items-center gap-2 rounded-full border border-border-strong bg-background/90 px-4 py-2.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-brown shadow-[var(--shadow-float)] backdrop-blur transition-colors duration-300 hover:border-primary hover:text-primary"
      >
        <span aria-hidden="true">{on ? "✦" : "🍖"}</span>
        {on ? "Send Luffy home" : "Free the pet"}
      </button>

      {on && pos && (
        <div
          role="img"
          aria-label="Luffy Gear 5 pixel pet — drag him around"
          onPointerDown={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            offset.current = { x: e.clientX - r.left, y: e.clientY - r.top };
            setDragging(true);
          }}
          className="pet-sprite fixed z-[65] cursor-grab touch-none select-none active:cursor-grabbing"
          style={{
            left: pos.x,
            top: pos.y,
            backgroundImage: `url(${dragging ? luffyIdle : luffyWalk})`,
            ...(dragging
              ? { animation: "none", backgroundSize: "contain", backgroundPosition: "center" }
              : null),
          }}
        />
      )}
    </>
  );
}
