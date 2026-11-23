import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Gentle 3D tilt + glare that follows the mouse. Off for touch and reduced motion. */
export function Tilt({
  children,
  className,
  max = 3.5,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1400px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale3d(1.008,1.008,1)`;
    el.style.setProperty("--sx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--sy", `${(py + 0.5) * 100}%`);
    el.style.setProperty("--glare", "1");
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.setProperty("--glare", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cn(
        "relative transition-transform duration-300 ease-out [transform-style:preserve-3d] will-change-transform",
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-lg opacity-[var(--glare,0)] transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(520px circle at var(--sx,50%) var(--sy,50%), oklch(1 0 0 / 0.22), transparent 60%)",
        }}
      />
    </div>
  );
}
