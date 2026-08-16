import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Wordmark({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="font-serif text-2xl italic text-foreground">
      sumanth<b className="not-italic text-primary">.</b>
    </Link>
  );
}

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#clients", label: "Clients" },
  { href: "/#growth", label: "Growth" },
  { href: "/#about", label: "About" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(20px,4vw,56px)] py-6 transition-colors duration-500",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
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
        className="rounded-full bg-foreground px-[18px] py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-background transition-colors duration-300 hover:bg-primary"
      >
        Start a project
      </a>
    </header>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="bg-foreground py-[clamp(80px,10vw,120px)] text-on-dark">
      <div className="wrap">
        <p className="mono-label mb-4 flex items-center gap-2.5 text-primary before:h-px before:w-3.5 before:bg-primary before:content-['']">
          Get in touch
        </p>
        <h2 className="mb-9 max-w-[15ch] text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.08] text-on-dark">
          Have something worth shipping?
        </h2>
        <div className="flex flex-wrap items-end justify-between gap-8 border-t border-on-dark-muted/25 pt-8">
          <a
            href="mailto:hello@yourdomain.com"
            className="inline-block rounded-full bg-primary px-7 py-4 font-mono text-[0.78rem] uppercase tracking-[0.05em] text-foreground transition-colors duration-300 hover:bg-on-dark"
          >
            Start a project
          </a>
          <div className="flex flex-col gap-2.5 font-mono text-[0.88rem]">
            <a href="mailto:hello@yourdomain.com" className="text-on-dark-muted hover:text-primary">
              hello@yourdomain.com
            </a>
            <a href="#" className="text-on-dark-muted hover:text-primary">
              @yourhandle — X / Twitter
            </a>
            <a href="#" className="text-on-dark-muted hover:text-primary">
              linkedin.com/in/yourname
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
        <span>© 2026 Sumanth. Built solo.</span>
        <a href="#top" className="hover:text-primary">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
