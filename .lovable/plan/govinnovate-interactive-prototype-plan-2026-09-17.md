# GovInnovate — Interactive Prototype Plan

A complete, clickable frontend prototype of an AI-assisted government innovation procurement platform, with two full journeys (Government Officer and Startup) and realistic simulated AI behaviour. All data is fictional and held in the prototype itself — no backend.

## Look and feel

- Deep navy headers and sidebars (#0B192C / #1E293B), crisp light page background (#F8FAFC), teal/cyan accents, emerald for success, amber for warnings.
- Soft card shadows, controlled borders, clean professional typography, strong contrast for accessibility.
- All amounts in Indian Rupees (₹). Fictional departments and sectors as specified.
- Every AI area shows the disclaimer: "AI provides recommendations only. Final procurement decisions and statutory approvals remain with the authorized government officer and applicable rules."

## Shared shell

- Top bar: logo, global search (also opens with Cmd/Ctrl+K), notification centre with unread counts and category tabs, GovAI Assistant trigger, role switcher (Government Officer ↔ Startup — AquaSense Technologies), demo login modal.
- Role-aware sidebar, collapsing into a drawer on mobile; tables reflow for tablet.
- GovAI Assistant slide-out with contextual suggested prompts and streamed-looking replies.
- Toasts and confirmation dialogs on every meaningful action.

## Pages — Government journey

1. Landing page: hero, 8-step pipeline, stats, feature highlights, "For Startups".
2. Officer dashboard: 12 active problems, 48 proposals under review, 6 active pilots, 14 successful pilots; quick actions; active pilot card (Smart Water Monitoring — AquaSense, 72%); activity feed.
3. Problems list: tabs (All / Draft / Published / In Evaluation / Pilot / Completed), search, filters, create button.
4. Create problem: plain-language form with budget, timeline, constraints; "Generate Problem Statement with AI" with animated loading.
5. AI structuring: two-column officer input vs AI output (outcome, scope, constraints, deliverables, solution-neutral requirements, KPIs), editable, regenerate, accept, run compliance check.
6. Compliance checker: document preview plus four findings with severity pills; apply / ignore / discuss; proceed to matching.
7. Startup discovery: matching criteria, "Run AI Matching" simulation, matches at 94% / 89% / 86%, compare, invite.
8. Startup profile: stack, capabilities, past pilots, team, certifications, documents.
9. Proposal evaluation: 102 proposals → AI analysis → 85 shortlisted; comparison matrix with weighting filters.
10. Proposal detail: AquaSense proposal, ₹8,00,000, AI side-panel (coverage, strengths, risks), add to pilot consideration.
11. Pilot setup and dashboard: 5 buildings, 90 days, 72% progress, milestone timeline, update/evidence modals.
12. KPI monitoring: target vs actual cards with status badges, trend charts, tabs (Overview, KPI Trends, Evidence, Milestones, Issues).
13. Pilot decision: evaluation summary and a confirmation dialog (Successful / Not met / Extend).
14. Scale-up pathway: roadmap to 250 buildings, statutory warning, scale-up summary modal.
15. Procurement checklist: interactive items with status pills and action modals.
16. Large-scale contract: rollout plan, contract prep status, evidence drawer, prepare contract / mark initiated.
17. Reports: key metrics, completion rate, average duration, pipeline chart.

## Pages — Startup journey

1. Dashboard: 24 available problems, 8 proposals, 3 under evaluation, 2 active pilots, quick actions.
2. Discover problems: search and filters by sector, department, budget, location; detail view with submit action.
3. Proposal submission: multi-step validated form with animated success modal that adds to My Proposals.
4. My proposals list with statuses.
5. Pilot hub: active pilots, milestone proof upload, test reports, live KPI charts.

## Technical notes

- TanStack Start file routes under `src/routes/` (one route file per page above), shared layout in `__root.tsx`.
- Design tokens added to `src/styles.css` (navy, teal, emerald, amber, surfaces) — no hardcoded colour classes in components.
- Prototype data in `src/data/*.ts`; cross-page state (role, proposals submitted, pilot decisions, notifications) in a lightweight React context with localStorage persistence so the journey feels connected.
- Charts via Recharts; shadcn components for dialogs, tabs, tables, drawers, toasts (sonner).
- AI simulations are timed staged animations, not real model calls.
- Per-route head metadata (title, description, social tags).

## Delivery order

Shell and design system → landing and both dashboards → government journey end to end → startup journey → global features (assistant, search, notifications, reports) → responsive and polish pass.
