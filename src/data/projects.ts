import postproHero from "@/assets/postpro-hero.asset.json";
import postproPricing from "@/assets/postpro-pricing.asset.json";
import postproTryIt from "@/assets/postpro-tryit.asset.json";
import postproComposer from "@/assets/postpro-composer.asset.json";
import postproOutput from "@/assets/postpro-output.asset.json";

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
  /** optional closing full-width image */
  closing?: { src: string; caption: string };
  /** client engagements get a dedicated block on the home page */
  client?: {
    /** one-line service framing, e.g. "E-commerce brand build" */
    serviceLine: string;
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
    category: "SaaS product",
    brief:
      "LinkedIn rewards consistent, well-written posts — but most people don't have the time or the voice for it. PostPro AI needed to sound like the person using it, not like a template generator, and needed the landing page itself to prove that in the first ten seconds.",
    approach:
      "Kept the interactive hero rather than swapping it for a static image — an animated voice-match score does more convincing than a screenshot ever could. Everything behind it is deliberately plain: one accent colour, one typeface pairing, and a pricing page that answers the only two questions people actually have.",
    quote:
      "The product had to sound like you before it could sell itself. Everything else was in service of that.",
    hero: postproHero.url,
    gallery: [
      { label: "Try-it-live section", size: "UI close-up", src: postproTryIt.url },
      { label: "Post composer with voice match", size: "Editor view", src: postproComposer.url },
      { label: "Pricing plans", size: "Plans & checkout", src: postproPricing.url },
    ],
    closing: {
      src: postproOutput.url,
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
      "Premium e-commerce build for an Indian nighties & sarees label. Logo, Shopify, SEO.",
    tag: "Client — E-commerce",
    status: "Live",
    live: true,
    tint: "--cover-vastrika",
    role: "Brand, storefront, SEO",
    stack: "Shopify · Custom theme",
    statusLong: "Live storefront",
    category: "Client — e-commerce",
    brief:
      "A growing nighties and sarees label with real products and no storefront to match them. The brand needed to look premium in a category where most competitors look like a catalogue dump.",
    approach:
      "Logo first, then a Shopify theme built around large product photography and maroon-and-gold rather than the site's usual orange — the client's own colours, deliberately. Collection structure and metadata written for search from day one.",
    quote: "Premium isn't a colour palette. It's how much space you're willing to give the product.",
    client: {
      serviceLine: "E-commerce brand + storefront build",
      delivered: [
        "Logo & brand mark",
        "Shopify storefront, custom theme",
        "Product & collection structure",
        "On-page SEO from day one",
      ],
      outcomes: [
        "A label that finally looks as premium as its products",
        "Owner can add products without touching a developer",
        "Collections built to be found on search, not just browsed",
      ],
    },
    gallery: [
      { label: "ADD: PRODUCT PAGE", size: "1000 × 1250 · saree detail" },
      { label: "ADD: HOMEPAGE", size: "1600 × 1000 · storefront" },
      { label: "ADD: BRAND MARK", size: "1600 × 1000 · logo on stock" },
    ],
  },
  {
    slug: "renuka-septic",
    index: "06",
    title: "Renuka Septic Tank Cleaners",
    titleLead: "Renuka",
    titleAccent: "Septic",
    description:
      "Full site rebuild for a local service business — working contact flow, real photography.",
    tag: "Client — Local Service",
    status: "Shipped",
    live: true,
    tint: "--cover-renuka",
    role: "Design, development, local SEO",
    stack: "Lovable · Netlify",
    statusLong: "Shipped",
    category: "Client — local service",
    brief:
      "A local service business whose old site didn't load properly on a phone and had no working way to call or enquire — the two things every visitor was there to do.",
    approach:
      "Rebuilt around a persistent call button and a contact form that actually delivers, with real photos of the crew and equipment instead of stock imagery. Local SEO basics done properly beat anything clever here.",
    quote: "For a local service business, the whole design brief is: make it easy to call.",
    gallery: [
      { label: "ADD: NEW HOMEPAGE", size: "1000 × 1250 · mobile view" },
      { label: "ADD: SERVICES SECTION", size: "1600 × 1000 · rebuilt page" },
      { label: "ADD: TEAM PHOTO", size: "1600 × 1000 · crew & equipment" },
    ],
    beforeAfter: true,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
