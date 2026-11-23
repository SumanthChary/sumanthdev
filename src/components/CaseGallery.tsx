import { ImageFrame } from "@/components/ImageFrame";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import type { GalleryItem } from "@/data/projects";

/** Portrait app screenshots at natural size on a soft "device stage" — no stretching, no blur. */
function PhoneStage({ title, items }: { title: string; items: GalleryItem[] }) {
  return (
    <Reveal className="mt-5">
      <Tilt max={2.5}>
        <div
          className="relative overflow-hidden rounded-xl border border-border px-4 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-12"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 25%, oklch(0.93 0.05 55 / 0.7), transparent 70%), var(--frame-bg)",
          }}
        >
          <div className="mx-auto flex max-w-[640px] items-start justify-center gap-4 sm:gap-10">
            {items.map((g, i) => (
              <figure
                key={g.label}
                className={`m-0 w-[46%] max-w-[260px] ${i % 2 === 1 ? "mt-10 sm:mt-16" : ""}`}
              >
                <img
                  src={g.src}
                  alt={`${title} — ${g.label}`}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full rounded-[1.4rem] border border-border-strong bg-background shadow-[var(--shadow-float)] sm:rounded-[1.8rem]"
                />
                <figcaption className="mt-3 text-center font-mono text-[0.62rem] uppercase tracking-[0.1em] text-brown-soft">
                  {g.label}
                  <small className="mt-0.5 block normal-case tracking-[0.02em]">{g.size}</small>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Tilt>
    </Reveal>
  );
}

/** Adapts to however many real images a project has: 1, 2 or 3+. Nothing renders for zero. */
export function CaseGallery({
  title,
  items,
  layout,
}: {
  title: string;
  items: GalleryItem[];
  layout?: "phones" | undefined;
}) {
  const shown = items.filter((g) => g.src);
  if (shown.length === 0) return null;
  if (layout === "phones") return <PhoneStage title={title} items={shown} />;

  const frame = (g: GalleryItem, cls = "w-full") => (
    <ImageFrame
      key={g.label}
      label={g.label}
      size={g.size}
      src={g.src}
      alt={`${title} — ${g.label}`}
      auto
      className={cls}
    />
  );

  if (shown.length >= 3) {
    const [g0, g1, g2] = shown as [GalleryItem, GalleryItem, GalleryItem];
    return (
      <Reveal className="grid gap-5 md:grid-cols-2 md:items-start">
        {frame(g0)}
        <div className="grid gap-5">
          {frame(g1)}
          {frame(g2)}
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal
      className={`grid gap-6 ${shown.length === 2 ? "md:grid-cols-2" : "mx-auto max-w-[900px]"}`}
    >
      {shown.map((g) => (
        <figure key={g.label} className="m-0">
          {frame(g)}
          <figcaption className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-brown-soft">
            {g.label}
            <span className="ml-2 normal-case tracking-[0.02em]">— {g.size}</span>
          </figcaption>
        </figure>
      ))}
    </Reveal>
  );
}
