import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Loader2, MapPin, Send, Sparkles, Users } from "lucide-react";
import { toast } from "sonner";

import { AiBadge, AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { STARTUPS } from "@/data/prototype";
import { usePrototype } from "@/lib/prototype-store";

export const Route = createFileRoute("/gov/matching")({
  head: () => ({
    meta: [
      { title: "AI Startup Discovery — GovInnovate" },
      {
        name: "description",
        content:
          "Match eligible innovators against a structured problem statement, compare capability and deployment readiness, and invite proposals.",
      },
      { property: "og:title", content: "AI Startup Discovery — GovInnovate" },
      { property: "og:description", content: "Relevance-ranked startup matches with compare and invite actions." },
    ],
  }),
  component: Matching,
});

const CRITERIA = [
  "Demonstrated water-network sensing capability",
  "Deployment readiness within 30 days",
  "Data residency within India",
  "Open API and data export on exit",
  "Non-invasive installation in heritage structures",
];

function Matching() {
  const { invited, invite } = usePrototype();
  const [stage, setStage] = React.useState<"idle" | "running" | "done">("done");
  const [progress, setProgress] = React.useState(100);
  const [compare, setCompare] = React.useState<string[]>([]);
  const [compareOpen, setCompareOpen] = React.useState(false);

  const run = () => {
    setStage("running");
    setProgress(8);
    const t = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(t);
          setStage("done");
          toast.success("3 eligible startups matched");
          return 100;
        }
        return p + 6;
      });
    }, 90);
  };

  const selected = STARTUPS.filter((s) => compare.includes(s.id));

  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 4 of 8 · Discovery"
        title="AI Startup Discovery"
        description="Matching is based on the accepted problem statement, not on vendor names or past contract value."
        actions={
          <>
            <Button variant="outline" disabled={compare.length < 2} onClick={() => setCompareOpen(true)}>
              Compare ({compare.length})
            </Button>
            <Button onClick={run} disabled={stage === "running"}>
              {stage === "running" ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Run AI Matching
            </Button>
          </>
        }
      />

      <AiDisclaimer />

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">Top matching criteria</CardTitle>
          <CardDescription>Derived from the structured requirement and compliance revisions.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {CRITERIA.map((c) => (
            <Badge key={c} variant="outline" className="border-accent/30 bg-accent/5 text-foreground">
              {c}
            </Badge>
          ))}
        </CardContent>
      </Card>

      {stage === "running" ? (
        <Card className="border-border">
          <CardContent className="space-y-3 p-5">
            <p className="text-sm font-medium">Scanning 1,240 registered innovators…</p>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground">
              Filtering on capability evidence, deployment readiness and data handling.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {STARTUPS.map((s) => (
            <Card key={s.id} className="flex flex-col border-border shadow-[var(--shadow-card)]">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-base">{s.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="size-3.5" /> {s.city}
                    </CardDescription>
                  </div>
                  <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-sm font-semibold text-success">
                    {s.match}%
                  </span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-3">
                <AiBadge label="AI relevance" />
                <p className="text-sm text-muted-foreground">{s.blurb}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.capabilities.slice(0, 3).map((c) => (
                    <Badge key={c} variant="secondary">
                      {c}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Readiness: <span className="font-medium text-foreground">{s.readiness}</span> · Team {s.team} · Since{" "}
                  {s.founded}
                </p>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Checkbox
                    checked={compare.includes(s.id)}
                    onCheckedChange={(v) =>
                      setCompare((c) => (v ? Array.from(new Set([...c, s.id])) : c.filter((x) => x !== s.id)))
                    }
                  />
                  Add to comparison
                </label>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  <Button asChild size="sm" variant="outline">
                    <Link to="/gov/startup-profile/$id" params={{ id: s.id }}>
                      View Startup
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    disabled={invited.includes(s.id)}
                    onClick={() => {
                      invite(s.id);
                      toast.success(`Invitation sent to ${s.name}`);
                    }}
                  >
                    <Send className="size-4" /> {invited.includes(s.id) ? "Invited" : "Invite to Proposal"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card className="border-border bg-surface">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
          <p className="text-sm text-muted-foreground">
            <Users className="mr-2 inline size-4 text-accent" />
            Invitations recorded: {invited.length}. Proposals arrive in the evaluation workspace.
          </p>
          <Button asChild variant="outline">
            <Link to="/gov/proposals">Go to Proposal Evaluation</Link>
          </Button>
        </CardContent>
      </Card>

      <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Capability comparison</DialogTitle>
            <DialogDescription>Side-by-side view of the selected innovators.</DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Attribute</th>
                  {selected.map((s) => (
                    <th key={s.id} className="py-2 pr-4 font-medium text-foreground">
                      {s.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "AI relevance", get: (s: (typeof STARTUPS)[number]) => `${s.match}%` },
                  { label: "Readiness", get: (s: (typeof STARTUPS)[number]) => s.readiness },
                  { label: "Team size", get: (s: (typeof STARTUPS)[number]) => String(s.team) },
                  { label: "Certifications", get: (s: (typeof STARTUPS)[number]) => s.certifications.join(", ") },
                  { label: "Past pilots", get: (s: (typeof STARTUPS)[number]) => String(s.pastPilots.length) },
                ].map((row) => (
                  <tr key={row.label} className="border-b border-border/60">
                    <td className="py-2 pr-4 text-muted-foreground">{row.label}</td>
                    {selected.map((s) => (
                      <td key={s.id} className="py-2 pr-4">
                        {row.get(s)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
