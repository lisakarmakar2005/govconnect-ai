import { ShieldAlert } from "lucide-react";
import { AI_DISCLAIMER } from "@/data/prototype";
import { cn } from "@/lib/utils";

export function AiDisclaimer({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3",
        compact && "px-3 py-2",
        className,
      )}
    >
      <ShieldAlert className="mt-0.5 size-4 shrink-0 text-warning-foreground" aria-hidden />
      <p className={cn("text-sm leading-relaxed text-warning-foreground", compact && "text-xs")}>
        <span className="font-semibold">AI assistance notice: </span>
        {AI_DISCLAIMER}
      </p>
    </div>
  );
}

export function AiBadge({ label = "AI generated" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
      {label}
    </span>
  );
}
