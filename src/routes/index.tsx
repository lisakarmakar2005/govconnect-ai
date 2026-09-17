import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  BarChart3,
  Building2,
  CheckCircle2,
  FileSearch,
  Gauge,
  Layers,
  ShieldCheck,
} from "lucide-react";

import { AiDisclaimer } from "@/components/ai-disclaimer";
import { PublicShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PIPELINE_STEPS, SECTORS } from "@/data/prototype";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GovInnovate — From Government Problems to Proven Innovation" },
      {
        name: "description",
        content:
          "An AI-assisted procurement platform that turns plain-language government challenges into compliant problem statements, matched startups, controlled pilots and evidence-backed scale-up.",
      },
      { property: "og:title", content: "GovInnovate — From Government Problems to Proven Innovation" },
      {
        property: "og:description",
        content:
          "Structure challenges, check compliance, discover startups, run controlled pilots and scale what works.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Bot,
    title: "AI problem structuring",
    text: "Turn a plain-language description into outcomes, scope, deliverables, solution-neutral requirements and measurable KPIs.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance screening",
    text: "Restrictive eligibility, ambiguous specifications, data-ownership gaps and missing metrics are flagged before publication.",
  },
  {
    icon: Building2,
    title: "Startup discovery",
    text: "Match eligible innovators on capability overlap, deployment readiness and comparable field outcomes.",
  },
  {
    icon: FileSearch,
    title: "Proposal analysis",
    text: "Compare large proposal volumes on a common matrix of technical fit, outcome alignment, cost, scalability and readiness.",
  },
  {
    icon: Gauge,
    title: "Controlled pilots",
    text: "Time-bound deployments with milestone evidence, issue logs and KPI targets tracked against actuals.",
  },
  {
    icon: BarChart3,
    title: "Evidence to procurement",
    text: "Carry pilot evidence into the applicable statutory route, approvals, contract preparation and phased scale-up.",
  },
];

const STATS = [
  { value: "42", label: "Challenges published" },
  { value: "1,240", label: "Startup proposals received" },
  { value: "14", label: "Pilots proven successful" },
  { value: "₹18.6 Cr", label: "Scale-up value initiated" },
];

function Landing() {
  return (
    <PublicShell>
      {/* Hero */}
      <section className="bg-brand text-brand-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-brand-foreground/80">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              AI-assisted innovation procurement
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              From Government Problems to Proven Innovation
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-brand-foreground/75">
              GovInnovate helps departments describe a challenge in plain language, structure it into a
              compliant, solution-neutral statement, discover capable startups, run a controlled pilot and
              carry verified evidence into scale-up procurement.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/gov/dashboard">
                  Explore Platform <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/25 bg-transparent text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
              >
                <Link to="/startup/dashboard">For Startups</Link>
              </Button>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-2xl font-semibold text-accent">{s.value}</span>
                    <span className="mt-1 block text-xs leading-snug text-brand-foreground/60">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[var(--shadow-panel)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Live pilot snapshot</p>
            <h2 className="mt-2 text-lg font-semibold">Smart Water Monitoring Pilot</h2>
            <p className="mt-1 text-sm text-brand-foreground/70">
              AquaSense Technologies · Municipal Infrastructure Department · 5 buildings
            </p>
            <div className="mt-5 space-y-4">
              {[
                { label: "Water consumption reduction", target: "Target 15%", actual: "18%" },
                { label: "System uptime", target: "Target 95%", actual: "98%" },
                { label: "Leak detection time", target: "Target < 10 min", actual: "6 min" },
              ].map((k) => (
                <div key={k.label} className="rounded-lg border border-white/10 bg-brand/40 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="min-w-0 truncate text-sm">{k.label}</span>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">
                      <CheckCircle2 className="size-3" /> Met
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-brand-foreground/60">
                    {k.target} · Actual {k.actual}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-brand-foreground/55">
              Figures shown are prototype data for demonstration.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">How it works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            One connected pipeline, eight accountable steps
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Each step produces a record the next step depends on, so a decision at the end can be traced back
            to the evidence that supported it.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PIPELINE_STEPS.map((s) => (
            <li
              key={s.step}
              className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
            >
              <span className="grid size-8 place-items-center rounded-md bg-accent/10 text-sm font-semibold text-accent">
                {s.step}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-foreground">{s.name}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.detail}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8">
          <AiDisclaimer />
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Built for the way departments actually procure
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <Card key={f.title} className="border-border shadow-[var(--shadow-card)]">
                  <CardHeader>
                    <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="mt-3 text-base">{f.title}</CardTitle>
                    <CardDescription className="leading-relaxed">{f.text}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* For startups */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">For startups</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
              Compete on capability, not on past contract value
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Challenges are published as outcomes rather than product specifications, and eligibility is
              screened for clauses that shut out newer innovators. Submit a proposal, run a controlled pilot,
              and let measured results carry you into scale-up.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/startup/discover">
                  Discover open challenges <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/startup/submit-proposal">Submit a proposal</Link>
              </Button>
            </div>
          </div>
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Layers className="size-4 text-accent" /> Active sectors
              </CardTitle>
              <CardDescription>Departments currently publishing challenges.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {SECTORS.map((s) => (
                  <li
                    key={s}
                    className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
                  >
                    <span>{s}</span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border bg-brand py-8 text-brand-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-brand-foreground/60 sm:px-6 lg:px-8">
          <p className="font-medium text-brand-foreground">GovInnovate — prototype environment</p>
          <p>
            All departments, startups, figures and documents shown here are fictional and provided for
            demonstration only.
          </p>
        </div>
      </footer>
    </PublicShell>
  );
}
