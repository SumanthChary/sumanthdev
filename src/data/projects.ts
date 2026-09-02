import postproHero from "@/assets/media/postpro-hero.webp";
import postproPricing from "@/assets/media/postpro-pricing.webp";
import postproTryIt from "@/assets/media/postpro-tryit.webp";
import postproComposer from "@/assets/media/postpro-composer.webp";
import postproOutput from "@/assets/media/postpro-output.webp";
import vastrikaHome from "@/assets/media/vastrika-home.webp";
import vastrikaArrivals from "@/assets/media/vastrika-arrivals.webp";
import vastrikaProduct from "@/assets/media/vastrika-product.webp";
import vastrikaLogo from "@/assets/media/vastrika-logo.webp";

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
  quote: string;
  gallery: GalleryItem[];
  beforeAfter?: boolean;
  /** real hero screenshot for the case study + social preview */
  hero?: string;
  /** public URL people can open and verify */
  liveUrl?: string;
  /** optional closing full-width image */
  closing?: { src: string; caption: string };
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
    slug: "flipscan-ai",
    index: "02",
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
      "Built the scan flow mobile-first with a single input step, then layered comparable listings underneath the estimate so the number always shows its work. Growth is running on the same loop as the product: ship, measure, iterate.",
    quote: "A price is only useful if the person reading it believes where it came from.",
    gallery: [
      { label: "ADD: SCAN FLOW", size: "1000 × 1250 · mobile capture" },
      { label: "ADD: ESTIMATE RESULT", size: "1600 × 1000 · price breakdown" },
      { label: "ADD: COMPARABLES LIST", size: "1600 × 1000 · listing matches" },
    ],
  },
  {
    slug: "legaldeep-ai",
    index: "03",
    title: "LegalDeep AI",
    titleLead: "LegalDeep",
    titleAccent: "AI",
    description: "AI legal document analyzer — summarizes contracts, flags risk clauses.",
    tag: "SaaS Product",
    status: "Building",
    live: false,
    tint: "--cover-legaldeep",
    role: "Design, development",
    stack: "Lovable · Supabase · Claude",
    statusLong: "In build",
    category: "SaaS product",
    brief:
      "Small businesses sign contracts they haven't fully read. LegalDeep needed to surface the three clauses that actually matter without pretending to be a lawyer.",
    approach:
      "A document view with inline risk flags rather than a separate report — the analysis lives where the text lives. Conservative language throughout, and every flag links back to the exact paragraph it came from.",
    quote: "Confidence in a legal tool comes from restraint, not from claiming more than it knows.",
    gallery: [
      { label: "ADD: DOCUMENT VIEW", size: "1000 × 1250 · inline flags" },
      { label: "ADD: RISK SUMMARY", size: "1600 × 1000 · clause overview" },
      { label: "ADD: UPLOAD FLOW", size: "1600 × 1000 · first-run state" },
    ],
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
    statusLong: "Launched",
    category: "Experiment",
    brief:
      "An experiment in input: what happens when the cursor is your fingertip? AirWrite tracks a hand through the webcam and turns pinch gestures into strokes on a canvas.",
    approach:
      "Smoothing was the whole project. Raw landmark data is jittery, so the stroke path runs through a velocity-aware filter before it ever hits the canvas — the difference between a toy and something that feels like drawing.",
    quote: "Most novel interfaces fail on latency, not on the idea.",
    gallery: [
      { label: "ADD: DRAWING IN USE", size: "1000 × 1250 · hand + canvas" },
      { label: "ADD: TRACKING OVERLAY", size: "1600 × 1000 · landmarks" },
      { label: "ADD: FINISHED SKETCH", size: "1600 × 1000 · output" },
    ],
  },
  {
    slug: "sri-vastrika",
    index: "05",
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
      "Logo first, then the storefront itself — designed and built by us, page by page, around large product photography and the client's own maroon-and-gold. Shopify sits behind it doing what it's genuinely good at: checkout, inventory, variants, COD and payments. The look is ours; the plumbing is battle-tested, so the owner runs the whole store alone.",
    quote: "Premium isn't a colour palette. It's how much space you're willing to give the product.",
    client: {
      serviceLine: "Custom storefront design & build · Shopify backend",
      platform: "Shopify",
      logo: vastrikaLogo,
      delivered: [
        "Logo & brand identity",
        "Storefront designed and coded by us — not a bought theme",
        "Shopify backend: inventory, variants, orders",
        "Checkout, COD, payments & shipping rules configured",
        "On-page SEO from day one",
      ],
      outcomes: [
        "A label that finally looks as premium as its products",
        "Owner adds products and runs orders without a developer",
        "Collections built to be found on search, not just browsed",
      ],
      testimonial: {
        quote:
          "We came with photos and a name. He gave us a store that looks like a brand — and I can run it myself. Orders started the same week we went live.",
        author: "Owner, Sri Vastrika",
        role: "Nighties & sarees label, Hyderabad",
      },
    },

    hero: vastrikaHome,
    gallery: [
      { label: "Product page — Rosewood Rose Kanchipuram", size: "Detail, care & COD", src: vastrikaProduct },
      { label: "New arrivals grid", size: "Collection view", src: vastrikaArrivals },
      { label: "Brand mark", size: "Logo & wordmark", src: vastrikaLogo, fit: "contain" },
    ],
    closing: {
      src: vastrikaLogo,
      caption: "The mark the whole storefront was built around.",
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
