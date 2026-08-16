import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Pill link with a subtle magnetic pull toward the cursor (desktop only). */
export function MagneticLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={reset}
      className={cn(
        "inline-block rounded-full bg-foreground px-7 py-4 font-mono text-[0.78rem] uppercase tracking-[0.05em] text-background transition-[background-color,transform] duration-300 ease-[var(--ease-out-soft)] hover:bg-primary",
        className,
      )}
    >
      {children}
    </a>
  );
}
