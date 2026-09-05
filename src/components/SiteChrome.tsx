import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const RESUME_URL = "/Sumanth-Chary-Resume.pdf";
export const EMAIL = "sumanthcharyy@gmail.com";
export const X_HANDLE = "SumanthChary07";
export const LINKEDIN = "linkedin.com/in/sumanthchary";
export const PHONE = "+91 8125228079";
export const PHONE_RAW = "+918125228079";
export const WHATSAPP = "https://wa.me/918125228079";
export const CALENDLY = "https://calendly.com/sumanthcharyy/30min";
export const FIVER = "https://www.fiverr.com/s/61bpX5q";

export function Wordmark({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="font-serif text-2xl italic text-foreground">
      sumanth<b className="not-italic text-primary">.</b>
    </Link>
  );
}

export const GITHUB = "github.com/SumanthChary";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#client-work", label: "Clients" },
  { href: "/#lab", label: "Lab" },
  { href: "/#growth", label: "Growth" },
  { href: "/#about", label: "About" },
];

export function ResumeButton({ className }: { className?: string }) {
  return (
    <a
      href={RESUME_URL}
      download="Sumanth-Chary-Resume.pdf"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary",
        className,
      )}
    >
      Resume
      <span aria-hidden="true">↓</span>
    </a>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-[clamp(20px,4vw,56px)] py-5 md:flex md:justify-between md:py-6">
        <Wordmark />
        <nav aria-label="Sections" className="hidden gap-9 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative pb-1 font-mono text-[0.74rem] uppercase tracking-[0.06em] text-brown transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute inset-x-0 bottom-0 h-px w-0 bg-primary transition-[width] duration-300 ease-[var(--ease-out-soft)] group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a
          href="/#contact"
          className="hidden rounded-full bg-foreground px-[18px] py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-background transition-colors duration-300 hover:bg-primary md:inline-block"
        >
          Start a project
        </a>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border-strong text-foreground md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={cn(
                "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300",
                open && "top-1/2 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300",
                open && "bottom-1/2 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile sections"
          className="flex flex-col gap-1 border-t border-border px-[clamp(20px,4vw,56px)] pb-8 pt-4 md:hidden"
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3.5 font-serif text-2xl text-foreground"
            >
              {l.label}
            </a>
          ))}
          <div className="mt-5 flex flex-col gap-3">
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-foreground px-6 py-4 text-center font-mono text-[0.74rem] uppercase tracking-[0.05em] text-background"
            >
              Start a project
            </a>
            <ResumeButton className="justify-center" />
          </div>
        </nav>
      )}
    </header>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-foreground py-[clamp(72px,10vw,120px)] text-on-dark">
      <div className="wrap">
        <p className="mono-label mb-4 flex items-center gap-2.5 text-primary before:h-px before:w-3.5 before:bg-primary before:content-['']">
          Get in touch
        </p>
        <h2 className="mb-9 max-w-[15ch] text-[clamp(2.1rem,6vw,4.4rem)] leading-[1.08] text-on-dark">
          Have something worth shipping?
        </h2>
        <p className="mb-8 max-w-[46ch] text-[0.95rem] leading-relaxed text-on-dark-muted">
          Tell me what you want built. Grab a 30-minute call on my calendar, or message me — I
          reply within a day, usually the same evening IST, and you always talk to me, not an
          agency account manager.
        </p>
        <div className="flex flex-col gap-8 border-t border-on-dark-muted/25 pt-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-center font-mono text-[0.78rem] uppercase tracking-[0.05em] text-foreground transition-colors duration-300 hover:bg-on-dark"
            >
              Book a 30-min call
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-block rounded-full border border-on-dark-muted/40 px-7 py-4 text-center font-mono text-[0.78rem] uppercase tracking-[0.05em] text-on-dark transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              Email me
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-on-dark-muted/40 px-7 py-4 font-mono text-[0.78rem] uppercase tracking-[0.05em] text-on-dark transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              WhatsApp me
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={RESUME_URL}
              download="Sumanth-Chary-Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-on-dark-muted/40 px-7 py-4 font-mono text-[0.78rem] uppercase tracking-[0.05em] text-on-dark transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              Download resume
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="flex flex-col gap-2.5 break-words font-mono text-[0.84rem] sm:text-[0.88rem]">
            <a
              href={`https://x.com/${X_HANDLE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-dark-muted hover:text-primary"
            >
              @{X_HANDLE} — X / Twitter
            </a>
            <a
              href={`https://www.${LINKEDIN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-dark-muted hover:text-primary"
            >
              {LINKEDIN}
            </a>
            <a
              href={`https://${GITHUB}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-dark-muted hover:text-primary"
            >
              {GITHUB}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-on-dark-muted/20 bg-foreground py-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-3.5 font-mono text-[0.7rem] tracking-[0.03em] text-on-dark-muted">
        <span>© 2026 Sumanth Chary. Built solo.</span>
        <a href="#top" className="hover:text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
