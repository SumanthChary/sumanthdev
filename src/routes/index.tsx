import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ImageFrame } from "@/components/ImageFrame";
import { Reveal } from "@/components/Reveal";
import { MagneticLink } from "@/components/MagneticLink";
import {
  CALENDLY,
  ContactSection,
  PHONE,
  PHONE_RAW,
  ResumeButton,
  SiteFooter,
  SiteNav,
  WHATSAPP,
} from "@/components/SiteChrome";
import { projects } from "@/data/projects";
import { GITHUB_URL, repos } from "@/data/github";
import portrait from "@/assets/media/sumanth-portrait.webp";
import desk from "@/assets/media/sumanth-desk.webp";
import face from "@/assets/media/sumanth-face.webp";
import luffyWalk from "@/assets/media/luffy-walk.webp";
import luffyIdle from "@/assets/media/luffy-idle.webp";

const SITE = "https://sumanthdev.me";
const OG_IMAGE = `${SITE}/og-cover.jpg`;
const TITLE = "Sumanth Chary — Indie AI Builder & Growth Marketer";
const DESCRIPTION =
  "Solo-built AI products — design, code, payments and growth — plus paid ad campaigns for healthcare clients across Telangana, India. See the work and case studies.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      {
        name: "keywords",
        content:
          "Sumanth Chary, indie AI builder, AI SaaS developer, AI agents developer, growth marketer Hyderabad, Lovable developer, freelance web developer Hyderabad, Google Ads healthcare, Shopify store developer India",
      },
      { name: "geo.region", content: "IN-TG" },
      { name: "geo.placename", content: "Hyderabad" },
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
      { property: "og:image:alt", content: "Sumanth Chary — I build the product. Then I make it sell." },
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
              jobTitle: "Indie AI Product Builder & Growth Marketer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressRegion: "Telangana",
                addressCountry: "IN",
              },
              worksFor: { "@type": "Organization", name: "Independent" },
              homeLocation: { "@type": "Place", name: "Hyderabad, Telangana, India" },
              knowsAbout: [
                "AI SaaS development",
                "AI agents and automations",
                "UI/UX design",
                "Frontend engineering",
                "Growth marketing",
                "Google Ads",
                "Meta Ads",
                "SEO",
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

const tickerItems = [
  { label: "PostPro AI — Live", live: true },
  { label: "FlipScan AI — Growing", live: false },
  { label: "LegalDeep AI — Building", live: false },
  { label: "Sri Vastrika — Shopify store, live", live: true },
  { label: "30-min intro calls open", live: true },
  { label: "Booking new client work", live: true },
];

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
      <div className="grain" aria-hidden="true" />
      <SiteNav />
      <main>
        <Hero />
        <Ticker />
        <Work />
        <ClientWork />
        <Proof />
        <Skills />
        <Stack />
        <Lab />
        <Growth />
        <About />
        <ContactSection />
      </main>

      <SiteFooter />
    </>
  );
}

function Hero() {
  let i = 0;
  const word = (w: string, accent = false) => {
    const delay = 0.12 + i * 0.055;
    i += 1;
    return (
      <span key={`${w}-${delay}`} className="mr-[0.24em] inline-block overflow-hidden align-top">
        <span
          className={`animate-word-rise inline-block${accent ? " italic text-primary" : ""}`}
          style={{ animationDelay: `${delay}s` }}
        >
          {w}
        </span>
      </span>
    );
  };

  return (
    <section
      id="top"
      className="relative flex items-center overflow-hidden pb-12 pt-24 sm:pb-16 sm:pt-28 lg:min-h-svh"
    >
      <div className="wrap grid w-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">

        <div className="order-2 lg:order-1">
          <p
            className="animate-fade-rise mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']"
            style={{ animationDelay: "0.05s" }}
          >
            Indie builder · Growth marketer · Hyderabad, India
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
            Solo AI products shipped end-to-end — design, code, payments, and growth — plus paid
            campaigns run for real clients. One person, both halves of the job.
          </p>
          <div
            className="animate-fade-rise flex flex-wrap items-center gap-x-8 gap-y-4"
            style={{ animationDelay: "0.62s" }}
          >
            <MagneticLink href="#contact">Start a project</MagneticLink>
            <ResumeButton />
            <a
              href="#work"
              className="border-b border-border-strong pb-1 font-mono text-[0.78rem] uppercase tracking-[0.05em] text-brown transition-colors hover:border-primary hover:text-primary"
            >
              View the work
            </a>
          </div>

        </div>
        <Reveal className="relative order-1 lg:order-2" delay={200}>
          <div className="relative overflow-hidden rounded-xl border border-border-strong bg-frame p-7 shadow-[var(--shadow-float)] sm:p-8">
            <div className="flex items-center gap-4">
              <FaceBadge className="size-16 shrink-0 sm:size-20" />
              <div>
                <p className="m-0 font-serif text-[1.5rem] italic leading-tight text-foreground">
                  Sumanth Chary
                </p>
                <p className="m-0 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brown-soft">
                  Hyderabad, India · IST
                </p>
              </div>
            </div>
            <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-5 border-t border-border pt-6">
              {[
                { k: "Products shipped", v: "5" },
                { k: "Reply time", v: "< 24h" },
                { k: "Built solo", v: "100%" },
                { k: "Open slots", v: "2 / month" },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-brown-soft">
                    {s.k}
                  </dt>
                  <dd className="m-0 mt-1 font-serif text-[1.6rem] leading-none text-foreground">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-7 border-t border-border pt-5 text-[0.9rem] leading-relaxed text-brown">
              Design, code, payments and growth — same person from the first call to the launch
              tweet.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div
      aria-hidden="true"
      className="group overflow-hidden border-y border-border py-3.5"
    >
      <div className="animate-ticker flex w-max group-hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <div className="flex" key={dup}>
            {tickerItems.map((t) => (
              <span
                key={`${dup}-${t.label}`}
                className="flex items-center gap-2.5 whitespace-nowrap px-[30px] font-mono text-[0.72rem] tracking-[0.03em] text-brown"
              >
                <Dot live={t.live} />
                {t.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const skillGroups = [
  {
    label: "Design",
    items: [
      "UI/UX Design",
      "Design Systems",
      "Brand Identity",
      "Figma",
      "Motion Design",
      "Visual Systems",
    ],
  },
  {
    label: "Build",
    items: [
      "SaaS Development",
      "App Development",
      "Frontend Engineering",
      "API Integration",
      "Automations",
      "AI Agents",
      "Chatbots",
      "Animations",
      "Product Strategy",
      "Master of AI Tools",
      "No-Code",
    ],
  },
  {
    label: "Create",
    items: ["Video Editing", "Content Writing", "Brand Strategy", "Scripting", "Social Media"],
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
          <h2 className="mt-3.5 text-[clamp(1.9rem,4vw,3rem)]">What I do</h2>
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
              <ul className="m-0 flex list-none flex-wrap items-center gap-x-3 gap-y-2 p-0 text-[1rem] leading-snug text-foreground sm:gap-x-4 sm:text-[1.08rem]">
                {g.items.map((s, idx) => (
                  <li key={s} className="flex items-center gap-3 sm:gap-4">
                    {s}
                    {idx < g.items.length - 1 && (
                      <span aria-hidden="true" className="text-brown-soft/60">
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

const proofPoints = [
  {
    stat: "5",
    label: "products & client builds shipped",
    note: "A live Shopify storefront, three AI products, one experiment — all built end to end by me.",
  },
  {
    stat: "100%",
    label: "solo — design to deployment",
    note: "No agency layer. The person you message is the person writing the code.",
  },
  {
    stat: "< 24h",
    label: "reply time on calls & WhatsApp",
    note: "Reachable on " + PHONE + " during IST hours, every working day.",
  },
  {
    stat: "2 wks",
    label: "typical first shipped version",
    note: "A real, live URL you can open — not a slide deck or a Figma file.",
  },
];

/** Trust block — the reasons someone should feel safe hiring a solo builder. */
function Proof() {
  return (
    <section
      id="proof"
      className="border-t border-border-strong py-[clamp(64px,9vw,110px)]"
    >
      <div className="wrap">
        <Reveal className="mb-10 max-w-[52ch]">
          <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            Why people trust me with it
          </p>
          <h2 className="mt-3.5 text-[clamp(1.9rem,4vw,2.8rem)]">
            Everything here is live and checkable.
          </h2>
          <p className="mt-4 text-[0.98rem] leading-relaxed text-brown">
            Every project on this page has a public URL, a GitHub repo, or a business you can ring
            up. Open them, poke around, then message me — I'd rather be verified than believed.
          </p>
        </Reveal>

        <Reveal className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {proofPoints.map((p) => (
            <div key={p.label} className="bg-background p-6">
              <p className="m-0 font-serif text-[2.4rem] leading-none text-primary">{p.stat}</p>
              <p className="mt-3 font-mono text-[0.64rem] uppercase tracking-[0.12em] text-foreground">
                {p.label}
              </p>
              <p className="mt-2.5 text-[0.86rem] leading-snug text-brown">{p.note}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-border p-6 sm:p-8">
            <h3 className="mb-5 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-primary">
              How a project runs
            </h3>
            <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
              {[
                ["01", "One call", "20 minutes on the phone or WhatsApp. What you sell, who buys it, what's in the way."],
                ["02", "Fixed scope & price", "Written down before anything starts. No hourly surprises."],
                ["03", "Live in ~2 weeks", "You get a real URL early and watch it improve, not a reveal at the end."],
                ["04", "Growth after launch", "SEO, ads, and iteration — the part most builders hand back to you."],
              ].map(([n, t, d]) => (
                <li key={n} className="flex gap-3.5">
                  <span className="font-mono text-[0.7rem] text-brown-soft">{n}</span>
                  <span>
                    <span className="block text-[1rem] text-foreground">{t}</span>
                    <span className="mt-1 block text-[0.86rem] leading-snug text-brown">{d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-xl border border-primary/40 bg-frame/60 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <FaceBadge className="size-12 shrink-0" />
              <p className="m-0 text-[0.98rem] leading-relaxed text-foreground">
                Prefer talking to typing? Book a free 30-minute call on my calendar — or just
                ring me. Same number, same person, no form in between.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-6 py-3.5 text-center font-mono text-[0.74rem] uppercase tracking-[0.04em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                Book a 30-min call ↗
              </a>
              <a
                href={`tel:${PHONE_RAW}`}
                className="rounded-full bg-foreground px-6 py-3.5 text-center font-mono text-[0.74rem] tracking-[0.04em] text-background transition-colors duration-300 hover:bg-primary"
              >
                {PHONE}
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border-strong px-6 py-3.5 text-center font-mono text-[0.72rem] uppercase tracking-[0.05em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                Message on WhatsApp ↗
              </a>
            </div>
          </div>
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

  useEffect(() => {
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
  }, []);

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
              onMouseEnter={() =>
                setPreview({ tint: p.tint, label: p.title, src: p.hero ?? null })
              }
              onMouseLeave={() => setPreview(null)}
              className="group grid grid-cols-[76px_minmax(0,1fr)] items-center gap-x-4 gap-y-2 border-b border-border py-5 transition-[padding-left] duration-500 ease-[var(--ease-out-soft)] hover:pl-3.5 md:grid-cols-[64px_88px_1fr_auto_auto] md:gap-x-5 md:py-6"
            >
              <span className="hidden font-mono text-[0.78rem] text-brown-soft md:block">
                {p.index}
              </span>
              <ImageFrame
                label={p.title}
                tint={p.tint}
                src={p.hero}
                alt={`${p.title} preview`}
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

/** Minimal Shopify bag mark, drawn in currentColor-free brand green. */
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
            Not mockups. Real businesses with real customers — here's exactly what they got and
            what changed for them.
          </p>
        </Reveal>

        <div className="grid gap-5">
          {clientProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <article className="grid h-full gap-7 rounded-xl border border-border bg-frame/50 p-6 transition-colors duration-300 hover:border-primary sm:p-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-10">
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
                        Built on Shopify
                        <small className="mt-1 block text-[0.92em] normal-case tracking-[0.02em] text-brown-soft">
                          Custom theme, not a template
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
                      className="w-fit border-b border-border-strong pb-1 font-mono text-[0.7rem] uppercase tracking-[0.05em] text-foreground transition-colors hover:border-primary hover:text-primary"
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

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
                  <Link
                    to="/work/$slug"
                    params={{ slug: p.slug }}
                    className="border-b border-border-strong pb-1 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-foreground transition-colors hover:border-primary hover:text-primary"
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

        <Reveal className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-border-strong p-6">
          <FaceBadge className="size-12" />
          <p className="m-0 max-w-[52ch] text-[0.95rem] leading-relaxed text-brown">
            Same treatment for your business: brand, site, and the growth work behind it — one
            person, one thread, no handoff gap.
          </p>
          <a
            href="#contact"
            className="rounded-full bg-foreground px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-background transition-colors duration-300 hover:bg-primary"
          >
            Work with me
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Everything on GitHub that doesn't have a full case study. */
function Lab() {
  return (
    <section id="lab" className="py-[clamp(72px,10vw,110px)]">
      <div className="wrap">
        <Reveal className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
              The lab
            </p>
            <h2 className="mt-3.5 text-[clamp(1.9rem,4vw,2.8rem)]">
              {repos.length}+ repos, still counting
            </h2>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-b border-border-strong pb-1 font-mono text-[0.74rem] uppercase tracking-[0.05em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            github.com/SumanthChary ↗
          </a>
        </Reveal>

        <Reveal className="grid gap-x-6 gap-y-0 border-t border-border-strong sm:grid-cols-2">
          {repos.map((r) => (
            <a
              key={r.name}
              href={`${GITHUB_URL}/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 border-b border-border py-3.5 transition-colors"
            >
              <span className="min-w-0">
                <span className="font-mono text-[0.86rem] text-foreground transition-colors group-hover:text-primary">
                  {r.name}
                </span>
                <span className="block truncate text-[0.82rem] leading-snug text-brown">
                  {r.blurb}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-brown-soft">
                {r.kind}
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Growth() {
  return (
    <section id="growth" className="py-[clamp(80px,10vw,120px)]">
      <div className="wrap grid gap-14 border-t border-border-strong pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-[70px]">
        <Reveal>
          <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            The other half
          </p>
          <h2 className="mb-4 mt-3.5 text-[clamp(2rem,4vw,2.8rem)]">
            Growth marketing, not just product.
          </h2>
          <p className="max-w-[50ch] text-[1.05rem] leading-[1.72] text-brown">
            Alongside building products, I run paid digital campaigns for healthcare clients across
            Telangana — hospitals that need patients to actually find and trust them. Same instinct
            as the product work: ship, measure, iterate.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.76rem] tracking-[0.03em] text-foreground">
            {["Google Ads", "Meta Ads", "Practo", "Truecaller", "ShareChat"].map((c, idx, arr) => (
              <span key={c}>
                {c}
                {idx < arr.length - 1 && <span className="ml-5 text-brown-soft">·</span>}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="mono-label mb-5 flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            Why it works together
          </p>
          <ul className="m-0 flex list-none flex-col gap-[18px] p-0">
            {[
              "Building the product means I understand what's actually being sold — no handoff gap between dev and marketing.",
              "Running campaigns means the sites I build are made to convert, not just to look good.",
              "One person, one accountable thread from first line of code to first paying customer.",
            ].map((t) => (
              <li
                key={t}
                className="relative pl-5 text-[0.94rem] leading-[1.55] text-brown before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-[9px] before:bg-primary before:content-['']"
              >
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

const stackGroups = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { label: "Frameworks", items: ["React", "Next.js", "TanStack", "Tailwind", "Node"] },
  { label: "Data & infra", items: ["Postgres", "Supabase", "Netlify", "Vercel", "Cloudflare"] },
  { label: "AI & tooling", items: ["OpenAI", "Claude", "Gemini", "LangChain-style agents", "Lovable", "Dodo Payments", "GitHub Copilot"] },
];

function Stack() {
  return (
    <section id="stack" className="py-[clamp(60px,8vw,100px)]">
      <div className="wrap">
        <Reveal className="mb-8">
          <p className="mono-label mb-4 flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            Toolkit
          </p>
          <h2 className="text-[clamp(1.6rem,3vw,2.2rem)]">Tech stack</h2>
        </Reveal>
        <Reveal className="grid gap-x-8 gap-y-0 border-t border-border-strong sm:grid-cols-2">
          {stackGroups.map((g) => (
            <div key={g.label} className="border-b border-border py-5">
              <h3 className="mb-2.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-brown-soft">
                {g.label}
              </h3>
              <p className="m-0 flex flex-wrap font-mono text-[0.86rem] text-brown">
                {g.items.map((t, idx) => (
                  <span key={t}>
                    {t}
                    {idx < g.items.length - 1 && <span className="mx-3 text-brown-soft">·</span>}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </Reveal>
        <span className="animate-caret mt-6 inline-block h-[1em] w-[7px] bg-primary" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-[clamp(80px,10vw,120px)]">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-[70px]">
        <Reveal className="relative">
          <ImageFrame
            label="Sumanth Chary at work"
            src={desk}
            alt="Sumanth Chary working on a laptop by a café window"
            position="center 30%"
            className="aspect-[4/5] w-full max-w-[260px] lg:max-w-none"
          />
          <FaceBadge className="absolute -bottom-4 left-[200px] size-12 shadow-[var(--shadow-float)] lg:left-auto lg:right-[-14px]" />
        </Reveal>
        <Reveal delay={120}>
          <p className="mono-label mb-4 flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
            About
          </p>
          <p className="mb-6 max-w-[20ch] font-serif text-[1.7rem] italic leading-[1.4] text-foreground">
            “I'd rather ship something real than plan something perfect.”
          </p>
          <p className="max-w-[58ch] text-[1.02rem] leading-[1.75] text-brown">
            Based in Hyderabad, Telangana, I build AI-powered products using AI-native tools —
            Lovable, Netlify, Supabase, Dodo Payments — and run freelance growth work on the side,
            mostly digital ad campaigns for healthcare clients. I work end to end: design the
            interface, wire up the backend, connect payments, and then go find the people who'll
            actually use it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
