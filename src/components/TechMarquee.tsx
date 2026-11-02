const ROW_ONE = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "Shopify",
  "Vertex AI",
];

const ROW_TWO = [
  "Supabase",
  "Lovable",
  "OpenAI",
  "Claude",
  "Gemini",
  "Node.js",
  "Figma",
  "MediaPipe",
  "Dodo Payments",
  "Vercel",
];

const ROWS = [
  { items: ROW_ONE, cls: "animate-marquee", duration: "38s" },
  { items: ROW_TWO, cls: "animate-marquee-reverse", duration: "46s" },
];

function ChipRow({ items }: { items: string[] }) {
  return (
    <>
      {[0, 1].map((dup) => (
        <div aria-hidden={dup === 1} className="flex shrink-0 gap-3 pr-3" key={dup}>
          {items.map((t) => (
            <span
              key={t}
              className="whitespace-nowrap rounded-full border border-border bg-frame px-4 py-2 font-mono text-[0.74rem] tracking-[0.03em] text-brown"
            >
              {t}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

/** Two rows of tools sliding opposite ways — pause on hover, still under reduced motion. */
export function TechMarquee() {
  return (
    <section aria-label="Tools I build with" className="overflow-hidden border-b border-border py-7">
      <div className="flex flex-col gap-3">
        {ROWS.map((row) => (
          <div
            key={row.cls}
            className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
          >
            <div
              className={`flex w-max group-hover:[animation-play-state:paused] ${row.cls}`}
              style={{ animationDuration: row.duration }}
            >
              <ChipRow items={row.items} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
