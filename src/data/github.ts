export const GITHUB_URL = "https://github.com/SumanthChary";

export type Repo = {
  name: string;
  blurb: string;
  kind: string;
  /** primary language, straight from the GitHub API */
  language: string | null;
  /** shown on the home page — the rest stay one click away on GitHub */
  featured?: boolean;
};

const LANG_COLORS: Record<string, string> = {
  TypeScript: "oklch(0.62 0.15 250)",
  Python: "oklch(0.72 0.13 85)",
  HTML: "oklch(0.65 0.14 25)",
};

export function langColor(language: string | null): string | null {
  return language ? (LANG_COLORS[language] ?? null) : null;
}

/**
 * Short-form list — public repos, verified against the GitHub API.
 * Kinds: Agent / Automation / Experiment / Tools.
 */
export const repos: Repo[] = [
  {
    name: "pipelineai-openclaw",
    featured: true,
    blurb: "Agent pipeline runner",
    kind: "Agent",
    language: "TypeScript",
  },
  {
    name: "triage-beacon",
    featured: true,
    blurb: "Incident triage assistant",
    kind: "Agent",
    language: "TypeScript",
  },
  {
    name: "flowmind-original",
    featured: true,
    blurb: "Workflow automation brain",
    kind: "Automation",
    language: "TypeScript",
  },
  { name: "gemini-os", blurb: "Gemini OS", kind: "Experiment", language: null },
  {
    name: "sky-story-maker",
    featured: true,
    blurb: "AI story generator",
    kind: "Experiment",
    language: "TypeScript",
  },
  {
    name: "airwrite",
    featured: true,
    blurb: "Draw in air via webcam",
    kind: "Experiment",
    language: "TypeScript",
  },
  { name: "particle", blurb: "Canvas particle playground", kind: "Experiment", language: "HTML" },
  {
    name: "handy",
    featured: true,
    blurb: "Hand-gesture control lab",
    kind: "Experiment",
    language: "TypeScript",
  },
  {
    name: "aitradevision",
    blurb: "Market signal dashboard",
    kind: "Experiment",
    language: "TypeScript",
  },
  { name: "portify-original", blurb: "", kind: "Tools", language: "TypeScript" },
  {
    name: "neetcode-submissions",
    blurb: "NeetCode.io problem submissions",
    kind: "Tools",
    language: "Python",
  },
  {
    name: "sumanthdev",
    blurb: "This portfolio — TanStack Start",
    kind: "Tools",
    language: "TypeScript",
  },
];

export const featuredRepos = repos.filter((r) => r.featured);
