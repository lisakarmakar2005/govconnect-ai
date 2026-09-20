import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, FileText, TriangleAlert } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPIS, KPI_TREND, MILESTONES } from "@/data/prototype";

export const Route = createFileRoute("/gov/kpi")({
  head: () => ({
    meta: [
      { title: "KPI Monitoring — GovInnovate" },
      {
        name: "description",
        content:
          "Pilot KPI targets versus actuals with weekly trends, evidence log, milestones and issues for the Smart Water Monitoring pilot.",
      },
      { property: "og:title", content: "KPI Monitoring — GovInnovate" },
      { property: "og:description", content: "Target versus actual cards, trend charts and evidence tabs." },
    ],
  }),
  component: KpiMonitoring,
});

const EVIDENCE = [
  { name: "Week 10 telemetry export.csv", by: "AquaSense Technologies", date: "18 Aug 2026" },
  { name: "Site 3 power fault rectification note.pdf", by: "AquaSense Technologies", date: "29 Jul 2026" },
  { name: "Baseline consumption report.pdf", by: "Municipal Infrastructure Dept.", date: "26 Jun 2026" },
  { name: "Installation photographs (5 sites).zip", by: "AquaSense Technologies", date: "04 Jul 2026" },
];

const ISSUES = [
  { title: "Power fault at Site 3 sensing point", status: "Resolved", detail: "Two sensors replaced in week 6; reporting restored within 36 hours." },
  { title: "Monsoon access restriction at Site 5", status: "Monitoring", detail: "Roof-level tank sensor inspection deferred to the next dry window." },
];

function KpiMonitoring() {
  return (
    <AppShell>
      <PageHeader
        eyebrow="Pilot monitoring"
        title="KPI Monitoring"
        description="Predefined targets versus measured actuals for the Smart Water Monitoring pilot, week 10 of 13."
        actions={
          <Button asChild>
            <Link to="/gov/decision">Record Success Decision</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <Card key={k.id} className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-muted-foreground">{k.name}</p>
                <Badge variant="outline" className="border-success/40 bg-success/10 text-success">
                  {k.status}
                </Badge>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight">{k.actual}</span>
                <span className="text-sm text-muted-foreground">target {k.target}</span>
              </div>
              <p className="text-xs text-muted-foreground">{k.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">KPI Trends</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 space-y-4">
          <AiDisclaimer />
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Consumption reduction against baseline</CardTitle>
              <CardDescription>Percentage saved versus the 30-day pre-installation baseline.</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={KPI_TREND} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="consumption" stroke="var(--accent)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="mt-4 grid gap-4 lg:grid-cols-2">
          {[
            { key: "uptime", title: "System uptime (%)", colour: "var(--success)" },
            { key: "detection", title: "Leak detection time (minutes)", colour: "var(--warning)" },
          ].map((c) => (
            <Card key={c.key} className="border-border shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-base">{c.title}</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={KPI_TREND} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey={c.key} stroke={c.colour} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="evidence" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="space-y-2 p-4">
              {EVIDENCE.map((e) => (
                <div
                  key={e.name}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3"
                >
                  <span className="flex min-w-0 items-center gap-2 text-sm">
                    <FileText className="size-4 shrink-0 text-accent" />
                    <span className="truncate">{e.name}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {e.by} · {e.date}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="space-y-2 p-4">
              {MILESTONES.map((m) => (
                <div key={m.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border p-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.detail}</p>
                  </div>
                  <Badge variant="outline">{m.status} · {m.date}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issues" className="mt-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="space-y-3 p-4">
              {ISSUES.map((i) => (
                <div key={i.title} className="rounded-lg border border-border p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {i.status === "Resolved" ? (
                      <CheckCircle2 className="size-4 text-success" />
                    ) : (
                      <TriangleAlert className="size-4 text-warning-foreground" />
                    )}
                    <p className="text-sm font-medium">{i.title}</p>
                    <Badge variant="outline">{i.status}</Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{i.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
