import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MessageSquare, ShieldCheck, Users, Check, X } from "lucide-react";
import { toast } from "sonner";

import { AiBadge, AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { COMPLIANCE_FINDINGS, STRUCTURED_OUTPUT, type ComplianceFinding } from "@/data/prototype";
import { usePrototype } from "@/lib/prototype-store";

export const Route = createFileRoute("/gov/compliance")({
  head: () => ({
    meta: [
      { title: "AI Compliance Checker — GovInnovate" },
      {
        name: "description",
        content:
          "Screen a draft problem statement for restrictive eligibility, ambiguous requirements, data ownership gaps and missing metrics.",
      },
      { property: "og:title", content: "AI Compliance Checker — GovInnovate" },
      { property: "og:description", content: "Four findings with severity pills, suggestions and officer actions." },
    ],
  }),
  component: Compliance,
});

const severityTone: Record<ComplianceFinding["severity"], string> = {
  High: "border-destructive/40 bg-destructive/10 text-destructive",
  Medium: "border-warning/50 bg-warning/15 text-warning-foreground",
  Low: "border-info/40 bg-info/10 text-info",
};

function Compliance() {
  const navigate = useNavigate();
  const { appliedFindings, toggleFinding } = usePrototype();
  const [ignored, setIgnored] = React.useState<string[]>([]);
  const [discuss, setDiscuss] = React.useState<ComplianceFinding | null>(null);

  const open = COMPLIANCE_FINDINGS.filter(
    (f) => !appliedFindings.includes(f.id) && !ignored.includes(f.id),
  ).length;

  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 3 of 8 · Compliance"
        title="AI Compliance Check"
        description="The draft was screened against fair-competition and clarity checks. Review each finding and decide what to apply."
        actions={
          <Button onClick={() => void navigate({ to: "/gov/matching" })}>
            <Users className="size-4" /> Proceed to Startup Matching
          </Button>
        }
      />

      <AiDisclaimer />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <Card className="border-border shadow-[var(--shadow-card)] lg:sticky lg:top-24 lg:self-start">
          <CardHeader>
            <CardTitle className="text-base">Document preview</CardTitle>
            <CardDescription>Urban Water Leakage Detection — draft problem statement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed">
            {[
              { label: "Desired outcome", body: STRUCTURED_OUTPUT.outcome },
              { label: "Scope", body: STRUCTURED_OUTPUT.scope },
              { label: "Constraints", body: STRUCTURED_OUTPUT.constraints },
              { label: "Requirements", body: STRUCTURED_OUTPUT.requirements },
              { label: "KPIs", body: STRUCTURED_OUTPUT.kpis },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-foreground">{s.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <ShieldCheck className="size-5 text-accent" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">{COMPLIANCE_FINDINGS.length} findings detected</p>
              <p className="text-xs text-muted-foreground">
                {appliedFindings.length} applied · {ignored.length} ignored · {open} open
              </p>
            </div>
            <AiBadge label="AI screened" />
          </div>

          {COMPLIANCE_FINDINGS.map((f) => {
            const applied = appliedFindings.includes(f.id);
            const isIgnored = ignored.includes(f.id);
            return (
              <Card key={f.id} className="border-border shadow-[var(--shadow-card)]">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={severityTone[f.severity]}>
                      {f.severity} severity
                    </Badge>
                    <span className="text-xs text-muted-foreground">{f.clause}</span>
                    {applied ? (
                      <Badge variant="outline" className="border-success/40 bg-success/10 text-success">
                        Applied
                      </Badge>
                    ) : null}
                    {isIgnored ? <Badge variant="outline">Ignored</Badge> : null}
                  </div>
                  <CardTitle className="text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.detail}</p>
                  <div className="rounded-lg border border-accent/30 bg-accent/5 p-3">
                    <p className="text-xs font-semibold uppercase tracking-widest text-accent">Suggested revision</p>
                    <p className="mt-1 text-sm text-foreground">{f.suggestion}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      disabled={applied}
                      onClick={() => {
                        toggleFinding(f.id, true);
                        setIgnored((i) => i.filter((x) => x !== f.id));
                        toast.success(`Suggestion applied to ${f.clause}`);
                      }}
                    >
                      <Check className="size-4" /> Apply suggestion
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIgnored((i) => Array.from(new Set([...i, f.id])));
                        toggleFinding(f.id, false);
                        toast("Finding ignored", { description: "Recorded with your review notes." });
                      }}
                    >
                      <X className="size-4" /> Ignore
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setDiscuss(f)}>
                      <MessageSquare className="size-4" /> Discuss
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={!!discuss} onOpenChange={(v) => !v && setDiscuss(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{discuss?.title}</DialogTitle>
            <DialogDescription>{discuss?.clause}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p className="rounded-lg border border-border bg-surface p-3 text-muted-foreground">{discuss?.detail}</p>
            <p className="rounded-lg border border-accent/30 bg-accent/5 p-3">
              <span className="font-semibold">GovAI: </span>
              {discuss?.suggestion} This keeps the requirement outcome-based, so more innovators can compete while the
              department retains the same assurance.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDiscuss(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                if (discuss) toggleFinding(discuss.id, true);
                toast.success("Suggestion applied from discussion");
                setDiscuss(null);
              }}
            >
              Apply suggestion
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
