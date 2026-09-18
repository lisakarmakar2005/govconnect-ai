import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ArrowRight, FileText, FlaskConical, Rocket, Sparkles, Trophy } from "lucide-react";

import { AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader, StatCard } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ACTIVITY, PILOT, formatINR } from "@/data/prototype";

export const Route = createFileRoute("/gov/dashboard")({
  head: () => ({
    meta: [
      { title: "Officer Dashboard — GovInnovate" },
      {
        name: "description",
        content:
          "Track active problems, proposals under review, running pilots and successful pilots across the department.",
      },
      { property: "og:title", content: "Officer Dashboard — GovInnovate" },
      { property: "og:description", content: "Department-wide view of innovation procurement activity." },
    ],
  }),
  component: GovDashboard,
});

const toneClass: Record<string, string> = {
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
};

function GovDashboard() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Municipal Infrastructure Department"
        title="Good morning, Smt. R. Nanda"
        description="Executive Engineer · Pune, Maharashtra. Here is where your innovation procurement portfolio stands today."
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/gov/problems">View all problems</Link>
            </Button>
            <Button asChild>
              <Link to="/gov/create-problem">
                <Sparkles className="size-4" /> Start Problem
              </Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Problems" value={12} hint="Across 4 sectors" icon={<FileText className="size-5" />} />
        <StatCard label="Proposals Under Review" value={48} hint="18 awaiting your comments" icon={<Rocket className="size-5" />} />
        <StatCard label="Active Pilots" value={6} hint="1 at mid-review stage" icon={<FlaskConical className="size-5" />} />
        <StatCard label="Successful Pilots" value={14} hint="7 moved to procurement" icon={<Trophy className="size-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Start a new problem</CardTitle>
            <CardDescription>
              Describe the challenge in plain language. Structuring, compliance screening and startup matching
              follow automatically.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/gov/create-problem">
                <Sparkles className="size-4" /> Start Problem
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-accent/40 bg-accent/5 shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Continue draft</CardTitle>
            <CardDescription>
              Urban Water Leakage Detection · last edited 2 hours ago · not yet published.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link to="/gov/structuring">
                Continue Draft: Urban Water Leakage Detection <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
            <div className="min-w-0">
              <CardTitle className="truncate text-base">{PILOT.name}</CardTitle>
              <CardDescription>
                {PILOT.vendor} · {PILOT.sites} government buildings · {PILOT.durationDays} days
              </CardDescription>
            </div>
            <span className="shrink-0 rounded-full bg-success/15 px-3 py-1 text-xs font-medium text-success">
              On track
            </span>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall progress</span>
                <span className="font-semibold text-foreground">{PILOT.progress}%</span>
              </div>
              <Progress value={PILOT.progress} className="mt-2" />
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-muted-foreground">Budget</dt>
                <dd className="font-medium text-foreground">{formatINR(PILOT.budget)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Started</dt>
                <dd className="font-medium text-foreground">{PILOT.startDate}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Ends</dt>
                <dd className="font-medium text-foreground">{PILOT.endDate}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">KPIs met</dt>
                <dd className="font-medium text-success">4 of 4</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link to="/gov/pilot">Open pilot dashboard</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link to="/gov/kpi">View KPI monitoring</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Activity className="size-4 text-accent" /> Recent activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {ACTIVITY.map((a) => (
                <li key={a.id} className="flex gap-3">
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${toneClass[a.tone]}`} aria-hidden />
                  <div className="min-w-0">
                    <p className="text-sm leading-snug text-foreground">{a.text}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.meta}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <AiDisclaimer />
    </AppShell>
  );
}
