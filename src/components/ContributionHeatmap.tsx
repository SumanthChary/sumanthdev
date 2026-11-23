import { useEffect, useRef } from "react";
import { contributions } from "@/data/contributions";

const LEVEL_STYLES = [
  "bg-[oklch(0.192_0.011_60/0.07)]",
  "bg-[oklch(0.88_0.09_45)]",
  "bg-[oklch(0.8_0.13_40)]",
  "bg-[oklch(0.68_0.16_35)]",
  "bg-primary",
] as const;

function level(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 7) return 3;
  return 4;
}

/** Real GitHub contribution data, rendered in the site's orange. */
export function ContributionHeatmap() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // On narrow screens the grid scrolls sideways — start at the most recent weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, []);

  if (contributions.length === 0) return null;

  // GitHub's grid runs Sunday → Saturday, column per week.
  const firstDow = new Date(`${contributions[0]!.date}T00:00:00Z`).getUTCDay();
  const cells: (typeof contributions)[number][] = [
    ...Array.from({ length: firstDow }, () => ({ date: "", count: -1 })),
    ...contributions,
  ];
  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const total = contributions.reduce((s, d) => s + d.count, 0);
  const until = contributions[contributions.length - 1]!.date;
  const untilLabel = new Date(`${until}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const activeDays = contributions.filter((d) => d.count > 0).length;

  // label a week column with its month when a new month starts in it
  const monthLabels = weeks.map((week, wi) => {
    const first = week.find((d) => d.date);
    if (!first) return "";
    const m = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    const prev = weeks[wi - 1]?.find((d) => d.date);
    const prevM = prev ? new Date(`${prev.date}T00:00:00Z`).getUTCMonth() : -1;
    return m !== prevM
      ? new Date(`${first.date}T00:00:00Z`).toLocaleDateString("en-GB", {
          month: "short",
          timeZone: "UTC",
        })
      : "";
  });

  return (
    <figure className="m-0 rounded-xl border border-border bg-frame/40 p-5 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-primary">
          GitHub activity
        </span>
        <span className="text-[0.9rem] text-brown">
          <b className="font-serif text-[1.3rem] font-normal text-foreground">{total}</b>{" "}
          contributions in the last 12 months (to {untilLabel}), across {activeDays} active days —{" "}
          <a
            href="https://github.com/SumanthChary"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-border-strong underline-offset-4 transition-colors hover:text-primary"
          >
            verify on GitHub ↗
          </a>
        </span>
      </figcaption>
      <div
        ref={scrollRef}
        className="-mx-1 overflow-x-auto pb-1"
        role="img"
        aria-label={`GitHub contribution graph: ${total} contributions across ${activeDays} active days in the last 12 months`}
      >
        <div
          className="mx-1 mb-1.5 grid w-max grid-flow-col gap-[3px] font-mono text-[0.55rem] uppercase tracking-[0.08em] text-brown-soft"
          aria-hidden="true"
        >
          {monthLabels.map((m, i) => (
            <span key={i} className="relative block h-3 w-[9px]">
              <span className="absolute left-0 top-0 whitespace-nowrap">{m}</span>
            </span>
          ))}
        </div>
        <div className="mx-1 grid w-max flex-none grid-flow-col gap-[3px]" aria-hidden="true">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-flow-row gap-[3px]">
              {week.map((day, di) => (
                <span
                  key={di}
                  title={day.date ? `${day.count} on ${day.date}` : undefined}
                  className={`size-[9px] rounded-[2px] ${
                    day.count < 0 ? "bg-transparent" : LEVEL_STYLES[level(day.count)]
                  }`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-3 flex items-center justify-end gap-1.5 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-brown-soft"
      >
        Less
        {LEVEL_STYLES.map((cls, i) => (
          <span key={i} className={`size-[9px] rounded-[2px] ${cls}`} />
        ))}
        More
      </div>
    </figure>
  );
}
