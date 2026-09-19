import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, FileText, Send } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { STARTUPS } from "@/data/prototype";
import { usePrototype } from "@/lib/prototype-store";

export const Route = createFileRoute("/gov/startup-profile/$id")({
  loader: ({ params }) => {
    const startup = STARTUPS.find((s) => s.id === params.id);
    if (!startup) throw notFound();
    return { startup };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Startup not found — GovInnovate" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.startup.name} — GovInnovate`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.startup.blurb },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.startup.blurb },
      ],
    };
  },
  component: StartupProfile,
});

function StartupProfile() {
  const { startup } = Route.useLoaderData();
  const { invited, invite } = usePrototype();

  return (
    <AppShell>
      <PageHeader
        eyebrow={`AI relevance ${startup.match}% · ${startup.readiness}`}
        title={startup.name}
        description={startup.blurb}
        actions={
          <>
            <Button asChild variant="outline">
              <Link to="/gov/matching">
                <ArrowLeft className="size-4" /> Back to Matching
              </Link>
            </Button>
            <Button
              disabled={invited.includes(startup.id)}
              onClick={() => {
                invite(startup.id);
                toast.success(`Invitation sent to ${startup.name}`);
              }}
            >
              <Send className="size-4" /> {invited.includes(startup.id) ? "Invited" : "Invite to Proposal"}
            </Button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Company</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Headquarters: </span>
              {startup.city}
            </p>
            <p>
              <span className="text-muted-foreground">Founded: </span>
              {startup.founded}
            </p>
            <p>
              <span className="text-muted-foreground">Team size: </span>
              {startup.team}
            </p>
            <p>
              <span className="text-muted-foreground">Sector: </span>
              {startup.sector}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {startup.capabilities.map((c) => (
              <Badge key={c} variant="secondary">
                {c}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Technology stack</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {startup.stack.map((c) => (
              <Badge key={c} variant="outline">
                {c}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle className="text-base">Past pilots</CardTitle>
            <CardDescription>Declared deployments with recorded outcomes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {startup.pastPilots.map((p) => (
              <div key={p.name} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.client}</p>
                <p className="mt-1 text-sm text-success">{p.outcome}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {startup.people.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground">{p.role}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Certifications</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {startup.certifications.map((c) => (
                <Badge key={c} variant="outline" className="border-success/40 bg-success/10 text-success">
                  {c}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-base">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {startup.documents.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => toast("Prototype document", { description: `${d} is illustrative only.` })}
                  className="flex w-full items-center gap-2 rounded-md border border-border px-3 py-2 text-left text-sm transition-colors hover:border-accent"
                >
                  <FileText className="size-4 text-accent" /> {d}
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
