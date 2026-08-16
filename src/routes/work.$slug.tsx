import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ImageFrame } from "@/components/ImageFrame";
import { Reveal } from "@/components/Reveal";
import { Wordmark } from "@/components/SiteChrome";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.title} — Case study — Sumanth`
      : "Case study — Sumanth";
    const description = loaderData?.description ?? "Case study by Sumanth.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const p = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length]!;
  const [g0, g1, g2] = p.gallery as [typeof p.gallery[0], typeof p.gallery[0], typeof p.gallery[0]];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <header className="flex items-center justify-between px-[clamp(20px,4vw,56px)] py-7">
        <Wordmark />
        <Link
          to="/"
          className="font-mono text-[0.74rem] uppercase tracking-[0.05em] text-brown transition-colors hover:text-primary"
        >
          ← Back to work
        </Link>
      </header>

      <main className="mx-auto max-w-[1100px] px-[clamp(20px,4vw,56px)]">
        <div className="pb-10 pt-12">
          <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            Case study — {p.index} / 06
          </p>
          <h1 className="mt-4 text-[clamp(2.6rem,6vw,5rem)] leading-[1.05]">
            {p.titleLead} <em className="italic text-primary">{p.titleAccent}</em>
          </h1>
        </div>

        <div className="grid gap-6 border-y border-border py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Role", p.role],
            ["Stack", p.stack],
            ["Status", p.statusLong],
            ["Category", p.category],
          ].map(([label, value]) => (
            <div key={label} className="font-mono text-[0.8rem] text-foreground">
              <span className="mb-1.5 block text-[0.62rem] uppercase tracking-[0.14em] text-brown-soft">
                {label}
              </span>
              {value}
            </div>
          ))}
        </div>

        <Reveal className="mt-12">
          <ImageFrame
            label="Add: product hero screenshot"
            size="1920 × 1080 · full dashboard or landing view"
            className="aspect-video w-full"
          />
        </Reveal>

        <Reveal className="grid gap-10 py-16 md:grid-cols-2 md:gap-16">
          <div>
            <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">
              The brief
            </h4>
            <p className="text-[1rem] leading-[1.75] text-brown">{p.brief}</p>
          </div>
          <div>
            <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">
              The approach
            </h4>
            <p className="text-[1rem] leading-[1.75] text-brown">{p.approach}</p>
          </div>
        </Reveal>

        <Reveal className="grid gap-5 md:grid-cols-2">
          <ImageFrame
            label={g0.label}
            size={g0.size}
            className="aspect-[4/5] w-full"
          />
          <div className="grid gap-5">
            <ImageFrame
              label={g1.label}
              size={g1.size}
              className="aspect-[16/10] w-full"
            />
            <ImageFrame
              label={g2.label}
              size={g2.size}
              className="aspect-[16/10] w-full"
            />
          </div>
        </Reveal>

        {p.beforeAfter && (
          <Reveal className="mt-5 grid gap-5 sm:grid-cols-2">
            <ImageFrame
              label="Before"
              size="1200 × 1600 · the original state"
              className="aspect-[9/12] w-full"
            />
            <ImageFrame
              label="After"
              size="1200 × 1600 · the rebuild"
              className="aspect-[9/12] w-full"
            />
          </Reveal>
        )}

        <Reveal className="mx-auto max-w-[640px] py-24 text-center">
          <p className="font-serif text-[clamp(1.5rem,3vw,2rem)] italic leading-[1.45] text-foreground">
            “{p.quote}”
          </p>
        </Reveal>
      </main>

      <section className="bg-foreground py-24 text-center text-on-dark">
        <p className="mono-label mb-4 text-primary">Next project</p>
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="font-serif text-[clamp(2rem,5vw,3.4rem)] text-on-dark transition-colors hover:text-primary"
        >
          {next.title}
        </Link>
        <div className="mt-8">
          <Link
            to="/"
            className="font-mono text-[0.74rem] uppercase tracking-[0.05em] text-on-dark-muted hover:text-primary"
          >
            View all work
          </Link>
        </div>
      </section>
    </>
  );
}
