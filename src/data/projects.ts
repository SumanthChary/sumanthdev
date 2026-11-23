import postproHero from "@/assets/media/postpro-hero.webp";
import postproPricing from "@/assets/media/postpro-pricing.webp";
import postproTryIt from "@/assets/media/postpro-tryit.webp";
import postproComposer from "@/assets/media/postpro-composer.webp";
import postproOutput from "@/assets/media/postpro-output.webp";
import vastrikaHome from "@/assets/media/vastrika-home.webp";
import vastrikaArrivals from "@/assets/media/vastrika-arrivals.webp";
import vastrikaProduct from "@/assets/media/vastrika-product.webp";
import vastrikaLogo from "@/assets/media/vastrika-logo.webp";
import { addOns } from "./site";
import flipscanConcept from "@/assets/media/flipscan-concept.webp";
import legaldeepConcept from "@/assets/media/legaldeep-concept.webp";
import airwriteConcept from "@/assets/media/airwrite-concept.webp";

export type GalleryItem = { label: string; size: string; src?: string; fit?: "cover" | "contain" };

export type Project = {
  slug: string;
  index: string;
  title: string;
  titleLead: string;
  titleAccent: string;
  description: string;
  tag: string;
  status: string;
  live: boolean;
  tint: string;
  role: string;
  stack: string;
  statusLong: string;
  category: string;
  brief: string;
  approach: string;
  /** the honest outcome, in one line — no invented numbers */
  result: string;
  /** optional repo link shown on the case study */
  repo?: string;
  quote: string;
  gallery: GalleryItem[];
  beforeAfter?: boolean;
  /** real hero screenshot for the case study + social preview */
  hero?: string;
  /** public URL people can open and verify */
  liveUrl?: string;
  /**
   * Illustration used when there is no real screenshot to show. The case study
   * labels it clearly as a concept so nobody mistakes it for the shipped UI.
   */
  concept?: { src: string; caption: string };
  /** optional closing full-width image */
  closing?: { src: string; caption: string };
  /** a real line from the client — shown on the home page and the case study */
  testimonial?: { quote: string; by: string };
  /** what was in scope, and what was deliberately left out (client work) */
  scope?: {
    included: { title: string; items: string[] }[];
    separate: { name: string; note: string }[];
  };
  /** public posts that back up the headline claim */
  evidence?: { source: string; label: string; href: string }[];
  /** client engagements get a dedicated block on the home page */
  client?: {
    /** one-line service framing, e.g. "E-commerce brand build" */
    serviceLine: string;
    /** platform badge, e.g. "Shopify" */
    platform?: string;
    /** brand mark shown on the home-page client card */
    logo?: string;
    /** what the client actually walked away with */
    delivered: string[];
    /** plain-language outcomes */
    outcomes: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "postpro-ai",
    index: "01",
    title: "PostPro AI",
    titleLead: "PostPro",
    titleAccent: "AI",
    description: "LinkedIn content & voice-matching tool. Cinematic UI, live at postproai.app.",
    tag: "SaaS Product",
    status: "Live",
    live: true,
    tint: "--cover-postpro",
    role: "Design, development, growth",
    stack: "Lovable · Supabase · Dodo Payments",
    statusLong: "Live at postproai.app",
    liveUrl: "https://postproai.app",
    category: "SaaS product",
    brief:
      "LinkedIn rewards consistent, well-written posts — but most people don't have the time or the voice for it. PostPro AI needed to sound like the person using it, not like a template generator, and needed the landing page itself to prove that in the first ten seconds.",
    approach:
      "Kept the interactive hero rather than swapping it for a static image — an animated voice-match score does more convincing than a screenshot ever could. Everything behind it is deliberately plain: one accent colour, one typeface pairing, and a pricing page that answers the only two questions people actually have.",
    result: "Live at postproai.app — designed, built and run by one person, end to end.",
    quote:
      "The product had to sound like you before it could sell itself. Everything else was in service of that.",
    hero: postproHero,
    gallery: [
      { label: "Try-it-live section", size: "UI close-up", src: postproTryIt },
      { label: "Post composer with voice match", size: "Editor view", src: postproComposer },
      { label: "Pricing plans", size: "Plans & checkout", src: postproPricing },
    ],
    closing: {
      src: postproOutput,
      caption: "The output — same person, same topic, written in their own voice.",
    },
  },
  {
    slug: "sri-vastrika",
    index: "02",
    title: "Sri Vastrika",
    titleLead: "Sri",
    titleAccent: "Vastrika",
    description:
      "Custom-designed and developed storefront for an Indian nighties & sarees label, with Shopify powering checkout, inventory and payments — live at srivastrika.store.",
    tag: "Client — custom store build",
    status: "Live",
    live: true,
    tint: "--cover-vastrika",
    role: "Brand, storefront design & build, SEO",
    stack: "Custom front end · Shopify backend · Liquid",
    statusLong: "Live at srivastrika.store",
    liveUrl: "https://srivastrika.store",
    category: "Client — e-commerce",
    brief:
      "A growing nighties and sarees label with real products and no storefront to match them. They didn't want a template store — they wanted the label to look premium in a category where most competitors look like a catalogue dump.",
    approach:
      "Logo first, then the storefront itself — designed and built by me, page by page, around large product photography and the client's own maroon-and-gold. Shopify sits behind it doing what it's genuinely good at: checkout, inventory, variants, COD and payments. The look is custom; the plumbing is battle-tested, so the owner runs the whole store alone.",
    result:
      "Live at srivastrika.store — the owner adds products and runs orders without a developer.",
    quote:
      "Premium isn't a colour palette. It's how much space you're willing to give the product.",
    client: {
      serviceLine: "Custom storefront design & build · Shopify backend",
      platform: "Shopify",
      logo: vastrikaLogo,
      delivered: [
        "Logo & brand identity",
        "Storefront designed and coded by me — not a bought theme",
        "Homepage, four collection pages, product pages, About & Contact",
        "Shopify backend: payments, shipping, inventory & variants",
        "On-page SEO: titles & meta, alt text, clean URLs, sitemap, speed pass",
      ],
      outcomes: [
        "A label that finally looks as premium as its products",
        "Owner adds products and runs orders without a developer",
        "Collections built to be found on search, not just browsed",
      ],
    },
    testimonial: { quote: "It's too good! I love it!", by: "Sri Vastrika — the client" },
    scope: {
      included: [
        {
          title: "Website design & build",
          items: [
            "Custom homepage — hero, brand values, collection showcase, new arrivals & combo offers, craft story, featured products, newsletter",
            "Nighties, Sarees, New Arrivals and Combo Offers pages",
            "Product pages — image gallery, pricing, size & colour selection",
            "About Us and Contact Us",
            "Fully responsive: mobile, tablet, desktop",
          ],
        },
        { title: "Branding", items: ["Logo design"] },
        {
          title: "Shopify store setup",
          items: [
            "Store configuration with the custom design integrated",
            "Payment gateway and shipping configuration",
            "Initial products, categories and variants",
          ],
        },
        {
          title: "On-page SEO",
          items: [
            "Page titles, meta descriptions and image alt text",
            "Clean, search-friendly URLs",
            "Sitemap submitted to Google",
            "Basic page-speed optimisation",
          ],
        },
      ],
      separate: addOns,
    },
    hero: vastrikaHome,
    gallery: [
      {
        label: "Product page — Rosewood Rose Kanchipuram",
        size: "Detail, care & COD",
        src: vastrikaProduct,
      },
      { label: "New arrivals grid", size: "Collection view", src: vastrikaArrivals },
      { label: "Brand mark", size: "Logo & wordmark", src: vastrikaLogo, fit: "contain" },
    ],
    closing: {
      src: vastrikaLogo,
      caption: "The mark the whole storefront was built around.",
    },
  },
  {
    slug: "legaldeep-ai",
    index: "03",
    title: "LegalDeep AI",
    titleLead: "LegalDeep",
    titleAccent: "AI",
    description: "AI legal document analyzer — summarizes contracts, flags risk clauses.",
    tag: "SaaS Product · Founded, built & sold",
    status: "Built & sold",
    live: false,
    tint: "--cover-legaldeep",
    role: "Founder — design, development",
    stack: "Lovable · Supabase · Claude",
    statusLong: "Founded, built and sold",
    category: "SaaS product",
    brief:
      "Small businesses sign contracts they haven't fully read. LegalDeep needed to surface the three clauses that actually matter without pretending to be a lawyer.",
    approach:
      "A document view with inline risk flags rather than a separate report — the analysis lives where the text lives. Conservative language throughout, and every flag links back to the exact paragraph it came from.",
    result:
      "Founded, built and sold — a complete product taken from idea to handover, with the sale announced publicly.",
    quote: "Confidence in a legal tool comes from restraint, not from claiming more than it knows.",
    evidence: [
      {
        source: "X",
        label: "My post on X",
        href: "https://x.com/SumanthChary07/status/2108397554430071205",
      },
      {
        source: "X",
        label: "My follow-up post on X",
        href: "https://x.com/SumanthChary07/status/2108883458118582615",
      },
      { source: "LinkedIn", label: "Post on LinkedIn", href: "https://lnkd.in/p/dtbyVfEx" },
      {
        source: "TrustMRR",
        label: "TrustMRR's post on X",
        href: "https://x.com/trust_mrr/status/2109001319650619561",
      },
    ],
    concept: {
      src: legaldeepConcept,
      caption: "Risk flags live inline, next to the paragraph they came from.",
    },
    gallery: [],
  },
  {
    slug: "airwrite",
    index: "04",
    title: "AirWrite",
    titleLead: "Air",
    titleAccent: "Write",
    description: "Webcam hand-tracking drawing app — draw in thin air, no mouse.",
    tag: "Experiment",
    status: "Launched",
    live: true,
    tint: "--cover-airwrite",
    role: "Design, development",
    stack: "React · MediaPipe · Canvas",
    statusLong: "Launched — code on GitHub",
    category: "Experiment",
    repo: "https://github.com/SumanthChary/airwrite",
    brief:
      "An experiment in input: what happens when the cursor is your fingertip? AirWrite tracks a hand through the webcam and turns pinch gestures into strokes on a canvas.",
    approach:
      "Smoothing was the whole project. Raw landmark data is jittery, so the stroke path runs through a velocity-aware filter before it ever hits the canvas — the difference between a toy and something that feels like drawing.",
    result: "Launched — the full source is public on GitHub.",
    quote: "Most novel interfaces fail on latency, not on the idea.",
    concept: {
      src: airwriteConcept,
      caption: "Hand landmarks in, smoothed strokes out — the canvas follows the fingertip.",
    },
    gallery: [],
  },
  {
    slug: "flipscan-ai",
    index: "05",
    title: "FlipScan AI",
    titleLead: "FlipScan",
    titleAccent: "AI",
    description: "Resale price estimator for the US market — eBay, Poshmark, Depop.",
    tag: "SaaS Product",
    status: "Growing",
    live: false,
    tint: "--cover-flipscan",
    role: "Design, development, growth",
    stack: "Lovable · Supabase · Dodo Payments",
    statusLong: "Growing — early users",
    category: "SaaS product",
    brief:
      "Resellers guess at pricing constantly, and a wrong guess costs either the sale or the margin. FlipScan needed to turn a photo and a few details into a defensible number, fast enough to use while standing in a thrift aisle.",
    approach:
      "Built the scan flow mobile-first with a single input step, then layered comparable listings underneath the estimate so the number always shows its work. The whole flow was designed for one-handed use in the real world, not for a demo desk.",
    result: "Growing with early users — the estimate flow is live and iterating.",
    quote: "A price is only useful if the person reading it believes where it came from.",
    concept: {
      src: flipscanConcept,
      caption:
        "Scan on the left, comparable listings on the right — the number always shows its work.",
    },
    gallery: [],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
