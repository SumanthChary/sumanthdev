import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { projects } from "@/data/projects";
import { CALENDLY, EMAIL, RESUME_URL, whatsappLink } from "@/components/SiteChrome";

const sections = [
  ["work", "Work"],
  ["client-work", "Client work"],
  ["lab", "The lab — public repos"],
  ["process", "How it works"],
  ["about", "About"],
  ["investment", "Pricing"],
  ["faq", "FAQ"],
  ["contact", "Contact"],
] as const;

/** ⌘K / Ctrl+K — jump anywhere, or take the action that matters without hunting for it. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    setOpen(false);
    window.setTimeout(fn, 320);
  };

  const goSection = (id: string) =>
    run(() => {
      if (window.location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `/#${id}`);
      } else {
        window.location.assign(`/#${id}`);
      }
    });

  const external = (href: string) => run(() => window.open(href, "_blank", "noopener,noreferrer"));

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to a section, project or action…" />
      <CommandList>
        <CommandEmpty>Nothing here — try “work”, “pricing” or “call”.</CommandEmpty>
        <CommandGroup heading="Talk to me">
          <CommandItem onSelect={() => external(CALENDLY)}>Book a 30-minute call</CommandItem>
          <CommandItem
            onSelect={() =>
              external(
                whatsappLink(
                  "Hi Sumanth, I found your portfolio and I'd like to talk about a project.",
                ),
              )
            }
          >
            Message on WhatsApp
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                navigator.clipboard?.writeText(EMAIL).catch(() => {});
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              })
            }
          >
            {copied ? "Email copied ✓" : `Copy email — ${EMAIL}`}
          </CommandItem>
          <CommandItem onSelect={() => run(() => window.location.assign(RESUME_URL))}>
            Download resume
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Case studies">
          {projects.map((p) => (
            <CommandItem
              key={p.slug}
              value={`${p.title} case study`}
              onSelect={() => run(() => navigate({ to: "/work/$slug", params: { slug: p.slug } }))}
            >
              {p.title}
              <span className="ml-auto font-mono text-[0.62rem] uppercase tracking-[0.08em] text-brown-soft">
                {p.status}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Go to">
          {sections.map(([id, label]) => (
            <CommandItem key={id} value={label} onSelect={() => goSection(id)}>
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
