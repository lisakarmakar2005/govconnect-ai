import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CheckCircle2, CircleDot, Clock, Upload } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { PageHeader, StatCard } from "@/components/page-header";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { MILESTONES, PILOT, formatINR } from "@/data/prototype";

export const Route = createFileRoute("/gov/pilot")({
  head: () => ({
    meta: [
      { title: "Controlled Pilot Dashboard — GovInnovate" },
      {
        name: "description",
        content:
          "Track the Smart Water Monitoring pilot across 5 government buildings: milestones, progress, evidence uploads and budget.",
      },
      { property: "og:title", content: "Controlled Pilot Dashboard — GovInnovate" },
      { property: "og:description", content: "Milestone timeline, evidence modals and pilot progress at 72%." },
    ],
  }),
  component: PilotDashboard,
});

function statusIcon(status: string) {
  if (status === "Complete") return <CheckCircle2 className="size-5 text-success" />;
  if (status === "In Progress") return <CircleDot className="size-5 text-accent" />;
  return <Clock className="size-5 text-muted-foreground" />;
}

function PilotDashboard() {
  const [updateOpen, setUpdateOpen] = React.useState<string | null>(null);
  const [evidenceOpen, setEvidenceOpen] = React.useState(false);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 6 of 8 · Controlled pilot"
        title={PILOT.name}
        description={`${PILOT.vendor} · ${PILOT.sites} government buildings · ${PILOT.durationDays} days · Officer in charge: ${PILOT.officer}`}
        actions={
          <>
            <Button variant="outline" onClick={() => setEvidenceOpen(true)}>
              <Upload className="size-4" /> Upload evidence
            </Button>
            <Button asChild>
              <Link to="/gov/kpi">View KPI Monitoring</Link>
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Pilot progress" value={`${PILOT.progress}%`} hint="Week 10 of 13" />
        <StatCard label="Sanctioned budget" value={formatINR(PILOT.budget)} hint="Released in 3 tranches" />
        <StatCard label="Sites live" value={`${PILOT.sites}/5`} hint="All buildings reporting" />
        <StatCard label="Open issues" value={1} hint="Power fault at Site 3 resolved" />
      </div>

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">Overall progress</CardTitle>
          <CardDescription>
            <CalendarDays className="mr-1 inline size-4" />
            {PILOT.startDate} → {PILOT.endDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={PILOT.progress} />
        </CardContent>
      </Card>

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">Milestone timeline</CardTitle>
          <CardDescription>Initiated → Deployment → Data Collection → Mid-Review → Final Evaluation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {MILESTONES.map((m) => (
            <div key={m.id} className="flex flex-wrap items-start gap-3 rounded-lg border border-border p-4">
              <span className="mt-0.5">{statusIcon(m.status)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{m.name}</p>
                  <Badge
                    variant="outline"
                    className={
                      m.status === "Complete"
                        ? "border-success/40 bg-success/10 text-success"
                        : m.status === "In Progress"
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : ""
                    }
                  >
                    {m.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{m.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{m.detail}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => setUpdateOpen(m.id)}>
                Update milestone
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border bg-surface">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
          <p className="text-sm text-muted-foreground">
            After the final evaluation, record whether the pilot met its success criteria.
          </p>
          <Button asChild variant="outline">
            <Link to="/gov/decision">Go to Success Decision</Link>
          </Button>
        </CardContent>
      </Card>

      <Dialog open={!!updateOpen} onOpenChange={(v) => !v && setUpdateOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update milestone</DialogTitle>
            <DialogDescription>
              {MILESTONES.find((m) => m.id === updateOpen)?.name} — record progress notes for the file.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="ms-date">Review date</Label>
              <Input id="ms-date" type="date" defaultValue="2026-08-18" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ms-note">Officer note</Label>
              <Textarea id="ms-note" rows={4} placeholder="Observations, attendance, site conditions…" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateOpen(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setUpdateOpen(null);
                toast.success("Milestone updated");
              }}
            >
              Save update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={evidenceOpen} onOpenChange={setEvidenceOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload evidence</DialogTitle>
            <DialogDescription>Attach site photographs, telemetry exports or test reports.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="ev-title">Evidence title</Label>
              <Input id="ev-title" placeholder="Week 10 telemetry export" />
            </div>
            <div className="grid place-items-center rounded-lg border border-dashed border-border bg-surface p-6 text-center text-sm text-muted-foreground">
              <Upload className="mb-2 size-5 text-accent" />
              Drag files here, or choose from your device. Prototype only — nothing is uploaded.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEvidenceOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setEvidenceOpen(false);
                toast.success("Evidence recorded against the pilot");
              }}
            >
              Add evidence
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
