import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { PageHeader, StatCard } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CHECKLIST } from "@/data/prototype";

export const Route = createFileRoute("/gov/checklist")({
  head: () => ({
    meta: [
      { title: "Procurement Checklist — GovInnovate" },
      {
        name: "description",
        content:
          "Interactive pre-procurement checklist covering evaluation reports, approvals, specifications, fund certificates and legal vetting.",
      },
      { property: "og:title", content: "Procurement Checklist — GovInnovate" },
      { property: "og:description", content: "Status pills, checkboxes and action notes for each item." },
    ],
  }),
  component: ChecklistPage,
});

const tone: Record<string, string> = {
  Complete: "border-success/40 bg-success/10 text-success",
  "In Progress": "border-accent/40 bg-accent/10 text-accent",
  Pending: "border-border bg-surface text-muted-foreground",
};

function ChecklistPage() {
  const [done, setDone] = React.useState<string[]>(
    CHECKLIST.filter((c) => c.status === "Complete").map((c) => c.id),
  );
  const [active, setActive] = React.useState<(typeof CHECKLIST)[number] | null>(null);

  return (
    <AppShell>
      <PageHeader
        eyebrow="Scale-up"
        title="Procurement Checklist"
        description="Every item must be cleared and recorded before a scale-up contract can be initiated."
        actions={
          <Button asChild>
            <Link to="/gov/contract">Go to Contract Preparation</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Items cleared" value={`${done.length}/${CHECKLIST.length}`} />
        <StatCard label="In progress" value={CHECKLIST.filter((c) => c.status === "In Progress").length} />
        <StatCard label="Pending" value={CHECKLIST.filter((c) => c.status === "Pending").length} />
      </div>

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">Checklist</CardTitle>
          <CardDescription>Tick an item to mark it cleared, or open it to record a note.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {CHECKLIST.map((c) => {
            const cleared = done.includes(c.id);
            return (
              <div
                key={c.id}
                className="flex flex-wrap items-center gap-3 rounded-lg border border-border p-3 sm:flex-nowrap"
              >
                <Checkbox
                  checked={cleared}
                  onCheckedChange={(v) => {
                    setDone((d) => (v ? Array.from(new Set([...d, c.id])) : d.filter((x) => x !== c.id)));
                    toast.success(v ? "Item marked cleared" : "Item reopened");
                  }}
                  aria-label={c.name}
                />
                <p className={`min-w-0 flex-1 text-sm ${cleared ? "text-muted-foreground line-through" : ""}`}>
                  {c.name}
                </p>
                <Badge variant="outline" className={tone[cleared ? "Complete" : c.status]}>
                  {cleared ? "Complete" : c.status}
                </Badge>
                <Button size="sm" variant="outline" onClick={() => setActive(c)}>
                  Record action
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record action</DialogTitle>
            <DialogDescription>{active?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="chk-note">Note for the file</Label>
            <Textarea id="chk-note" rows={4} placeholder="Reference number, date and responsible officer…" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActive(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setActive(null);
                toast.success("Action recorded against the checklist item");
              }}
            >
              Save note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
