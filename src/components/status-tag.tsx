import { cn } from "@/lib/utils";

type Tone = "positive" | "neutral" | "warning";

export function StatusTag({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.7rem] tracking-wide uppercase",
        tone === "positive" && "border-primary/40 text-primary",
        tone === "warning" && "border-muted-foreground/40 text-muted-foreground",
        tone === "neutral" && "border-border text-muted-foreground",
        className
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "positive" && "bg-primary",
          tone === "warning" && "bg-muted-foreground",
          tone === "neutral" && "bg-muted-foreground/60"
        )}
      />
      {children}
    </span>
  );
}
