import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ImageFrame } from "@/components/ImageFrame";
import { Reveal } from "@/components/Reveal";
import { ShareRow } from "@/components/ShareRow";
import { Tilt } from "@/components/Tilt";
import { CaseGallery } from "@/components/CaseGallery";
import { CALENDLY, Wordmark, whatsappLink } from "@/components/SiteChrome";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ params, loaderData }) => {
    const SITE = "https://sumanthdev.me";
    const url = `${SITE}/work/${params.slug}`;
    const title = loaderData
      ? `${loaderData.title} — ${loaderData.category} case study — Sumanth Chary`
      : "Case study — Sumanth Chary";
    const description = loaderData?.description ?? "Case study by Sumanth Chary.";
    const image = loaderData ? `${SITE}/og/${params.slug}.jpg` : `${SITE}/og-cover.jpg`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:site_name", content: "Sumanth Chary" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:creator", content: "@SumanthChary07" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "630" },
              {
                property: "og:image:alt",
                content: `${loaderData?.title ?? "Case study"} — case study by Sumanth Chary`,
              },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: loaderData
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: loaderData.title,
                headline: title,
                description,
                url,
                ...(image ? { image } : {}),
                keywords: loaderData.stack,
                creator: {
                  "@type": "Person",
                  name: "Sumanth Chary",
                  url: `${SITE}/`,
                },
              }),
            },
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
                  { "@type": "ListItem", position: 2, name: "Work", item: `${SITE}/#work` },
                  { "@type": "ListItem", position: 3, name: loaderData.title, item: url },
                ],
              }),
            },
          ]
        : [],
    };
  },

  component: CaseStudy,
});

function CaseStudy() {
  const p = Route.useLoaderData();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length]!;
  return (
    <>
      <header className="flex items-center justify-between px-[clamp(20px,4vw,56px)] py-7">
        <Wordmark />
        <Link
          to="/"
          hash="work"
          className="font-mono text-[0.74rem] uppercase tracking-[0.05em] text-brown transition-colors hover:text-primary"
        >
          ← Back to work
        </Link>
      </header>

      <main id="main" className="mx-auto max-w-[1100px] px-[clamp(20px,4vw,56px)]">
        <div className="pb-10 pt-12">
          <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            Case study — {p.index} / {String(projects.length).padStart(2, "0")}
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

        {(p.liveUrl || p.repo) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                Visit the live site
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                View the source on GitHub
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        )}

        {p.hero && (
          <Reveal className="mt-10 sm:mt-12">
            <Tilt>
              <ImageFrame
                label={`${p.title} — product hero`}
                src={p.hero}
                alt={`${p.title} — product hero`}
                loading="eager"
                auto={!!p.hero}
                className="w-full"
              />
            </Tilt>
            {p.heroCaption && (
              <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-brown-soft">
                {p.heroCaption}
              </p>
            )}
          </Reveal>
        )}

        {!p.hero && p.concept && (
          <Reveal className="mt-10 sm:mt-12">
            <Tilt>
              <ImageFrame
                label={p.concept.caption}
                src={p.concept.src}
                alt={`${p.title} — concept illustration`}
                loading="eager"
                auto
                className="w-full"
              />
            </Tilt>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-brown-soft">
              <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-primary">
                Concept illustration
              </span>
              <span className="normal-case tracking-[0.02em]">
                {p.concept.caption} Not a screenshot of the shipped UI.
              </span>
            </p>
          </Reveal>
        )}

        <Reveal className="grid gap-8 py-12 md:grid-cols-3 md:gap-10 md:py-16">
          {[
            ["01 — The problem", p.brief],
            ["02 — What I built", p.approach],
          ].map(([k, v]) => (
            <div key={k}>
              <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">
                {k}
              </h4>
              <p className="text-[1rem] leading-[1.75] text-brown">{v}</p>
            </div>
          ))}
          <div className="rounded-xl border border-primary/40 bg-frame/60 p-6">
            <h4 className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-primary">
              03 — The result
            </h4>
            <p className="font-serif text-[1.35rem] leading-snug text-foreground">{p.result}</p>
          </div>
        </Reveal>

        {p.hero && p.concept && (
          <Reveal className="pb-12 md:pb-16">
            <p className="mono-label m-0 mb-4 text-brown-soft">
              {p.concept.heading ?? "The interface, as designed"}
            </p>
            <Tilt>
              <ImageFrame
                label={p.concept.caption}
                src={p.concept.src}
                alt={`${p.title} — concept illustration`}
                auto
                className="w-full"
              />
            </Tilt>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-brown-soft">
              <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-primary">
                Concept illustration
              </span>
              <span className="normal-case tracking-[0.02em]">
                {p.concept.caption} Not a screenshot of the shipped UI.
              </span>
            </p>
          </Reveal>
        )}

        <CaseGallery title={p.title} items={p.gallery} layout={p.galleryLayout} />

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

        {p.closing && (
          <Reveal className="mt-5">
            <ImageFrame
              label={p.closing.caption}
              src={p.closing.src}
              alt={`${p.title} — ${p.closing.caption}`}
              fit="contain"
              className="max-h-[70svh] w-full bg-frame p-3 sm:p-6"
            />
            <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-brown-soft">
              {p.closing.caption}
            </p>
          </Reveal>
        )}

        {p.testimonial && (
          <Reveal className="mt-16 grid gap-8 rounded-xl border border-primary/40 bg-frame/60 p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
            <div>
              <p className="mono-label m-0 text-primary">What the client said</p>
              <blockquote className="m-0 mt-5 font-serif text-[clamp(2rem,5vw,3.4rem)] italic leading-[1.15] text-foreground">
                “{p.testimonial.quote}”
              </blockquote>
              <p className="mb-0 mt-5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-brown-soft">
                {p.testimonial.by}
              </p>
            </div>
            {p.testimonial.proof && (
              <figure className="m-0">
                <img
                  src={p.testimonial.proof}
                  alt="A message from the client on WhatsApp: “Kk bro thanks for everything”, with a heart reaction"
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full max-w-[442px] rounded-2xl border border-border-strong shadow-[var(--shadow-float)]"
                />
                <figcaption className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-brown-soft">
                  A real message from {p.testimonial.by.split(",")[0]}
                </figcaption>
              </figure>
            )}
          </Reveal>
        )}

        {p.scope && (
          <Reveal className="mt-16 sm:mt-20">
            <p className="mono-label m-0 text-brown-soft">
              Scope — written down before work started
            </p>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight">
              What was in scope, and what wasn't
            </h2>
            <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
              {p.scope.included.map((g) => (
                <div key={g.title} className="bg-background p-6">
                  <h3 className="m-0 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-primary">
                    {g.title}
                  </h3>
                  <ul className="m-0 mt-4 flex list-none flex-col gap-2.5 p-0 text-[0.92rem] leading-snug text-foreground">
                    {g.items.map((it) => (
                      <li
                        key={it}
                        className="relative pl-4 before:absolute before:left-0 before:top-[0.62em] before:h-px before:w-2 before:bg-primary before:content-['']"
                      >
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-dashed border-border-strong p-6">
              <p className="m-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-brown-soft">
                Not included — available separately, whenever the client is ready
              </p>
              <ul className="m-0 mt-4 grid list-none gap-x-8 gap-y-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
                {p.scope.separate.map((s) => (
                  <li key={s.name} className="text-[0.9rem] leading-snug">
                    <span className="block text-foreground">{s.name}</span>
                    <span className="mt-0.5 block text-brown">{s.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {p.evidence && (
          <Reveal id="public-record" className="mt-16 scroll-mt-24 sm:mt-20">
            <p className="mono-label m-0 text-brown-soft">Public record</p>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight">
              The sale is public. Read it where it was posted.
            </h2>
            <ul className="m-0 mt-8 list-none divide-y divide-border overflow-hidden rounded-xl border border-border p-0">
              {p.evidence.map((e) => (
                <li key={e.href}>
                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 px-5 py-4 transition-colors duration-300 hover:bg-frame/60"
                  >
                    <span className="w-[4.5rem] shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-primary">
                      {e.source}
                    </span>
                    <span className="flex-1 text-[1rem] text-foreground transition-colors group-hover:text-primary">
                      {e.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-brown-soft transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal className="mx-auto max-w-[640px] pb-10 pt-16 text-center sm:pt-24">
          <p className="font-serif text-[clamp(1.5rem,3vw,2rem)] italic leading-[1.45] text-foreground">
            “{p.quote}”
          </p>
        </Reveal>

        <Reveal className="pb-16 text-center sm:pb-20">
          <p className="mono-label mb-4 text-brown-soft">Share this case study</p>
          <ShareRow url={`https://sumanthdev.me/work/${p.slug}`} title={p.title} />
        </Reveal>

        <Reveal className="mb-16 flex flex-col gap-5 rounded-xl border border-primary/40 bg-frame/60 p-6 sm:mb-24 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-[48ch]">
            <p className="mono-label m-0 text-primary">Want something like this?</p>
            <p className="m-0 mt-2.5 font-serif text-[clamp(1.4rem,2.6vw,1.8rem)] leading-snug text-foreground">
              One call, a fixed price, a live link in about two weeks.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine rounded-full bg-foreground px-6 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-background transition-colors duration-300 hover:bg-primary"
            >
              Book a 30-min call ↗
            </a>
            <a
              href={whatsappLink(
                `Hi Sumanth, I just read your ${p.title} case study and I'd like something similar. Here's what I have in mind: `,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border-strong px-6 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              WhatsApp ↗
            </a>
          </div>
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
            hash="work"
            className="font-mono text-[0.74rem] uppercase tracking-[0.05em] text-on-dark-muted hover:text-primary"
          >
            View all work
          </Link>
        </div>
      </section>
    </>
  );
}
