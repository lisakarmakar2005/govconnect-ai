import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, CircleDot, Clock, FileSignature, ListChecks, Sparkles, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
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
import { KPIS, SCALE_STEPS, formatINR } from "@/data/prototype";

export const Route = createFileRoute("/gov/scale-up")({
  head: () => ({
    meta: [
      { title: "Scale-Up & Procurement Pathway — GovInnovate" },
      {
        name: "description",
        content:
          "Roadmap from a successful pilot to a 250-building rollout: evidence review, applicable route, approvals and contract preparation.",
      },
      { property: "og:title", content: "Scale-Up & Procurement Pathway — GovInnovate" },
      { property: "og:description", content: "Step-by-step statutory pathway with scale-up summary." },
    ],
  }),
  component: ScaleUp,
});

function stateIcon(state: string) {
  if (state === "done") return <CheckCircle2 className="size-5 text-success" />;
  if (state === "active") return <CircleDot className="size-5 text-accent" />;
  return <Clock className="size-5 text-muted-foreground" />;
}

function ScaleUp() {
  const navigate = useNavigate();
  const [summaryOpen, setSummaryOpen] = React.useState(false);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 8 of 8 · Scale-up"
        title="Scale-Up & Procurement Pathway"
        description="The pilot met its success criteria. This roadmap shows what must happen before any large-scale rollout."
        actions={
          <>
            <Button variant="outline" onClick={() => setSummaryOpen(true)}>
              <Sparkles className="size-4" /> Generate Scale-up Summary
            </Button>
            <Button asChild variant="outline">
              <Link to="/gov/checklist">
                <ListChecks className="size-4" /> View Procurement Checklist
              </Link>
            </Button>
            <Button onClick={() => void navigate({ to: "/gov/contract" })}>
              <FileSignature className="size-4" /> Continue to Contract Preparation
            </Button>
          </>
        }
      />

      <div className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
        <p className="text-sm leading-relaxed text-destructive">
          <span className="font-semibold">Statutory notice: </span>
          A successful pilot does not by itself authorise procurement. The applicable route, approvals and financial
          sanction must be determined by the competent authority under prevailing rules.
        </p>
      </div>

      <AiDisclaimer />

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">Pathway</CardTitle>
          <CardDescription>Pilot Success → Review Evidence → Applicable Route → Approvals → Contract → 250 Buildings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {SCALE_STEPS.map((s, i) => (
            <div key={s.name} className="flex items-start gap-3 rounded-lg border border-border p-4">
              <span className="mt-0.5">{stateIcon(s.state)}</span>
              <div className="min-w-0">
                <p className="font-medium">
                  {i + 1}. {s.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.detail}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Scale-up summary</DialogTitle>
            <DialogDescription>Drafted from pilot evidence for officer review.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              The Smart Water Monitoring pilot ran for 90 days across 5 government buildings at a sanctioned cost of{" "}
              {formatINR(800000)}. All four defined KPIs were met or exceeded.
            </p>
            <ul className="space-y-1.5">
              {KPIS.map((k) => (
                <li key={k.id} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  {k.name}: target {k.target}, achieved {k.actual}.
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground">
              Extending the same approach to 250 government buildings is estimated at {formatINR(36000000)} over an
              18-month phased rollout, subject to approvals and the applicable procurement route.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSummaryOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setSummaryOpen(false);
                toast.success("Scale-up summary saved to the pilot file");
              }}
            >
              Save summary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
