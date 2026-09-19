import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, FlaskConical, TriangleAlert } from "lucide-react";
import { toast } from "sonner";

import { AiBadge, AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatINR } from "@/data/prototype";

export const Route = createFileRoute("/gov/proposal-detail")({
  head: () => ({
    meta: [
      { title: "Proposal PRP-8801 — GovInnovate" },
      {
        name: "description",
        content:
          "AquaSense Technologies proposal for building-level water monitoring, with AI coverage analysis, strengths and risks.",
      },
      { property: "og:title", content: "Proposal PRP-8801 — GovInnovate" },
      { property: "og:description", content: "Technical approach, ₹8,00,000 budget and AI analysis side panel." },
    ],
  }),
  component: ProposalDetail,
});

const STRENGTHS = [
  "Non-invasive clamp-on sensing suits the heritage block constraint",
  "Committed 95% uptime with penalty-backed service levels",
  "Open API and CSV/JSON export explicitly offered",
  "Comparable deployment at Nagpur Municipal Corporation with measured outcome",
];

const RISKS = [
  "Two proposed sensing points depend on shared power circuits",
  "Calibration crew availability during monsoon week is unconfirmed",
  "Dashboard training limited to two sessions in the quoted scope",
];

function ProposalDetail() {
  const navigate = useNavigate();
  const [considered, setConsidered] = React.useState(false);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Proposal PRP-8801 · Shortlisted"
        title="Building-level acoustic and flow monitoring"
        description="AquaSense Technologies · Submitted 14 May 2026 · Smart Water Monitoring for Government Buildings"
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/gov/proposals">
                <ArrowLeft className="size-4" /> Back to evaluation
              </Link>
            </Button>
            <Button
              onClick={() => {
                setConsidered(true);
                toast.success("Added to pilot consideration");
              }}
            >
              <CheckCircle2 className="size-4" /> Add to Pilot Consideration
            </Button>
          </>
        }
      />

      <AiDisclaimer />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Technical approach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Clamp-on ultrasonic flow sensing on each building inlet, with acoustic correlators on internal zone
                lines. No pipe cutting or civil excavation is required, so the heritage block can be instrumented
                within the two-hour supply interruption limit.
              </p>
              <p>
                Readings are aggregated by a low-power edge gateway per building and pushed over LoRaWAN to a
                department-hosted dashboard. Anomaly thresholds are learned from a 14-day baseline and tuned weekly
                during the pilot.
              </p>
              <p>
                Alerts reach the designated engineer by SMS and dashboard notification, with an escalation path if the
                alert is unacknowledged for 30 minutes. All operational data remains in India and is exportable in
                CSV and JSON at any point.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Quoted budget", value: formatINR(800000) },
              { label: "Duration", value: "90 days" },
              { label: "Sites covered", value: "5 buildings" },
            ].map((s) => (
              <Card key={s.label} className="border-border">
                <CardContent className="p-4">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-xl font-semibold">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Committed KPIs</CardTitle>
              <CardDescription>As stated by the applicant in the proposal.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {[
                "Water consumption reduction of at least 15% against baseline",
                "System uptime of at least 95% per month",
                "Leak alert within 10 minutes of anomaly onset",
                "90% of sensing points reporting daily",
              ].map((k) => (
                <p key={k} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> {k}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card className="border-accent/30 shadow-[var(--shadow-panel)]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-base">AI analysis</CardTitle>
                <AiBadge />
              </div>
              <CardDescription>Requirement coverage and observations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Requirement coverage</span>
                  <span className="font-semibold">92%</span>
                </div>
                <Progress value={92} className="mt-2" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-success">Strengths</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {STRENGTHS.map((s) => (
                    <li key={s} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-warning-foreground">Risks</p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  {RISKS.map((s) => (
                    <li key={s} className="flex gap-2">
                      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-warning-foreground" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-surface">
            <CardContent className="space-y-3 p-5">
              <Badge variant="outline" className={considered ? "border-success/40 bg-success/10 text-success" : ""}>
                {considered ? "In pilot consideration" : "Not yet considered"}
              </Badge>
              <Button className="w-full" disabled={!considered} onClick={() => void navigate({ to: "/gov/pilot" })}>
                <FlaskConical className="size-4" /> Create Controlled Pilot
              </Button>
              <p className="text-xs text-muted-foreground">
                Creating a pilot records a limited, time-bound deployment with defined KPIs. It is not an award of a
                long-term contract.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
