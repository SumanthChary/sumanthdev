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
  if (contributions.length === 0) return null;

  // GitHub's grid runs Sunday → Saturday, column per week.
  const firstDow = new Date(`${contributions[0]!.date}T00:00:00Z`).getUTCDay();
  const cells: (typeof contributions[number])[] = [
    ...Array.from({ length: firstDow }, () => ({ date: "", count: -1 })),
    ...contributions,
  ];
  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const total = contributions.reduce((s, d) => s + d.count, 0);
  const since = contributions[0]!.date;

  return (
    <figure className="m-0 rounded-xl border border-border bg-frame/40 p-5 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-primary">
          GitHub activity
        </span>
        <span className="text-[0.9rem] text-brown">
          <b className="font-serif text-[1.3rem] font-normal text-foreground">{total}</b>{" "}
          contributions since {since.slice(0, 4)} —{" "}
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
      <div className="-mx-1 overflow-x-auto pb-1">
        <div
          className="mx-1 grid w-max flex-none grid-flow-col gap-[3px]"
          aria-hidden="true"
        >
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
    </figure>
  );
}
