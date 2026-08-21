export const GITHUB_URL = "https://github.com/SumanthChary";

export type Repo = {
  name: string;
  blurb: string;
  kind: string;
};

/** Short-form list — the stuff that doesn't have a full case study (yet). */
export const repos: Repo[] = [
  { name: "postpro-ai", blurb: "LinkedIn voice-matching writer", kind: "SaaS" },
  { name: "flipscanai", blurb: "Resale price estimator", kind: "SaaS" },
  { name: "legaldeepai", blurb: "Contract analyser, risk flags", kind: "SaaS" },
  { name: "triage-beacon", blurb: "Incident triage assistant", kind: "Agent" },
  { name: "pipelineai-openclaw", blurb: "Agent pipeline runner", kind: "Agent" },
  { name: "flowmind-original", blurb: "Workflow automation brain", kind: "Automation" },
  { name: "aitradevision", blurb: "Market signal dashboard", kind: "Data" },
  { name: "accessibility-hub", blurb: "Buildathon a11y toolkit", kind: "Tooling" },
  { name: "sky-story-maker", blurb: "AI story generator", kind: "Experiment" },
  { name: "airwrite", blurb: "Draw in air via webcam", kind: "Experiment" },
  { name: "particle", blurb: "Canvas particle playground", kind: "Experiment" },
  { name: "handy", blurb: "Hand-gesture control lab", kind: "Experiment" },
  { name: "kanyaraasi", blurb: "Regional content web app", kind: "Web" },
  { name: "srivastrika", blurb: "Client storefront", kind: "Client" },
  { name: "nextjs-boilerplate", blurb: "Personal starter kit", kind: "Tooling" },
];
