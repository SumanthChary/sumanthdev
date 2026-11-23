import { useState } from "react";

const btn =
  "rounded-full border border-border-strong px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.06em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary";

/** "Share this" row for case studies — native share sheet on phones, plain links elsewhere. */
export function ShareRow({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const text = `${title} — a case study by Sumanth Chary`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this link", url);
    }
  };

  const share = async () => {
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        return; // user dismissed the sheet
      }
    }
    void copy();
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button type="button" onClick={share} className={btn}>
        Share this ↗
      </button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        Post on X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        LinkedIn
      </a>
      <button type="button" onClick={copy} className={btn}>
        {copied ? "Link copied ✓" : "Copy link"}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
