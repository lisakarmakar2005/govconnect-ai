import * as React from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Loader2, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { AiBadge, AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { OFFICER_INPUT, STRUCTURED_OUTPUT } from "@/data/prototype";

export const Route = createFileRoute("/gov/structuring")({
  head: () => ({
    meta: [
      { title: "AI Problem Structuring — GovInnovate" },
      {
        name: "description",
        content:
          "Compare the officer's plain-language input with a structured, solution-neutral problem statement and suggested KPIs.",
      },
      { property: "og:title", content: "AI Problem Structuring — GovInnovate" },
      { property: "og:description", content: "Editable structured draft with regenerate and accept controls." },
    ],
  }),
  component: Structuring,
});

const FIELDS: { key: keyof typeof STRUCTURED_OUTPUT; label: string; rows: number }[] = [
  { key: "outcome", label: "Desired Outcome", rows: 3 },
  { key: "scope", label: "Scope", rows: 4 },
  { key: "constraints", label: "Constraints", rows: 4 },
  { key: "deliverables", label: "Deliverables", rows: 4 },
  { key: "requirements", label: "Solution-Neutral Requirements", rows: 4 },
  { key: "kpis", label: "Suggested KPIs", rows: 4 },
];

function Structuring() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({ ...STRUCTURED_OUTPUT });
  const [busy, setBusy] = React.useState<string | null>(null);
  const [accepted, setAccepted] = React.useState(false);

  const regenerate = (key: string, label: string) => {
    setBusy(key);
    window.setTimeout(() => {
      setBusy(null);
      toast.success(`${label} regenerated`);
    }, 1100);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 2 of 8 · AI structuring"
        title="Urban Water Leakage Detection"
        description="Your description on the left, the structured draft on the right. Every field is editable before you accept it."
        actions={
          <>
            <Button
              variant="outline"
              onClick={() => {
                setValues({ ...STRUCTURED_OUTPUT });
                toast.success("All sections regenerated");
              }}
            >
              <RefreshCw className="size-4" /> Regenerate all
            </Button>
            <Button
              onClick={() => {
                setAccepted(true);
                toast.success("Draft accepted and locked for compliance review");
              }}
            >
              <Check className="size-4" /> Accept Draft
            </Button>
          </>
        }
      />

      <AiDisclaimer />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border shadow-[var(--shadow-card)] lg:sticky lg:top-24 lg:self-start">
          <CardHeader>
            <CardTitle className="text-base">Officer's input</CardTitle>
            <CardDescription>Submitted by Smt. R. Nanda, Executive Engineer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="whitespace-pre-wrap rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-foreground">
              {OFFICER_INPUT}
            </p>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Department</dt>
                <dd className="font-medium">Municipal Infrastructure</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Sector</dt>
                <dd className="font-medium">Water Management</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Budget range</dt>
                <dd className="font-medium">₹6,00,000 – ₹12,00,000</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Timeline</dt>
                <dd className="font-medium">90 days</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {FIELDS.map((f) => (
            <Card key={f.key} className="border-border shadow-[var(--shadow-card)]">
              <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-3">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <CardTitle className="text-sm">{f.label}</CardTitle>
                  <AiBadge />
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="shrink-0"
                  onClick={() => regenerate(f.key, f.label)}
                  disabled={busy === f.key}
                >
                  {busy === f.key ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <RefreshCw className="size-4" />
                  )}
                  Regenerate
                </Button>
              </CardHeader>
              <CardContent>
                <Textarea
                  rows={f.rows}
                  value={values[f.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                  aria-label={f.label}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="border-border bg-surface">
        <CardContent className="grid gap-3 p-5 sm:flex sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {accepted ? "Draft accepted" : "Accept the draft to continue"}
            </p>
            <p className="text-sm text-muted-foreground">
              The next step screens the document for restrictive, ambiguous or missing clauses.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to="/gov/problems">Back to problems</Link>
            </Button>
            <Button onClick={() => void navigate({ to: "/gov/compliance" })}>
              <ShieldCheck className="size-4" /> Run Compliance Check
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
