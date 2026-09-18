import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Filter, Plus, Search } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEPARTMENTS, PROBLEMS, SECTORS, formatINRShort } from "@/data/prototype";

export const Route = createFileRoute("/gov/problems")({
  head: () => ({
    meta: [
      { title: "Problem Management — GovInnovate" },
      {
        name: "description",
        content: "Browse, filter and manage departmental challenges from draft through pilot and completion.",
      },
      { property: "og:title", content: "Problem Management — GovInnovate" },
      { property: "og:description", content: "All departmental challenges in one place." },
    ],
  }),
  component: ProblemsPage,
});

const TABS = ["All", "Draft", "Published", "In Evaluation", "Pilot", "Completed"];

const statusStyle: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Published: "bg-info/15 text-info",
  "In Evaluation": "bg-warning/20 text-warning-foreground",
  Pilot: "bg-accent/15 text-accent",
  Completed: "bg-success/15 text-success",
};

function ProblemsPage() {
  const [tab, setTab] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [dept, setDept] = React.useState("all");
  const [sector, setSector] = React.useState("all");

  const rows = PROBLEMS.filter(
    (p) =>
      (tab === "All" || p.status === tab) &&
      (dept === "all" || p.department === dept) &&
      (sector === "all" || p.sector === sector) &&
      (query.trim() === "" ||
        `${p.title} ${p.id} ${p.summary}`.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <AppShell>
      <PageHeader
        eyebrow="Problem management"
        title="Departmental challenges"
        description="Every challenge and its current position in the innovation procurement pipeline."
        actions={
          <Button asChild>
            <Link to="/gov/create-problem">
              <Plus className="size-4" /> Create Problem
            </Link>
          </Button>
        }
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {TABS.map((t) => (
            <TabsTrigger key={t} value={t} className="whitespace-nowrap">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search challenges by title or reference…"
            className="pl-9"
            aria-label="Search challenges"
          />
        </div>
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-full sm:w-64" aria-label="Filter by department">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All departments</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sector} onValueChange={setSector}>
          <SelectTrigger className="w-full sm:w-48" aria-label="Filter by sector">
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sectors</SelectItem>
            {SECTORS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <Filter className="size-3.5" /> Showing {rows.length} of {PROBLEMS.length} challenges
      </p>

      <div className="space-y-3">
        {rows.map((p) => (
          <Card key={p.id} className="border-border shadow-[var(--shadow-card)]">
            <CardContent className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded bg-surface px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    {p.id}
                  </span>
                  <Badge className={statusStyle[p.status]} variant="secondary">
                    {p.status}
                  </Badge>
                  <Badge variant="outline">{p.sector}</Badge>
                </div>
                <h2 className="mt-2 text-base font-semibold text-foreground">{p.title}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground">
                  <div className="flex gap-1">
                    <dt>Department:</dt>
                    <dd className="font-medium text-foreground">{p.department}</dd>
                  </div>
                  <div className="flex gap-1">
                    <dt>Location:</dt>
                    <dd className="font-medium text-foreground">{p.location}</dd>
                  </div>
                  <div className="flex gap-1">
                    <dt>Budget:</dt>
                    <dd className="font-medium text-foreground">
                      {formatINRShort(p.budgetMin)} – {formatINRShort(p.budgetMax)}
                    </dd>
                  </div>
                  <div className="flex gap-1">
                    <dt>Proposals:</dt>
                    <dd className="font-medium text-foreground">{p.proposals}</dd>
                  </div>
                  <div className="flex gap-1">
                    <dt>Updated:</dt>
                    <dd className="font-medium text-foreground">{p.updated}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-wrap gap-2 lg:flex-col lg:items-stretch">
                <Button asChild size="sm" variant="outline">
                  <Link to="/gov/structuring">Open structuring</Link>
                </Button>
                {p.status === "In Evaluation" || p.proposals > 0 ? (
                  <Button asChild size="sm" variant="outline">
                    <Link to="/gov/proposals">View proposals</Link>
                  </Button>
                ) : null}
                {p.status === "Pilot" ? (
                  <Button asChild size="sm">
                    <Link to="/gov/pilot">Pilot dashboard</Link>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>
        ))}
        {rows.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center text-sm text-muted-foreground">
              No challenges match these filters.
            </CardContent>
          </Card>
        ) : null}
      </div>
    </AppShell>
  );
}
