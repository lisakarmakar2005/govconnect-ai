import * as React from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  Building2,
  ClipboardCheck,
  FileSignature,
  FileText,
  FlaskConical,
  Gauge,
  LayoutDashboard,
  LineChart,
  ListChecks,
  LogIn,
  Menu,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";

import { GlobalSearch } from "@/components/global-search";
import { GovAiAssistant } from "@/components/gov-ai-assistant";
import { NotificationCenter } from "@/components/notification-center";
import { Button } from "@/components/ui/button";
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
import { usePrototype, type Role } from "@/lib/prototype-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const GOV_NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Workspace",
    items: [
      { to: "/gov/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/gov/problems", label: "Problems", icon: FileText },
      { to: "/gov/create-problem", label: "Create Problem", icon: Sparkles },
    ],
  },
  {
    group: "AI Workflow",
    items: [
      { to: "/gov/structuring", label: "AI Structuring", icon: Bot },
      { to: "/gov/compliance", label: "Compliance Check", icon: ShieldCheck },
      { to: "/gov/matching", label: "Startup Discovery", icon: Users },
      { to: "/gov/proposals", label: "Proposal Evaluation", icon: Rocket },
    ],
  },
  {
    group: "Pilot",
    items: [
      { to: "/gov/pilot", label: "Pilot Dashboard", icon: FlaskConical },
      { to: "/gov/kpi", label: "KPI Monitoring", icon: Gauge },
      { to: "/gov/decision", label: "Success Decision", icon: ClipboardCheck },
    ],
  },
  {
    group: "Scale-Up",
    items: [
      { to: "/gov/scale-up", label: "Procurement Pathway", icon: TrendingUp },
      { to: "/gov/checklist", label: "Procurement Checklist", icon: ListChecks },
      { to: "/gov/contract", label: "Large-Scale Contract", icon: FileSignature },
      { to: "/gov/reports", label: "Reports & Analytics", icon: LineChart },
    ],
  },
];

const STARTUP_NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Workspace",
    items: [
      { to: "/startup/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/startup/discover", label: "Discover Problems", icon: Search },
      { to: "/startup/submit-proposal", label: "Submit Proposal", icon: Sparkles },
    ],
  },
  {
    group: "Engagements",
    items: [
      { to: "/startup/proposals", label: "My Proposals", icon: FileText },
      { to: "/startup/pilots", label: "Pilot Hub", icon: FlaskConical },
      { to: "/gov/startup-profile/aquasense", label: "Company Profile", icon: Building2 },
    ],
  },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const { role } = usePrototype();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const groups = role === "gov" ? GOV_NAV : STARTUP_NAV;

  return (
    <nav className="flex flex-col gap-6 p-4" aria-label="Main navigation">
      {groups.map((g) => (
        <div key={g.group}>
          <p className="px-3 text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50">
            {g.group}
          </p>
          <ul className="mt-2 space-y-1">
            {g.items.map((item) => {
              const active = path === item.to;
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/85 transition-colors hover:bg-white/10 hover:text-sidebar-accent-foreground",
                      active && "bg-white/12 text-sidebar-accent-foreground shadow-inner",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className={cn("size-4 shrink-0", active && "text-sidebar-primary")} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function RoleSwitcher() {
  const { role, setRole } = usePrototype();
  const navigate = useNavigate();

  const change = (next: Role) => {
    if (next === role) return;
    setRole(next);
    toast.success(next === "gov" ? "Switched to Government Officer" : "Switched to AquaSense Technologies");
    void navigate({ to: next === "gov" ? "/gov/dashboard" : "/startup/dashboard" });
  };

  return (
    <div
      className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5"
      role="group"
      aria-label="Switch demo role"
    >
      {(
        [
          { key: "gov" as const, label: "Government Officer", short: "Officer" },
          { key: "startup" as const, label: "Startup (AquaSense Technologies)", short: "Startup" },
        ]
      ).map((r) => (
        <button
          key={r.key}
          type="button"
          onClick={() => change(r.key)}
          aria-pressed={role === r.key}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium text-brand-foreground/70 transition-colors",
            role === r.key && "bg-accent text-accent-foreground",
          )}
        >
          <span className="hidden lg:inline">{r.label}</span>
          <span className="lg:hidden">{r.short}</span>
        </button>
      ))}
    </div>
  );
}

function DemoLoginDialog() {
  const { signedIn, setSignedIn, role, setRole } = usePrototype();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
        onClick={() => setOpen(true)}
      >
        <LogIn className="size-4" />
        <span className="hidden sm:inline">{signedIn ? "Demo session" : "Demo entry"}</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demo entry</DialogTitle>
            <DialogDescription>
              This is a prototype. No credentials are verified and no data leaves your browser.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-email">Official email</Label>
              <Input id="demo-email" defaultValue={role === "gov" ? "r.nanda@mid.gov.in" : "ananya@aquasense.in"} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-pass">Password</Label>
              <Input id="demo-pass" type="password" defaultValue="demo-access" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                variant={role === "gov" ? "default" : "outline"}
                onClick={() => setRole("gov")}
                type="button"
              >
                Government Officer
              </Button>
              <Button
                variant={role === "startup" ? "default" : "outline"}
                onClick={() => setRole("startup")}
                type="button"
              >
                Startup
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setSignedIn(true);
                setOpen(false);
                toast.success("Signed in to the demo workspace");
                void navigate({ to: role === "gov" ? "/gov/dashboard" : "/startup/dashboard" });
              }}
            >
              Enter workspace
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function TopBar({ onMenu }: { onMenu?: () => void }) {
  const { setAssistantOpen, setSearchOpen, role } = usePrototype();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-brand text-brand-foreground">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        {onMenu ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-brand-foreground hover:bg-white/10 hover:text-brand-foreground lg:hidden"
            onClick={onMenu}
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </Button>
        ) : null}

        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
            <ShieldCheck className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-semibold tracking-tight">GovInnovate</span>
            <span className="hidden truncate text-[11px] text-brand-foreground/60 sm:block">
              From Government Problems to Proven Innovation
            </span>
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs text-brand-foreground/70 transition-colors hover:border-accent md:flex"
          >
            <Search className="size-4" />
            <span>Search…</span>
            <kbd className="rounded border border-white/20 px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="text-brand-foreground hover:bg-white/10 hover:text-brand-foreground md:hidden"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="size-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
            onClick={() => setAssistantOpen(true)}
          >
            <Bot className="size-4 text-accent" />
            <span className="hidden sm:inline">GovAI</span>
          </Button>

          <NotificationCenter />
          <div className="hidden sm:block">
            <RoleSwitcher />
          </div>
          <DemoLoginDialog />
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 px-4 py-2 sm:hidden">
        <span className="text-[11px] text-brand-foreground/60">
          Viewing as {role === "gov" ? "Government Officer" : "AquaSense Technologies"}
        </span>
        <RoleSwitcher />
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background">
      <TopBar onMenu={() => setMobileOpen(true)} />
      <div className="flex w-full">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto bg-sidebar lg:block">
          <SidebarNav />
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto bg-sidebar">
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm font-semibold text-sidebar-accent-foreground">Navigation</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-sidebar-foreground hover:bg-white/10"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                >
                  <X className="size-5" />
                </Button>
              </div>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        ) : null}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-6xl space-y-6">{children}</div>
        </main>
      </div>
      <GlobalSearch />
      <GovAiAssistant />
    </div>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main>{children}</main>
      <GlobalSearch />
      <GovAiAssistant />
    </div>
  );
}
