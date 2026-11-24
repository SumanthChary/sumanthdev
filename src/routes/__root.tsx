import type { ErrorComponentProps } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SmoothScroll } from "../components/SmoothScroll";
import { CommandPalette } from "../components/CommandPalette";
import { PointerFx } from "../components/PointerFx";

function StatusPage({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: ReactNode;
}) {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center bg-background px-6 text-center"
    >
      <Link to="/" className="mb-12 font-serif text-2xl italic text-foreground">
        sumanth<b className="not-italic text-primary">.</b>
      </Link>
      <p className="mono-label flex items-center gap-2.5 text-brown-soft before:h-px before:w-3.5 before:bg-primary before:content-['']">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-[clamp(2.4rem,7vw,4.2rem)] leading-[1.06]">{title}</h1>
      <p className="mt-4 max-w-[42ch] text-[1rem] leading-relaxed text-brown">{body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
    </main>
  );
}

const primaryBtn =
  "inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-background transition-colors duration-300 hover:bg-primary";
const ghostBtn =
  "inline-flex items-center justify-center rounded-full border border-border-strong px-6 py-3.5 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-foreground transition-colors duration-300 hover:border-primary hover:text-primary";

function NotFoundComponent() {
  return (
    <StatusPage
      eyebrow="Error 404"
      title="That page isn't here."
      body="It may have moved, or the link is off by a letter. The work is still where you left it."
    >
      <Link to="/" className={primaryBtn}>
        Back home
      </Link>
      <Link to="/" hash="work" className={ghostBtn}>
        See the work
      </Link>
    </StatusPage>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <StatusPage
      eyebrow="Something broke"
      title="This page didn't load."
      body="That's on me, not you. Try again, or head back home."
    >
      <button
        type="button"
        onClick={() => {
          router.invalidate();
          reset();
        }}
        className={primaryBtn}
      >
        Try again
      </button>
      <a href="/" className={ghostBtn}>
        Go home
      </a>
    </StatusPage>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Sumanth Chary — Indie AI Product Builder" },
      {
        name: "description",
        content:
          "Solo AI products shipped end-to-end — design, code and payments. Founded, built and sold LegalDeep AI. Available for client work.",
      },
      { name: "author", content: "Sumanth Chary" },
      { name: "theme-color", content: "#FAFAF7" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Sumanth Chary" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "128x128" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "icon", href: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full opacity-0 focus:opacity-100 bg-foreground px-5 py-3 font-mono text-[0.72rem] uppercase tracking-[0.05em] text-background transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SmoothScroll />
      <CommandPalette />
      <PointerFx />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      {/* Vercel Web Analytics — production builds only, so local and preview visits aren't counted */}
      {import.meta.env.PROD && <Analytics />}
    </QueryClientProvider>
  );
}
