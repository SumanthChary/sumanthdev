export const GITHUB_URL = "https://github.com/SumanthChary";

export type Repo = {
  name: string;
  blurb: string;
  kind: string;
  /** primary language, straight from the GitHub API */
  language: string | null;
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
  { name: "pipelineai-openclaw", blurb: "Agent pipeline runner", kind: "Agent", language: "TypeScript" },
  { name: "triage-beacon", blurb: "Incident triage assistant", kind: "Agent", language: "TypeScript" },
  { name: "flowmind-original", blurb: "Workflow automation brain", kind: "Automation", language: "TypeScript" },
  { name: "gemini-os", blurb: "Gemini OS", kind: "Experiment", language: null },
  { name: "sky-story-maker", blurb: "AI story generator", kind: "Experiment", language: "TypeScript" },
  { name: "airwrite", blurb: "Draw in air via webcam", kind: "Experiment", language: "TypeScript" },
  { name: "particle", blurb: "Canvas particle playground", kind: "Experiment", language: "HTML" },
  { name: "handy", blurb: "Hand-gesture control lab", kind: "Experiment", language: "TypeScript" },
  { name: "aitradevision", blurb: "Market signal dashboard", kind: "Experiment", language: "TypeScript" },
  { name: "portify-original", blurb: "", kind: "Tools", language: "TypeScript" },
  { name: "neetcode-submissions", blurb: "NeetCode.io problem submissions", kind: "Tools", language: "Python" },
  { name: "sumanthdev", blurb: "This portfolio — TanStack Start", kind: "Tools", language: "TypeScript" },
];

export const repoFilters = ["All", "Agent", "Automation", "Experiment", "Tools"] as const;
