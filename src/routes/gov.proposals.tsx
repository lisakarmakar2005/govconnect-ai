import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { AiBadge, AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader, StatCard } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROPOSALS, formatINR, type Proposal } from "@/data/prototype";

export const Route = createFileRoute("/gov/proposals")({
  head: () => ({
    meta: [
      { title: "Proposal Evaluation — GovInnovate" },
      {
        name: "description",
        content:
          "Run an AI proposal analysis across 102 submissions and compare shortlisted proposals on technical fit, outcome alignment, cost, scalability and pilot readiness.",
      },
      { property: "og:title", content: "Proposal Evaluation — GovInnovate" },
      { property: "og:description", content: "Comparison matrix with weighting filters and shortlisting actions." },
    ],
  }),
  component: Proposals,
});

const SORTS: { key: keyof Proposal; label: string }[] = [
  { key: "technicalFit", label: "Technical Fit" },
  { key: "outcomeAlignment", label: "Outcome Alignment" },
  { key: "cost", label: "Cost" },
  { key: "scalability", label: "Scalability" },
  { key: "pilotReadiness", label: "Pilot Readiness" },
];

function Proposals() {
  const [stage, setStage] = React.useState<"idle" | "running" | "done">("idle");
  const [progress, setProgress] = React.useState(0);
  const [sort, setSort] = React.useState<keyof Proposal>("technicalFit");
  const [shortlisted, setShortlisted] = React.useState<string[]>([]);

  const run = () => {
    setStage("running");
    setProgress(4);
    const t = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(t);
          setStage("done");
          toast.success("85 of 102 proposals shortlisted by AI analysis");
          return 100;
        }
        return p + 5;
      });
    }, 80);
  };

  const rows = [...PROPOSALS].sort((a, b) => (b[sort] as number) - (a[sort] as number));

  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 5 of 8 · Evaluation"
        title="Proposal Evaluation & Analyzer"
        description="Smart Water Monitoring for Government Buildings — proposals received against the published statement."
        actions={
          <Button onClick={run} disabled={stage === "running"}>
            {stage === "running" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Run AI Proposal Analysis
          </Button>
        }
      />

      <AiDisclaimer />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Proposals received" value={102} hint="Across 31 days of open window" />
        <StatCard label="AI shortlisted" value={stage === "done" ? 85 : "—"} hint="Meeting all mandatory criteria" />
        <StatCard label="Officer shortlist" value={shortlisted.length} hint="Marked for committee review" />
        <StatCard label="Median budget" value={formatINR(800000)} hint="Across shortlisted proposals" />
      </div>

      {stage === "running" ? (
        <Card className="border-border">
          <CardContent className="space-y-3 p-5">
            <p className="text-sm font-medium">Analysing 102 proposals…</p>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground">
              Checking requirement coverage, KPI commitments, costing clarity and pilot readiness.
            </p>
          </CardContent>
        </Card>
      ) : null}

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader className="gap-3 sm:flex sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-base">Comparison matrix</CardTitle>
            <CardDescription>Scores are indicative and weighted by the selected criterion.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <AiBadge label="AI scored" />
            <Select value={sort} onValueChange={(v) => setSort(v as keyof Proposal)}>
              <SelectTrigger className="w-[190px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORTS.map((s) => (
                  <SelectItem key={s.key} value={s.key as string}>
                    Rank by {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Proposal</th>
                {SORTS.map((s) => (
                  <th key={s.key} className="py-2 pr-4 font-medium">
                    {s.label}
                  </th>
                ))}
                <th className="py-2 pr-4 font-medium">Budget</th>
                <th className="py-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} className="border-b border-border/60 align-top">
                  <td className="py-3 pr-4">
                    <p className="font-medium text-foreground">{p.startup}</p>
                    <p className="text-xs text-muted-foreground">{p.title}</p>
                    <Badge variant="outline" className="mt-1">
                      {p.status}
                    </Badge>
                  </td>
                  {SORTS.map((s) => (
                    <td key={s.key} className="py-3 pr-4 tabular-nums">
                      {p[s.key] as number}
                    </td>
                  ))}
                  <td className="py-3 pr-4 tabular-nums">{formatINR(p.budget)}</td>
                  <td className="py-3">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={shortlisted.includes(p.id)}
                        onClick={() => {
                          setShortlisted((s) => [...s, p.id]);
                          toast.success(`${p.startup} shortlisted for review`);
                        }}
                      >
                        {shortlisted.includes(p.id) ? "Shortlisted" : "Shortlist"}
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <Link to="/gov/proposal-detail">View Proposal</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
