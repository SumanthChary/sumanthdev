import type { IconType } from "react-icons";
import {
  SiCss,
  SiDodopayments,
  SiFigma,
  SiGooglegemini,
  SiGooglecloud,
  SiHtml5,
  SiJavascript,
  SiClaude,
  SiMediapipe,
  SiNodedotjs,
  SiNextdotjs,
  SiOpenjdk,
  SiPostgresql,
  SiPython,
  SiReact,
  SiShopify,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

type Tool = { name: string; Icon?: IconType };

/** Core languages & frameworks — icons straight from each brand. */
const ROW_CODE: Tool[] = [
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "React", Icon: SiReact },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "Python", Icon: SiPython },
  { name: "Java", Icon: SiOpenjdk },
  { name: "HTML", Icon: SiHtml5 },
  { name: "CSS", Icon: SiCss },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
];

/** AI models, cloud & product tools. */
const ROW_AI: Tool[] = [
  { name: "OpenAI" },
  { name: "Gemini", Icon: SiGooglegemini },
  { name: "Claude", Icon: SiClaude },
  { name: "Vertex AI", Icon: SiGooglecloud },
  { name: "Supabase", Icon: SiSupabase },
  { name: "Lovable" },
  { name: "Shopify", Icon: SiShopify },
  { name: "Figma", Icon: SiFigma },
  { name: "MediaPipe", Icon: SiMediapipe },
  { name: "Dodo Payments", Icon: SiDodopayments },
  { name: "Vercel", Icon: SiVercel },
];

/** Roles & disciplines, no brand logos. */
const ROW_SKILLS: Tool[] = [
  { name: "Product Management" },
  { name: "Data Analysis" },
  { name: "GEO / SEO" },
  { name: "Strategy" },
  { name: "UI / UX Design" },
  { name: "Copywriting" },
  { name: "Automation" },
  { name: "AI Agents" },
  { name: "Mobile Apps" },
  { name: "Research" },
  { name: "Content Creation" },
  { name: "Testing" },
];

const ROWS = [
  { items: ROW_CODE, cls: "animate-marquee", label: "Languages and frameworks I build with" },
  { items: ROW_AI, cls: "animate-marquee-reverse", label: "AI models, cloud and product tools I use" },
  { items: ROW_SKILLS, cls: "animate-marquee", label: "Roles and disciplines I bring" },
];

function ChipRow({ items }: { items: Tool[] }) {
  return (
    <>
      {[0, 1].map((dup) => (
        <div aria-hidden={dup === 1} className="flex shrink-0 gap-3 pr-3" key={dup}>
          {items.map((tool) => (
            <span
              key={tool.name}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-frame px-4 py-2 font-mono text-[0.74rem] tracking-[0.03em] text-brown"
            >
              {tool.Icon && (
                <tool.Icon
                  aria-hidden="true"
                  className="size-[0.95rem] shrink-0 text-brown/80"
                />
              )}
              {tool.name}
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

/** Three rows sliding opposite ways — brand logos on each tool, pause on hover, still under reduced motion. */
export function TechMarquee() {
  return (
    <section aria-label="Tools, skills and disciplines" className="overflow-hidden border-b border-border py-7">
      <div className="flex flex-col gap-3">
        {ROWS.map((row) => (
          <div
            key={row.cls + row.label}
            className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            aria-label={row.label}
          >
            <div
              className={`flex w-max group-hover:[animation-play-state:paused] ${row.cls}`}
            >
              <ChipRow items={row.items} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
