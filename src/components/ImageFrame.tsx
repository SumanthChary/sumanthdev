import { cn } from "@/lib/utils";

type ImageFrameProps = {
  label: string;
  size?: string;
  className?: string;
  /** CSS gradient var name, e.g. "--cover-postpro" */
  tint?: string;
  compact?: boolean;
  /** Real image URL — when present, renders the image instead of the placeholder */
  src?: string | undefined;

  alt?: string;
  /** object-fit behaviour for real images */
  fit?: "cover" | "contain";
  /** vertical focus for cover images */
  position?: string;
  loading?: "lazy" | "eager";
};

export function ImageFrame({
  label,
  size,
  className,
  tint,
  compact,
  src,
  alt,
  fit = "cover",
  position = "center top",
  loading = "lazy",
}: ImageFrameProps) {
  if (src) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-lg border border-border bg-frame",
          className,
        )}
      >
        <img
          src={src}
          alt={alt ?? label}
          loading={loading}
          decoding="async"
          className={cn(
            "h-full w-full",
            fit === "cover" ? "object-cover" : "object-contain",
          )}
          style={{ objectPosition: position }}
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg border border-dashed border-frame-border bg-frame text-center",
        className,
      )}
      style={tint ? { backgroundImage: `var(${tint})`, borderStyle: "solid" } : undefined}
    >
      {!tint && (
        <span
          className={cn(
            "px-4 font-mono uppercase leading-relaxed tracking-[0.04em] text-brown",
            compact ? "text-[0.52rem] px-1" : "text-[0.66rem]",
          )}
        >
          {label}
          {size && (
            <small className="mt-1 block text-[0.88em] normal-case tracking-[0.02em] text-brown-soft">
              {size}
            </small>
          )}
        </span>
      )}
    </div>
  );
}
