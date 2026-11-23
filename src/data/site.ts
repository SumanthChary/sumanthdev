/**
 * Single source of truth for the things people act on — offers, answers, availability.
 * The page, the structured data (SEO/GEO), the ⌘K palette and llms.txt all read from here.
 */

/** Flip `open` to false and the site stops saying you're taking projects. */
export const AVAILABILITY = {
  open: true,
  label: "Open for new projects",
  note: "replies within a day",
};

export const packages = [
  {
    name: "Landing page that sells",
    price: "from ₹18,000",
    short: "₹18k",
    priceFrom: 18000,
    slug: "landing-page",
    label: "Pages",
    time: "5–7 days",
    for: "One page, one offer — built to turn ad clicks into enquiries.",
    includes: [
      "Copy written with you",
      "Custom design, no template",
      "Mobile-first build",
      "Analytics + lead capture",
    ],
  },
  {
    name: "Online store",
    price: "from ₹45,000",
    short: "₹45k",
    priceFrom: 45000,
    slug: "online-store",
    label: "Stores",
    time: "2–3 weeks",
    for: "A storefront that looks like a brand, with Shopify doing the boring parts.",
    includes: [
      "Logo / brand polish",
      "Custom storefront design & build",
      "Checkout, COD, shipping",
      "SEO from day one",
    ],
    featured: true,
  },
  {
    name: "AI product or automation",
    price: "from ₹75,000",
    short: "₹75k",
    priceFrom: 75000,
    slug: "ai-product",
    label: "AI products",
    time: "3–5 weeks",
    for: "A working v1 with real users — auth, payments, and the AI part that matters.",
    includes: [
      "Product & flow design",
      "Full-stack build",
      "Payments wired in",
      "Two weeks of fixes after launch",
    ],
  },
];

export const faqs: [string, string][] = [
  [
    "Why one person instead of an agency?",
    "Because nothing gets lost in translation. The person who hears your idea is the one designing it, coding it and running the ads — and you can message me directly.",
  ],
  [
    "I'm not technical. Is that a problem?",
    "It's the normal case. You talk about customers and products; I handle the rest and show you a live link every few days instead of jargon.",
  ],
  [
    "What if I don't like the design?",
    "You see direction early, not at the end. Two rounds of changes are built into every project, and nothing goes live until you're happy with it.",
  ],
  [
    "Can you also get me customers?",
    "Yes — that's the second half of what I do. Google and Meta ads, SEO and landing pages that were designed to convert in the first place.",
  ],
  [
    "How do we start?",
    "One 30-minute call. You'll leave it with a scope, a price and a date — no obligation, no pitch deck.",
  ],
];
