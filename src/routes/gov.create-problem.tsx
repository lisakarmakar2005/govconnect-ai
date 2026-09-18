import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { AiDisclaimer } from "@/components/ai-disclaimer";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DEPARTMENTS, LOCATIONS, OFFICER_INPUT, SECTORS } from "@/data/prototype";

export const Route = createFileRoute("/gov/create-problem")({
  head: () => ({
    meta: [
      { title: "Create Problem — GovInnovate" },
      {
        name: "description",
        content:
          "Describe a departmental challenge in plain language and generate a structured, solution-neutral problem statement.",
      },
      { property: "og:title", content: "Create Problem — GovInnovate" },
      { property: "og:description", content: "Plain-language intake with AI structuring." },
    ],
  }),
  component: CreateProblem,
});

const STAGES = [
  "Reading the challenge description…",
  "Identifying measurable outcomes…",
  "Separating scope from constraints…",
  "Removing solution-specific language…",
  "Drafting suggested KPIs…",
];

function CreateProblem() {
  const navigate = useNavigate();
  const [challenge, setChallenge] = React.useState(OFFICER_INPUT);
  const [generating, setGenerating] = React.useState(false);
  const [stage, setStage] = React.useState(0);

  const generate = () => {
    if (!challenge.trim()) {
      toast.error("Please describe the challenge before generating.");
      return;
    }
    setGenerating(true);
    setStage(0);
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setStage(i);
      if (i >= STAGES.length) {
        window.clearInterval(timer);
        window.setTimeout(() => {
          setGenerating(false);
          toast.success("Structured draft generated for your review");
          void navigate({ to: "/gov/structuring" });
        }, 500);
      }
    }, 750);
  };

  return (
    <AppShell>
      <PageHeader
        eyebrow="Step 1 of 8 · Problem intake"
        title="Create a problem"
        description="Write it the way you would explain it to a colleague. The structuring step will convert it into a formal, solution-neutral statement."
      />

      <AiDisclaimer />

      <Card className="border-border shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-base">Challenge details</CardTitle>
          <CardDescription>Fields marked with an asterisk are required to generate a draft.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="challenge">Describe the challenge in plain language *</Label>
            <Textarea
              id="challenge"
              rows={7}
              value={challenge}
              onChange={(e) => setChallenge(e.target.value)}
              placeholder="What is going wrong, who is affected, and how do you notice it today?"
            />
            <p className="text-xs text-muted-foreground">
              Avoid naming a product or technology. Describe the outcome you need.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dept">Department *</Label>
              <Select defaultValue={DEPARTMENTS[0]}>
                <SelectTrigger id="dept">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">Sector *</Label>
              <Select defaultValue={SECTORS[0]}>
                <SelectTrigger id="sector">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SECTORS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select defaultValue={LOCATIONS[0]}>
                <SelectTrigger id="location">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeline">Indicative timeline *</Label>
              <Select defaultValue="90">
                <SelectTrigger id="timeline">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="120">120 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget-min">Estimated budget — minimum (₹) *</Label>
              <Input id="budget-min" type="number" defaultValue={600000} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget-max">Estimated budget — maximum (₹) *</Label>
              <Input id="budget-max" type="number" defaultValue={1200000} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="constraints">Known constraints</Label>
            <Textarea
              id="constraints"
              rows={3}
              defaultValue="No civil excavation in the heritage block. Water supply interruption limited to 2 hours per site. Works outside public service hours."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="data">Data availability</Label>
            <Textarea
              id="data"
              rows={3}
              defaultValue="Monthly bulk meter readings for 24 months. Building-wise occupancy registers. No sub-metering or telemetry currently in place."
            />
          </div>

          {generating ? (
            <div className="rounded-lg border border-accent/40 bg-accent/5 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-accent">
                <Loader2 className="size-4 animate-spin" />
                {STAGES[Math.min(stage, STAGES.length - 1)]}
              </div>
              <Progress value={(stage / STAGES.length) * 100} className="mt-3" />
              <p className="mt-2 text-xs text-muted-foreground">
                Simulated generation for this prototype. No live model is called.
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <Button onClick={generate} disabled={generating} size="lg">
              {generating ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              Generate Problem Statement with AI
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => toast.success("Draft saved to your workspace")}
              disabled={generating}
            >
              Save draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
