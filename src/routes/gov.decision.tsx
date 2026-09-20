import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { KPIS, PILOT, formatINR } from "@/data/prototype";
import { usePrototype } from "@/lib/prototype-store";

export const Route = createFileRoute("/gov/decision")({
  head: () => ({
    meta: [
      { title: "Pilot Success Decision — GovInnovate" },
      {
        name: "description",
        content:
          "Record whether the controlled pilot met its success criteria, with an evaluation summary of KPIs, evidence and spend.",
      },
      { property: "og:title", content: "Pilot Success Decision — GovInnovate" },
      { property: "og:description", content: "Successful, criteria not met, or extend the pilot." },
    ],
  }),
  component: Decision,
});

type Choice = "successful" | "not-met" | "extend";

const CHOICES: { key: Choice; label: string; detail: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    key: "successful",
    label: "Pilot Successful",
    detail: "All defined KPIs met. Move to the scale-up procurement pathway.",
    icon: CheckCircle2,
  },
  {
    key: "not-met",
    label: "Criteria Not Met",
    detail: "Record shortfalls and close the pilot without scale-up.",
    icon: XCircle,
  },
  {
    key: "extend",
    label: "Extend Pilot",
    detail: "Continue for a further defined period to gather more evidence.",
    icon: Clock,
  },
];

function Decision() {
  const navigate = useNavigate();
  const { pilotDecision, setPilotDecision, pushNotification } = usePrototype();
  const [pending, setPending] = React.useState<Choice | null>(null);

  const confirm = () => {
    if (!pending) return;
    const chosen = CHOICES.find((c) => c.key === pending)!;
    setPilotDecision(chosen.label);
    pushNotification({
      title: `Pilot decision recorded: ${chosen.label}`,
      detail: `${PILOT.name} — decision entered by ${PILOT.officer}.`,
      category: "Pilots",
      href: "/gov/decision",
    });
    toast.success(`Decision recorded: ${chosen.label}`);
    setPending(null);
    if (pending === "successful") void navigate({ to: "/gov/scale-up" });
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 7 of 8 · Decision"
        title="Pilot Success Decision"
        description="The decision is recorded against the pilot file and determines whether the scale-up pathway opens."
        actions={pilotDecision ? <Badge variant="outline">Current: {pilotDecision}</Badge> : null}
      />

      <AiDisclaimer />

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">Evaluation summary</CardTitle>
          <CardDescription>
            {PILOT.name} · {PILOT.vendor} · {PILOT.sites} sites · {formatINR(PILOT.budget)} sanctioned
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {KPIS.map((k) => (
            <div key={k.id} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{k.name}</p>
                <Badge variant="outline" className="border-success/40 bg-success/10 text-success">
                  {k.status}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Target {k.target} · Actual {k.actual}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">Has the pilot met success criteria?</CardTitle>
          <CardDescription>Select one option. A confirmation is required before it is recorded.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {CHOICES.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setPending(c.key)}
                className="rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-accent"
              >
                <Icon className="size-5 text-accent" />
                <p className="mt-2 font-semibold">{c.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <AlertDialog open={!!pending} onOpenChange={(v) => !v && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm decision</AlertDialogTitle>
            <AlertDialogDescription>
              Recording “{CHOICES.find((c) => c.key === pending)?.label}” for {PILOT.name}. In a live system this entry
              would be attributable to the authorised officer and subject to applicable rules.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirm}>Confirm and record</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppShell>
  );
}
