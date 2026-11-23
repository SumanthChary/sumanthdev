import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState } from "react";
import { ImageFrame } from "@/components/ImageFrame";
import { Reveal } from "@/components/Reveal";
import { MagneticLink } from "@/components/MagneticLink";
import {
  CALENDLY,
  ContactSection,
  SiteFooter,
  SiteNav,
  WHATSAPP,
  whatsappLink,
} from "@/components/SiteChrome";
import { getProject, projects } from "@/data/projects";
import { AVAILABILITY, addOns, faqs, packages } from "@/data/site";
import { GITHUB_URL, featuredRepos, langColor, repos } from "@/data/github";
import face from "@/assets/media/sumanth-face.webp";
import { LuffyPet } from "@/components/LuffyPet";
import { HeroStage } from "@/components/HeroStage";

const SITE = "https://sumanthdev.me";
const OG_IMAGE = `${SITE}/og-cover.jpg`;
const TITLE = "Sumanth Chary — Indie AI Product Builder";
const DESCRIPTION =
  "Founder who ships AI products end to end — design, code, payments, growth. Built & sold LegalDeep AI, runs PostPro AI, ships client stores. See the work and case studies.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Sumanth Chary, Sumanth Dev, indie AI product builder, AI SaaS developer India, AI agents developer, freelance web developer India, GEO SEO, Shopify storefront developer, Vertex AI, Lovable developer",
      },
      { name: "geo.region", content: "IN" },
      { name: "author", content: "Sumanth Chary" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:site_name", content: "Sumanth Chary" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Sumanth Chary — Indie AI Product Builder" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@SumanthChary07" },
      { name: "twitter:creator", content: "@SumanthChary07" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": `${SITE}/#person`,
              name: "Sumanth Chary",
              url: `${SITE}/`,
              image: OG_IMAGE,
              email: "mailto:sumanthcharyy@gmail.com",
              telephone: "+918125228079",
              alternateName: ["Sumanth Dev", "Sumanth"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+918125228079",
                email: "sumanthcharyy@gmail.com",
                contactType: "business enquiries",
                areaServed: "IN",
                availableLanguage: ["English", "Telugu", "Hindi"],
              },
              jobTitle: "Indie AI Product Builder",
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
              },
              worksFor: { "@type": "Organization", name: "Independent" },
              homeLocation: { "@type": "Place", name: "India" },
              knowsAbout: [
                "AI SaaS development",
                "AI agents and automations",
                "UI/UX design",
                "Product management",
                "Business analysis",
                "Data analysis",
                "Generative engine optimization",
                "SEO",
                "Full-stack engineering",
                "Vertex AI prompt design",
              ],
              sameAs: [
                "https://x.com/SumanthChary07",
                "https://www.linkedin.com/in/sumanthchary",
                GITHUB_URL,
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE}/#website`,
              url: `${SITE}/`,
              name: TITLE,
              description: DESCRIPTION,
              inLanguage: "en",
              publisher: { "@id": `${SITE}/#person` },
            },
            {
              "@type": "ProfessionalService",
              "@id": `${SITE}/#service`,
              name: "Sumanth Chary — web & AI product studio (solo)",
              url: `${SITE}/`,
              provider: { "@id": `${SITE}/#person` },
              areaServed: ["IN", "US"],
              priceRange: "₹18,000+",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Fixed-price builds",
                itemListElement: packages.map((pk) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: pk.name, description: pk.for },
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    minPrice: pk.priceFrom,
                    priceCurrency: "INR",
                  },
                })),
              },
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE}/#faq`,
              mainEntity: faqs.map(([q, a]) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
            {
              "@type": "ProfilePage",
              "@id": `${SITE}/#profilepage`,
              url: `${SITE}/`,
              name: TITLE,
              about: { "@id": `${SITE}/#person` },
              isPartOf: { "@id": `${SITE}/#website` },
              primaryImageOfPage: OG_IMAGE,
            },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

const heroWords = ["I", "build", "the", "product."];
const heroWords2 = ["Then", "I", "make", "it"];

function Dot({ live }: { live: boolean }) {
  return (
    <span
      className={
        live
          ? "size-[5px] shrink-0 rounded-full bg-primary"
          : "size-[5px] shrink-0 rounded-full border border-brown-soft"
      }
    />
  );
}

/** the cartoon face — used as a small friendly accent throughout */
function FaceBadge({ className }: { className?: string }) {
  return (
    <img
      src={face}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`select-none rounded-full border border-border bg-background object-cover ${className ?? ""}`}
    />
  );
}

function Home() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <Receipts />
        <Work />
        <ClientWork />
        <Lab />
        <Skills />
        <About />
        <Process />
        <Investment />
        <Faq />
        <ContactSection />
      </main>

      <SiteFooter />
      <LuffyPet />
    </>
  );
}

/** Live local time — tells a client in another timezone exactly when you're around. */
function IstClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time ? `${time} IST now` : "IST"}</span>;
}

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  let i = 0;
  const word = (w: string, accent = false) => {
    const delay = 0.12 + i * 0.055;
    i += 1;
    return (
      <Fragment key={`${w}-${delay}`}>
        <span className="inline-block overflow-hidden align-top">
          <span
            className={`animate-word-rise inline-block${accent ? " italic text-primary" : ""}`}
            style={{ animationDelay: `${delay}s` }}
          >
            {w}
          </span>
        </span>{" "}
      </Fragment>
    );
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex items-center overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-28 lg:min-h-[70svh]"
    >
      {/* ambient light that follows the pointer — cheap: one CSS variable pair, no React state */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(620px circle at var(--mx, 72%) var(--my, 38%), oklch(0.618 0.203 34 / 0.13), transparent 62%)",
        }}
      />
      <div className="wrap grid w-full items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
        {/* headline and CTAs come first on every screen — mobile visitors read before they scroll */}
        <div>
          <p
            className="animate-fade-rise mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']"
            style={{ animationDelay: "0.05s" }}
          >
            Indie AI Product Builder · 19 · India
          </p>
          <h1 className="mb-7 mt-5 text-[clamp(2.5rem,6vw,4.8rem)] leading-[1.06]">
            {heroWords.map((w) => word(w))}
            <br />
            {heroWords2.map((w) => word(w))}
            {word("sell.", true)}
          </h1>
          <p
            className="animate-fade-rise mb-9 max-w-[44ch] text-[clamp(1rem,1.5vw,1.12rem)] leading-[1.65] text-brown"
            style={{ animationDelay: "0.5s" }}
          >
            Solo-built AI products and client stores — design, code, payments, growth. Founded,
            built and sold LegalDeep AI. One person, the whole pipeline.
          </p>
          <p
            className="animate-fade-rise mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-brown"
            style={{ animationDelay: "0.56s" }}
          >
            {AVAILABILITY.open && (
              <span className="flex items-center gap-2 text-foreground">
                <span className="size-2 rounded-full bg-primary" />
                {AVAILABILITY.label}
              </span>
            )}
            <span className="text-brown-soft">
              {projects.length} shipped · {projects.filter((p) => p.live && p.liveUrl).length} live
              · 1 sold
            </span>
          </p>
          <div
            className="animate-fade-rise flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: "0.62s" }}
          >
            <MagneticLink href="#contact" className="btn-shine">
              Start a project
            </MagneticLink>
            <a
              href="#work"
              className="tap-area border-b border-border-strong pb-1 font-mono text-[0.78rem] uppercase tracking-[0.05em] text-brown transition-colors hover:border-primary hover:text-primary"
            >
              View the work
            </a>
          </div>
        </div>

        <Reveal delay={200}>
          <HeroStage
            chip={
              <div className="group flex items-center gap-3 rounded-full border border-border-strong bg-background/80 py-1.5 pl-1.5 pr-5 shadow-[var(--shadow-float)] backdrop-blur">
                <FaceBadge className="size-11 shrink-0 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:rotate-[10deg] group-hover:scale-110" />
                <div className="min-w-0">
                  <p className="m-0 font-serif text-[1.15rem] italic leading-tight text-foreground">
                    Sumanth Chary
                  </p>
                  <p className="m-0 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-brown-soft">
                    India · <IstClock />
                  </p>
                </div>
              </div>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}

/** Proof within the first scroll: every cell is something a visitor can open and check. */
function Receipts() {
  const items: {
    label: string;
    title: string;
    note: string;
    cta: string;
    href?: string | undefined;
    to?: string;
    live: boolean;
  }[] = [
    {
      label: "Live product",
      title: "PostPro AI",
      note: "Voice-matching LinkedIn writer, running in production.",
      cta: "postproai.app ↗",
      href: getProject("postpro-ai")?.liveUrl,
      live: true,
    },
    {
      label: "Live client store",
      title: "Sri Vastrika",
      note: "Custom storefront for a real label, taking real orders.",
      cta: "srivastrika.store ↗",
      href: getProject("sri-vastrika")?.liveUrl,
      live: true,
    },
    {
      label: "Open source",
      title: "Open source",
      note: "Agents, automations and experiments — all readable.",
      cta: "github.com/SumanthChary ↗",
      href: GITHUB_URL,
      live: true,
    },
    {
      label: "Founded & sold",
      title: "LegalDeep AI",
      note: "Built from zero, then sold. The sale was announced publicly — see the record.",
      cta: "See the public record",
      to: "legaldeep-ai",
      live: false,
    },
  ];

  const linkClass =
    "mt-4 inline-block w-fit border-b border-border-strong pb-1 font-mono text-[0.66rem] uppercase tracking-[0.05em] text-foreground transition-colors group-hover:border-primary group-hover:text-primary";

  return (
    <section aria-label="Proof you can check" className="border-y border-border">
      <div className="wrap">
        <p className="mono-label flex items-center gap-2.5 pb-1 pt-6 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
          Receipts — I'd rather be verified than believed
        </p>
        <ul className="m-0 grid list-none p-0 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li
              key={it.title}
              className="border-b border-border last:border-b-0 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              {(() => {
                const inner = (
                  <>
                    <span className="flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-brown-soft">
                      <Dot live={it.live} />
                      {it.label}
                    </span>
                    <span className="mt-3 block font-serif text-[1.55rem] leading-tight text-foreground transition-colors group-hover:text-primary">
                      {it.title}
                    </span>
                    <span className="mt-2 block flex-1 text-[0.88rem] leading-snug text-brown">
                      {it.note}
                    </span>
                    <span className={linkClass}>{it.cta}</span>
                  </>
                );
                const cls = "glow-card group flex h-full flex-col px-1 py-6 sm:px-6 sm:first:pl-1";
                return it.to ? (
                  <Link
                    to="/work/$slug"
                    params={{ slug: it.to }}
                    hash="public-record"
                    className={cls}
                  >
                    {inner}
                  </Link>
                ) : (
                  <a href={it.href} target="_blank" rel="noopener noreferrer" className={cls}>
                    {inner}
                  </a>
                );
              })()}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const skillGroups = [
  {
    label: "Design",
    items: ["UI/UX design", "Design systems", "Brand identity", "Motion"],
  },
  {
    label: "Build",
    items: [
      "SaaS products",
      "AI agents & automations",
      "Frontend engineering",
      "Payments & API integration",
    ],
  },
  {
    label: "Product",
    items: ["Product management", "Business analysis", "Data analysis"],
  },
  {
    label: "Growth",
    items: [
      "SEO",
      "Generative engine optimization (GEO)",
      "Landing pages that convert",
      "Analytics",
    ],
  },
];

function Skills() {
  return (
    <section id="skills" className="py-[clamp(64px,9vw,110px)]">
      <div className="wrap">
        <Reveal className="mb-10">
          <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            Capabilities
          </p>
          <h2 className="mt-3.5 text-[clamp(1.9rem,4vw,3rem)]">What I do — and have shipped</h2>
        </Reveal>

        <Reveal className="border-t border-border-strong">
          {skillGroups.map((g) => (
            <div
              key={g.label}
              className="grid gap-3 border-b border-border py-7 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-8 sm:py-8"
            >
              <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-brown-soft sm:pt-1">
                {g.label}
              </h3>
              <ul className="m-0 flex list-none flex-wrap items-center gap-x-5 gap-y-2 sm:gap-x-4 p-0 text-[1rem] leading-snug text-foreground sm:gap-x-4 sm:text-[1.08rem]">
                {g.items.map((s, idx) => (
                  <li key={s} className="flex items-center gap-3 sm:gap-4">
                    {s}
                    {idx < g.items.length - 1 && (
                      <span aria-hidden="true" className="hidden text-brown-soft/60 sm:inline">
                        /
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  ["01", "One call", "20–30 minutes. What you sell, who buys it, what's in the way."],
  ["02", "Fixed scope & price", "Written down before anything starts. No hourly surprises."],
  [
    "03",
    "Live in ~2 weeks",
    "You get a real URL early and watch it improve — no big reveal at the end.",
  ],
  [
    "04",
    "After launch",
    "Two weeks of fixes included. Ongoing SEO, GEO, ads and monthly care are optional add-ons — never bundled in.",
  ],
];

function Process() {
  return (
    <section id="process" className="border-t border-border-strong py-[clamp(64px,9vw,100px)]">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            How it works
          </p>
          <h2 className="mt-3.5 text-[clamp(1.9rem,4vw,2.8rem)]">Four steps. One person.</h2>
        </Reveal>
        <Reveal delay={100}>
          <ol className="m-0 grid list-none gap-x-8 gap-y-7 p-0 sm:grid-cols-2">
            {steps.map(([n, t, d]) => (
              <li key={n} className="flex gap-3.5 border-t border-border-strong pt-4">
                <span className="font-mono text-[0.7rem] text-primary">{n}</span>
                <span>
                  <span className="block text-[1.05rem] text-foreground">{t}</span>
                  <span className="mt-1 block text-[0.88rem] leading-snug text-brown">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

function Work() {
  const [preview, setPreview] = useState<{
    tint: string;
    label: string;
    src: string | null;
  } | null>(null);

  const pos = useRef({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const active = preview !== null;

  // The cursor-follow preview only animates while a row is hovered, and never on touch devices.
  useEffect(() => {
    if (!active || !window.matchMedia("(hover: hover)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (previewRef.current) {
        previewRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [active]);

  return (
    <section id="work" className="py-[clamp(80px,10vw,120px)]">
      <div className="wrap">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
              Selected work
            </p>
            <h2 className="mt-3.5 text-[clamp(2rem,4vw,3rem)]">Work</h2>
          </div>
          <p className="m-0 max-w-[34ch] text-[0.95rem] leading-relaxed text-brown">
            {projects.length} things I've built recently. Click a project to open its case study.
          </p>
        </Reveal>

        <Reveal className="border-t border-border-strong">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              onMouseEnter={(e) => {
                target.current = { x: e.clientX, y: e.clientY };
                pos.current = { x: e.clientX, y: e.clientY };
                setPreview({
                  tint: p.tint,
                  label: p.concept && !p.hero ? `${p.title} · concept` : p.title,
                  src: p.hero ?? p.concept?.src ?? null,
                });
              }}
              onMouseLeave={() => setPreview(null)}
              className="group grid grid-cols-[76px_minmax(0,1fr)] items-center gap-x-4 gap-y-2 border-b border-border py-5 transition-[padding-left] duration-500 ease-[var(--ease-out-soft)] hover:pl-3.5 md:grid-cols-[64px_88px_1fr_auto_auto] md:gap-x-5 md:py-6"
            >
              <span className="hidden font-mono text-[0.78rem] text-brown-soft md:block">
                {p.index}
              </span>
              <ImageFrame
                label={p.title}
                tint={p.tint}
                src={p.hero ?? p.concept?.src}
                alt={`${p.title} ${p.hero ? "preview" : "concept illustration"}`}
                concept={!p.hero && !!p.concept}
                compact
                className="h-14 w-[76px] max-w-full shrink-0 rounded-md md:h-16 md:w-[88px]"
              />
              <div className="min-w-0">
                <h3 className="mb-1 text-[clamp(1.2rem,5vw,2.1rem)] leading-tight transition-colors duration-300 group-hover:text-primary">
                  {p.title}
                </h3>
                <p className="m-0 hidden max-w-[46ch] text-[0.87rem] leading-snug text-brown sm:block">
                  {p.description}
                </p>
              </div>
              <span className="col-span-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.64rem] uppercase tracking-[0.06em] text-brown-soft md:col-span-1 md:col-auto md:whitespace-nowrap">
                {p.tag}
                <span className="flex items-center gap-2 text-brown md:hidden">
                  <span aria-hidden="true">·</span>
                  <Dot live={p.live} />
                  {p.status}
                </span>
              </span>
              <span className="hidden items-center gap-2 whitespace-nowrap font-mono text-[0.66rem] uppercase tracking-[0.05em] text-brown md:flex">
                <Dot live={p.live} />
                {p.status}
              </span>
              <span
                aria-hidden="true"
                className="col-start-2 -mt-1 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-primary md:hidden"
              >
                Read case study →
              </span>
            </Link>
          ))}
        </Reveal>
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-40 hidden h-[150px] w-[230px] overflow-hidden rounded-md bg-cover bg-top shadow-[var(--shadow-float)] transition-opacity duration-300 [@media(hover:hover)]:block ${
          preview ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: preview
            ? preview.src
              ? `url(${preview.src})`
              : `var(${preview.tint})`
            : undefined,
        }}
      >
        <div className="flex h-full w-full items-end bg-gradient-to-t from-foreground/70 to-transparent p-3.5">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.05em] text-on-dark">
            {preview?.label}
          </span>
        </div>
      </div>
    </section>
  );
}

/** Minimal Shopify bag mark, drawn in Shopify brand green. */
function ShopifyMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="oklch(0.63 0.14 145)"
        d="M15.3 3.4a.5.5 0 0 0-.45-.4c-.2 0-1.6.1-1.6.1l-1.1-1.1a.5.5 0 0 0-.55-.1L10.9 2.3C10.5 1.2 9.8.5 8.9.5c-1.6 0-2.9 1.9-3.4 4.3l-1.4.4c-.7.2-.75.25-.85 1L2 20.6l12.1 2.3 5.2-1.3S15.35 3.7 15.3 3.4ZM10.1 2.6l-1.4.45C8.8 1.9 9.2 1.4 9.6 1.4c.3.2.45.7.5 1.2Zm-2 .65-2 .6c.35-1.5 1.1-2.7 1.9-3.1-.1.5-.15 1.35 0 2.5Z"
      />
      <path
        fill="oklch(0.98 0 0)"
        d="M13.4 10.6l-.7 2.1s-.7-.35-1.5-.3c-1.2.05-1.2.8-1.2.95.05.9 2.5 1.15 2.65 3.35.1 1.7-.9 2.9-2.4 3-1.8.1-2.8-.95-2.8-.95l.4-1.6s1 .75 1.8.7c.5-.05.7-.45.7-.75-.1-1.2-2.05-1.1-2.2-3.1-.1-1.7 1-3.4 3.4-3.55 1-.05 1.85.15 1.85.15Z"
      />
    </svg>
  );
}

/** Client engagements, framed for people deciding whether to hire me. */
function ClientWork() {
  const clientProjects = projects.filter((p) => p.client);
  return (
    <section id="client-work" className="border-t border-border-strong py-[clamp(72px,10vw,120px)]">
      <div className="wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
              Client work
            </p>
            <h2 className="mt-3.5 text-[clamp(2rem,4vw,3rem)]">Businesses I've shipped for</h2>
          </div>
          <p className="m-0 max-w-[38ch] text-[0.95rem] leading-relaxed text-brown">
            Not mockups. Real businesses with real customers — here's exactly what they got and what
            changed for them.
          </p>
        </Reveal>

        <div className="grid gap-5">
          {clientProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <article className="glow-card grid h-full gap-7 rounded-xl border border-border bg-frame/50 p-6 transition-colors duration-300 hover:border-primary sm:p-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-10">
                <div className="flex flex-col gap-4">
                  {p.hero && (
                    <div className="overflow-hidden rounded-lg border border-border bg-frame">
                      <img
                        src={p.hero}
                        alt={`${p.title} storefront homepage`}
                        loading="lazy"
                        decoding="async"
                        className="h-52 w-full object-cover object-top lg:h-64"
                      />
                    </div>
                  )}
                  {p.client!.platform === "Shopify" && (
                    <div className="flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3.5">
                      <ShopifyMark className="size-7 shrink-0" />
                      <span className="font-mono text-[0.66rem] uppercase leading-tight tracking-[0.1em] text-brown">
                        Shopify backend
                        <small className="mt-1 block text-[0.92em] normal-case tracking-[0.02em] text-brown-soft">
                          Front end designed &amp; built by me
                        </small>
                      </span>
                    </div>
                  )}

                  {p.client!.platform && p.client!.platform !== "Shopify" && (
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-primary">
                      Built on {p.client!.platform}
                    </span>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-area w-fit border-b border-border-strong pb-1 font-mono text-[0.7rem] uppercase tracking-[0.05em] text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      Visit the live store ↗
                    </a>
                  )}
                </div>

                <div className="flex min-w-0 flex-col">
                  <p className="mono-label mb-3 text-brown-soft">{p.client!.serviceLine}</p>
                  <h3 className="mb-4 text-[clamp(1.5rem,3vw,2rem)] leading-tight">{p.title}</h3>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-2.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary">
                        Delivered
                      </h4>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[0.9rem] leading-snug text-brown">
                        {p.client!.delivered.map((d) => (
                          <li
                            key={d}
                            className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-brown-soft before:content-['']"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary">
                        What changed
                      </h4>
                      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[0.9rem] leading-snug text-foreground">
                        {p.client!.outcomes.map((o) => (
                          <li
                            key={o}
                            className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-primary before:content-['']"
                          >
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {p.testimonial && (
                    <figure className="m-0 mt-7 border-l-2 border-primary pl-5">
                      <blockquote className="m-0 font-serif text-[clamp(1.4rem,2.6vw,1.9rem)] italic leading-snug text-foreground">
                        “{p.testimonial.quote}”
                      </blockquote>
                      <figcaption className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brown-soft">
                        {p.testimonial.by}
                      </figcaption>
                    </figure>
                  )}

                  <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
                    <Link
                      to="/work/$slug"
                      params={{ slug: p.slug }}
                      className="tap-area border-b border-border-strong pb-1 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      Read the case study
                    </Link>
                    <span className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.05em] text-brown">
                      <Dot live={p.live} />
                      {p.status}
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A curated slice of the public repos — the rest are one click away. */
function Lab() {
  return (
    <section id="lab" className="border-t border-border-strong py-[clamp(72px,10vw,110px)]">
      <div className="wrap">
        <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
              The lab
            </p>
            <h2 className="mt-3.5 text-[clamp(1.9rem,4vw,2.8rem)]">Built in public</h2>
            <p className="mt-3 max-w-[48ch] text-[0.95rem] leading-relaxed text-brown">
              Agents, automations and experiments — a selection. The rest are on GitHub.
            </p>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-area border-b border-border-strong pb-1 font-mono text-[0.74rem] uppercase tracking-[0.05em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            github.com/SumanthChary ↗
          </a>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredRepos.map((r) => (
            <a
              key={r.name}
              href={`${GITHUB_URL}/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-card group flex flex-col rounded-xl border border-border bg-frame/40 p-5 transition-colors duration-300 hover:border-primary hover:bg-frame"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="truncate font-mono text-[0.88rem] text-foreground transition-colors group-hover:text-primary">
                  {r.name}
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-brown-soft transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-primary"
                >
                  ↗
                </span>
              </span>
              <span className="mt-2 block flex-1 text-[0.86rem] leading-snug text-brown">
                {r.blurb}
              </span>
              <span className="mt-4 flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-brown-soft">
                {r.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-[7px] rounded-full"
                      style={{ backgroundColor: langColor(r.language) ?? "var(--color-primary)" }}
                    />
                    {r.language}
                  </span>
                )}
                <span className="rounded-full border border-border px-2.5 py-0.5">{r.kind}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const achievements = [
  { title: "Prompt Design in Vertex AI", by: "Google · certificate" },
  { title: "Machine Learning & AI", by: "Google · certificate, Sep 2026" },
  { title: "Outlier AI Frontend Hackathon", by: "Finalist · Apr 2025" },
  { title: "100xEngineers Generative AI Buildathon", by: "Semi-finalist · Jun 2025" },
];

function About() {
  return (
    <section id="about" className="border-t border-border-strong py-[clamp(80px,10vw,120px)]">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-[70px]">
        <Reveal className="relative">
          <div className="rounded-xl border border-dashed border-border-strong bg-frame p-6">
            <div className="flex items-center gap-4">
              <FaceBadge className="size-16" />
              <div>
                <p className="m-0 flex items-center gap-1.5 font-serif text-[1.3rem] italic leading-tight text-foreground">
                  Sumanth Chary
                </p>
                <p className="m-0 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-brown-soft">
                  India
                </p>
              </div>
            </div>
            <ul className="m-0 mt-6 flex list-none flex-col gap-0 border-t border-border p-0">
              {[
                ["Based in", "India · IST"],
                ["Obsessed with", "Building & designing stuff"],
                ["Works", "End to end, solo"],
                ["Ships in", "Weeks, not quarters"],
                ["You talk to", "Me. Always."],
              ].map(([k, v]) => (
                <li key={k} className="border-b border-border py-3 last:border-b-0">
                  <span className="block font-mono text-[0.6rem] uppercase tracking-[0.14em] text-brown-soft">
                    {k}
                  </span>
                  <span className="mt-1 block text-[0.95rem] text-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mono-label mb-4 flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            About
          </p>
          <p className="mb-6 max-w-[20ch] font-serif text-[1.7rem] italic leading-[1.4] text-foreground">
            “I'd rather ship something real than plan something perfect.”
          </p>
          <p className="max-w-[58ch] text-[1.02rem] leading-[1.75] text-brown">
            I'm 19, from India, and I build AI-powered products end to end — design the interface,
            wire up the backend, connect payments, then go find the people who'll actually use it. I
            founded, built and sold LegalDeep AI, run PostPro AI as a live product, and ship client
            storefronts with Shopify doing the heavy lifting behind a custom front end.
          </p>
          <div className="mt-8 max-w-[58ch] border-t border-border pt-6">
            <p className="mono-label mb-3 text-brown-soft">Recognition</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {achievements.map((a) => (
                <li
                  key={a.title}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 text-[0.95rem] leading-snug text-foreground"
                >
                  {a.title}
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-brown-soft">
                    {a.by}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Money talk, up front — the section most freelancers hide. */
function Investment() {
  return (
    <section id="investment" className="border-t border-border-strong py-[clamp(64px,9vw,110px)]">
      <div className="wrap">
        <Reveal className="mb-10 max-w-[54ch]">
          <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            What it costs
          </p>
          <h2 className="mt-3.5 text-[clamp(1.9rem,4vw,2.8rem)]">
            Priced before we start. Never by the hour.
          </h2>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-brown">
            Starting points, so you know in ten seconds whether we're a fit. After one short call
            you get a fixed quote in writing — and that's the price you pay.
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 90}>
              <article
                className={`glow-card flex h-full flex-col rounded-xl border p-6 transition-colors duration-300 hover:border-primary sm:p-7 ${
                  p.featured ? "border-primary/50 bg-frame/60" : "border-border"
                }`}
              >
                <h3 className="text-[1.35rem] leading-tight">{p.name}</h3>
                <p className="mt-3 font-serif text-[2rem] leading-none text-primary">{p.price}</p>
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-brown-soft">
                  Typically {p.time}
                </p>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-brown">{p.for}</p>
                {p.featured && (
                  <span className="mt-4 w-fit rounded-full bg-primary px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-primary-foreground">
                    Proven — see Sri Vastrika
                  </span>
                )}
                <ul className="m-0 mt-5 flex flex-1 list-none flex-col gap-2 border-t border-border p-0 pt-5 text-[0.88rem] leading-snug text-foreground">
                  {p.includes.map((it) => (
                    <li
                      key={it}
                      className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-primary before:content-['']"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(
                    `Hi Sumanth, I saw your portfolio and I'm interested in the "${p.name}" build (${p.price}). Here's what I have in mind: `,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn-shine mt-6 rounded-full px-5 py-3 text-center font-mono text-[0.7rem] uppercase tracking-[0.05em] transition-colors duration-300 ${
                    p.featured
                      ? "bg-foreground text-background hover:bg-primary"
                      : "border border-border-strong text-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  Discuss this build ↗
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
          {[
            ["Payments", "50% to start, 50% on launch. Bigger builds split into milestones."],
            ["Ownership", "Code, domain, accounts — all in your name. No lock-in, ever."],
            ["After launch", "Two weeks of fixes included. Then monthly care only if you want it."],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-6">
              <p className="m-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary">
                {k}
              </p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-brown">{v}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-6 rounded-xl border border-border p-6">
          <p className="m-0 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-primary">
            Available separately — whenever you're ready
          </p>
          <ul className="m-0 mt-4 grid list-none gap-x-8 gap-y-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {addOns.map((a) => (
              <li key={a.name} className="text-[0.9rem] leading-snug">
                <span className="block text-foreground">{a.name}</span>
                <span className="mt-0.5 block text-brown">{a.note}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-6 flex flex-col gap-4 rounded-xl border border-dashed border-frame-border bg-frame/50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0 max-w-[62ch] text-[0.92rem] leading-relaxed text-brown">
            These are starting points, not sealed quotes. The final number depends on scope, rounds
            of changes and timeline — you'll get an exact figure, in writing, after one 30-minute
            call.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine rounded-full bg-foreground px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-background transition-colors duration-300 hover:bg-primary"
            >
              Get an exact quote ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-t border-border-strong py-[clamp(64px,9vw,110px)]">
      <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            Before you message
          </p>
          <h2 className="mt-3.5 text-[clamp(1.9rem,4vw,2.6rem)]">The honest answers</h2>
          <div className="mt-6 flex items-center gap-3">
            <FaceBadge className="size-11" />
            <p className="m-0 text-[0.9rem] leading-snug text-brown">
              Still unsure? Ask me the awkward question directly.
            </p>
          </div>
        </Reveal>
        <Reveal className="border-t border-border-strong" delay={100}>
          {faqs.map(([q, a]) => (
            <details key={q} className="group border-b border-border py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-[1.05rem] leading-snug text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
                {q}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-mono text-primary transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="m-0 mt-3 max-w-[62ch] text-[0.94rem] leading-relaxed text-brown">{a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
