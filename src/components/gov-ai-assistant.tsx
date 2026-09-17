import * as React from "react";
import { useRouterState } from "@tanstack/react-router";
import { Bot, Send, User } from "lucide-react";

import { AiDisclaimer } from "@/components/ai-disclaimer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { usePrototype } from "@/lib/prototype-store";

type Msg = { id: string; role: "user" | "ai"; text: string };

const KNOWLEDGE: { match: RegExp; answer: string }[] = [
  {
    match: /improve|problem statement|structure/i,
    answer:
      "Your draft is currently written as a description of a symptom. A stronger statement names the measurable outcome, the boundary of the work, and the evidence you will accept. Suggested rewrite: reduce unaccounted water loss across five government buildings by at least 15% within 90 days, measured against a 30-day baseline, without mandating any specific sensing technology. Add a data-ownership clause and an uptime KPI so the pilot can be assessed objectively.",
  },
  {
    match: /compliance|warning|clause|restrict/i,
    answer:
      "The prior-experience clause is flagged because it requires three completed municipal projects of similar value, which structurally excludes newly incorporated innovators. The intent behind it — assurance of capability — can be met with a demonstrated prototype, a field-trial report, or a reference deployment of any scale. Replacing the clause preserves the assurance while widening eligibility. The data-ownership finding is separate and should be fixed by vesting operational data with the department.",
  },
  {
    match: /kpi|pilot|progress|summar/i,
    answer:
      "Smart Water Monitoring Pilot is at 72% completion, day 65 of 90, across five buildings with AquaSense Technologies. All four KPIs are above target: consumption reduction 18% against a 15% target, uptime 98% against 95%, median detection time 6 minutes against a 10-minute ceiling, and 93% of points reporting daily. One issue is open: two sensors were replaced in week 6 after a power fault. Mid-review is scheduled for 18 August 2026.",
  },
  {
    match: /startup|match|vendor|aquasense/i,
    answer:
      "Three innovators match this requirement closely. AquaSense Technologies at 94% is deployment ready with four comparable municipal deployments. HydroTrack Labs at 89% is strong on predictive analytics but has less building-level experience. FlowGuard Systems at 86% brings hardware depth and an on-site maintenance network. Relevance reflects capability overlap, deployment readiness and comparable past outcomes only.",
  },
  {
    match: /budget|cost|₹|procure/i,
    answer:
      "The pilot outlay is ₹8,00,000 for five buildings over 90 days, which works out to ₹1,60,000 per site. Scaling to 250 buildings at the same unit rate would indicate roughly ₹4.00 crore before volume adjustment; the vendor's indicative slab pricing suggests around ₹3.35 crore at that volume. These are indicative figures for planning only and do not substitute for a sanctioned estimate.",
  },
];

const FALLBACK =
  "Based on the records available in this workspace, the challenge is in the water-management portfolio of the Municipal Infrastructure Department, currently at the controlled-pilot stage with AquaSense Technologies. I can help you refine the problem statement, explain a compliance finding, compare proposals, or summarise pilot KPIs. Any recommendation here is advisory and must be confirmed by the authorised officer.";

function promptsFor(path: string) {
  if (path.includes("compliance")) return ["Explain this compliance warning", "Rewrite the eligibility clause", "What is the risk of ignoring this?"];
  if (path.includes("kpi") || path.includes("pilot")) return ["Summarize pilot KPIs", "Is the pilot on track?", "Draft the mid-review note"];
  if (path.includes("matching") || path.includes("startup-profile")) return ["Why is AquaSense ranked first?", "Compare the top three startups", "What readiness evidence exists?"];
  if (path.includes("proposal")) return ["Summarize proposal strengths and risks", "Which proposals miss the KPI coverage?", "Explain the cost comparison"];
  if (path.includes("create-problem") || path.includes("structuring")) return ["Help me improve this problem statement", "Suggest solution-neutral requirements", "Propose measurable KPIs"];
  return ["Help me improve this problem statement", "Explain this compliance warning", "Summarize pilot KPIs"];
}

export function GovAiAssistant() {
  const { assistantOpen, setAssistantOpen } = usePrototype();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [messages, setMessages] = React.useState<Msg[]>([
    {
      id: "welcome",
      role: "ai",
      text: "I am GovAI, your procurement assistant. I can explain findings, structure problem statements and summarise pilot evidence. Recommendations are advisory only.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);

  const send = React.useCallback((text: string) => {
    if (!text.trim() || streaming) return;
    const answer = KNOWLEDGE.find((k) => k.match.test(text))?.answer ?? FALLBACK;
    const aiId = `ai-${Date.now()}`;
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: "user", text }, { id: aiId, role: "ai", text: "" }]);
    setInput("");
    setStreaming(true);
    const words = answer.split(" ");
    let i = 0;
    const timer = window.setInterval(() => {
      i += 2;
      setMessages((m) => m.map((msg) => (msg.id === aiId ? { ...msg, text: words.slice(0, i).join(" ") } : msg)));
      if (i >= words.length) {
        window.clearInterval(timer);
        setStreaming(false);
      }
    }, 40);
  }, [streaming]);

  return (
    <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border bg-brand text-brand-foreground">
          <SheetTitle className="flex items-center gap-2 text-brand-foreground">
            <Bot className="size-5 text-accent" aria-hidden /> GovAI Assistant
          </SheetTitle>
          <SheetDescription className="text-brand-foreground/70">
            Contextual help for the page you are on.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 pt-4">
          <AiDisclaimer compact />
        </div>

        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-4">
            {messages.map((m) => (
              <div key={m.id} className="flex gap-3">
                <span
                  className={
                    m.role === "ai"
                      ? "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent"
                      : "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-secondary-foreground"
                  }
                >
                  {m.role === "ai" ? <Bot className="size-4" /> : <User className="size-4" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-muted-foreground">
                    {m.role === "ai" ? "GovAI" : "You"}
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {m.text}
                    {streaming && m.text === "" ? "Thinking…" : null}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {promptsFor(path).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {p}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask GovAI about this page…"
              aria-label="Message GovAI"
            />
            <Button type="submit" size="icon" disabled={streaming || !input.trim()} aria-label="Send message">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
