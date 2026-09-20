# GovConnect AI

Build a complete, polished, responsive frontend prototype for GovInnovate — an AI-assisted government innovation procurement platform connecting government departments with eligible startups.

Key features and specifications:
1. Product Identity & Styling:
- Name: GovInnovate ("From Government Problems to Proven Innovation")
- Enterprise government SaaS design: deep navy (#0B192C or #1E293B primary), slate/navy headers, clean crisp light backgrounds (#F8FAFC), teal/cyan accents (#0284C7 or #0D9488), emerald green for successes, amber for warnings, controlled borders and soft card shadows. Clean typography, high accessibility, strictly professional.
- Persistent AI disclaimer banner / label across all AI sections: "AI provides recommendations only. Final procurement decisions and statutory approvals remain with the authorized government officer and applicable rules."
- Currency: Indian Rupees (₹). Fictional realistic departments (Municipal Infrastructure Department, Public Health Department, Urban Development Department, Smart City Operations) and sectors (Water Management, Smart Healthcare, Waste Management, Traffic, Energy).

2. Dual Roles & Switcher:
- Header quick role switcher: toggle between "Government Officer" and "Startup (AquaSense Technologies)" at any time, plus a Demo Entry / Login modal.
- Both roles have complete customized sidebars, dashboards, and workflows.

3. Complete Government Journey (All Interactive & Connected):
- Landing Page: Hero with "Explore Platform", "How It Works" (visual 8-step pipeline), "For Startups", stats, and feature highlights.
- Gov Dashboard: Stats (Active Problems: 12, Proposals Under Review: 48, Active Pilots: 6, Successful Pilots: 14), Quick Action cards ("Start Problem", "Continue Draft: Urban Water Leakage Detection"), Active Pilot card ("Smart Water Monitoring Pilot - AquaSense Technologies - 72%"), Recent Activity feed.
- Problem Management: Tabs (All, Draft, Published, In Evaluation, Pilot, Completed), search, filters, problem cards/table, "+ Create Problem" button.
- Create Problem: Form with plain-language challenge textarea, department, sector, location, estimated budget range (₹), timeline, constraints, data availability. "Generate Problem Statement with AI" button with animated simulated loading state.
- AI Problem Structuring: Split 2-column view (Officer's input vs AI Structured output: Desired Outcome, Scope, Constraints, Deliverables, Solution-Neutral Requirements, Suggested KPIs). Editable fields, "Regenerate" buttons, "Accept Draft", and "Run Compliance Check".
- AI Compliance Checker: Document preview on left, AI findings panel on right (4 realistic findings with Severity pills: Prior Experience Restriction, Ambiguous Technical Requirement, Data Ownership, Missing Metric). Interactive "Apply Suggestion", "Ignore", "Discuss", and "Proceed to Startup Matching".
- AI Startup Discovery: Top matching criteria, "Run AI Matching" simulation, matched startup cards with AI-generated relevance indicator (AquaSense Technologies 94%, HydroTrack Labs 89%, FlowGuard Systems 86%), capabilities, deployment readiness, "View Startup", "Compare", "Invite to Proposal" toast/modal.
- Startup Profile: Tech stack, capabilities, past pilots, team, certifications, docs, "Invite to Proposal" and "Back to Matching".
- Proposal Evaluation & Analyzer: 102 proposals -> "Run AI Proposal Analysis" simulation -> 85 shortlisted proposals. Comparison matrix with filters (Technical Fit, Outcome Alignment, Cost, Scalability, Pilot Readiness), "Shortlist for Review", "View Proposal".
- Proposal Detail: AquaSense Technologies proposal, technical approach, budget ₹8,00,000, AI analysis side-panel (coverage, strengths, risks), "Add to Pilot Consideration" -> "Create Controlled Pilot".
- Controlled Pilot Setup & Dashboard: 5 Government Buildings, 90 days, ₹8,00,000 budget, 72% progress, milestone status, timeline (Initiated -> Deployment -> Data Collection -> Mid-Review -> Final Evaluation), update milestone & upload evidence modals.
- KPI Monitoring: Predefined targets vs actuals cards with status badges (Water consumption reduction: Target 15%, Actual 18% - Met; System uptime: Target 95%, Actual 98% - Met; Leak detection time: Target <10 min, Actual 6 min - Met), interactive trend charts, tabs (Overview, KPI Trends, Evidence, Milestones, Issues).
- Pilot Success Decision: Evaluation summary, decision card "Has the pilot met success criteria?" with confirmation dialog ("Pilot Successful" -> navigates to Procurement Pathway, or "Criteria Not Met" / "Extend Pilot").
- Scale-Up & Procurement Pathway: Visual step-by-step roadmap from Pilot Success -> Review Evidence -> Applicable Route -> Approvals -> Contract -> 250 Buildings Scale. Clear statutory warning. Buttons for "Generate Scale-up Summary" modal, "View Procurement Checklist", "Continue to Contract Preparation".
- Procurement Checklist: Interactive checklist with status pills, checkboxes, and action modals.
- Large-Scale Contract Page: 250 Buildings rollout, timeline, contract prep status, evidence review drawer, "Prepare Contract" and "Mark Procurement Initiated".

4. Complete Startup Journey:
- Startup Dashboard: Stats (Available Problems: 24, My Proposals: 8, Under Evaluation: 3, Active Pilots: 2), quick action cards.
- Discover Government Problems: Search & filter challenges by sector, department, budget ₹, location; Problem detail drawer/page with "Submit Proposal".
- Proposal Submission Form: Multi-step interactive form (solution title, technical approach, budget ₹, timeline, KPIs, documents), validation, and animated success modal that adds to "My Proposals".
- Startup Pilot Hub: View active pilots, submit milestone proof, upload test reports, and view live KPI graphs.

5. Global Features:
- GovAI Assistant: Floating / header trigger opening a slide-out assistant panel with contextual suggested prompts (e.g. "Help me improve this problem statement", "Explain this compliance warning", "Summarize pilot KPIs") with realistic instant streaming responses.
- Global Search (Cmd+K / Search button) with modal searching across problems, startups, pilots, and proposals.
- Notification Center: Popover with unread counters, category tabs, and direct links to relevant prototype pages.
- Reports / Analytics Page: Key metrics, pilot completion rate, average duration, procurement pipeline chart.
- Fully responsive layout with mobile collapsible drawer and tablet-friendly tables. Rich interactive toasts and modals for every action.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/481669f3-5541-4688-91d8-7e5ea6a1f4f4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
