import * as React from "react";

export type Role = "gov" | "startup";

export type AppNotification = {
  id: string;
  title: string;
  detail: string;
  category: "Pilots" | "Proposals" | "Compliance" | "System";
  time: string;
  href: string;
  read: boolean;
};

export type SubmittedProposal = {
  id: string;
  title: string;
  problem: string;
  budget: number;
  status: string;
  submitted: string;
};

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    title: "Milestone evidence uploaded",
    detail: "AquaSense Technologies uploaded week 10 telemetry evidence.",
    category: "Pilots",
    time: "12 min ago",
    href: "/gov/pilot",
    read: false,
  },
  {
    id: "n2",
    title: "AI analysis finished",
    detail: "85 of 102 proposals shortlisted for Smart Water Monitoring.",
    category: "Proposals",
    time: "1 hour ago",
    href: "/gov/proposals",
    read: false,
  },
  {
    id: "n3",
    title: "2 high-severity clauses flagged",
    detail: "Prior experience restriction and data ownership gap detected.",
    category: "Compliance",
    time: "3 hours ago",
    href: "/gov/compliance",
    read: false,
  },
  {
    id: "n4",
    title: "KPI targets met",
    detail: "All four pilot KPIs are currently above target.",
    category: "Pilots",
    time: "Yesterday",
    href: "/gov/kpi",
    read: true,
  },
  {
    id: "n5",
    title: "Scheduled maintenance",
    detail: "Platform maintenance window on Sunday, 02:00–04:00 IST.",
    category: "System",
    time: "2 days ago",
    href: "/gov/dashboard",
    read: true,
  },
];

const DEFAULT_PROPOSALS: SubmittedProposal[] = [
  { id: "SP-4412", title: "Building-level acoustic and flow monitoring", problem: "Smart Water Monitoring for Government Buildings", budget: 800000, status: "Selected for Pilot", submitted: "14 May 2026" },
  { id: "SP-4396", title: "Sewage overflow acoustic early warning", problem: "Sewage Overflow Early Warning", budget: 1450000, status: "Under Evaluation", submitted: "28 Apr 2026" },
  { id: "SP-4371", title: "Ward-level pressure zone analytics", problem: "Urban Water Leakage Detection", budget: 980000, status: "Under Evaluation", submitted: "11 Apr 2026" },
  { id: "SP-4350", title: "Campus water audit programme", problem: "Streetlight Energy Consumption Reduction", budget: 640000, status: "Not Shortlisted", submitted: "22 Mar 2026" },
];

type Ctx = {
  role: Role;
  setRole: (r: Role) => void;
  signedIn: boolean;
  setSignedIn: (v: boolean) => void;
  notifications: AppNotification[];
  unread: number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  pushNotification: (n: Omit<AppNotification, "id" | "read" | "time">) => void;
  proposals: SubmittedProposal[];
  addProposal: (p: Omit<SubmittedProposal, "id" | "submitted">) => void;
  pilotDecision: string | null;
  setPilotDecision: (d: string | null) => void;
  appliedFindings: string[];
  toggleFinding: (id: string, applied: boolean) => void;
  invited: string[];
  invite: (id: string) => void;
  assistantOpen: boolean;
  setAssistantOpen: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
};

const PrototypeContext = React.createContext<Ctx | null>(null);

const STORAGE_KEY = "govinnovate-state-v1";

export function PrototypeProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = React.useState<Role>("gov");
  const [signedIn, setSignedIn] = React.useState(false);
  const [notifications, setNotifications] = React.useState(DEFAULT_NOTIFICATIONS);
  const [proposals, setProposals] = React.useState(DEFAULT_PROPOSALS);
  const [pilotDecision, setPilotDecision] = React.useState<string | null>(null);
  const [appliedFindings, setAppliedFindings] = React.useState<string[]>([]);
  const [invited, setInvited] = React.useState<string[]>([]);
  const [assistantOpen, setAssistantOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.role) setRoleState(parsed.role);
      if (typeof parsed.signedIn === "boolean") setSignedIn(parsed.signedIn);
      if (Array.isArray(parsed.notifications)) setNotifications(parsed.notifications);
      if (Array.isArray(parsed.proposals)) setProposals(parsed.proposals);
      if (Array.isArray(parsed.appliedFindings)) setAppliedFindings(parsed.appliedFindings);
      if (Array.isArray(parsed.invited)) setInvited(parsed.invited);
      if (parsed.pilotDecision !== undefined) setPilotDecision(parsed.pilotDecision);
    } catch {
      /* ignore */
    }
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ role, signedIn, notifications, proposals, appliedFindings, invited, pilotDecision }),
      );
    } catch {
      /* ignore */
    }
  }, [role, signedIn, notifications, proposals, appliedFindings, invited, pilotDecision]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value: Ctx = {
    role,
    setRole: setRoleState,
    signedIn,
    setSignedIn,
    notifications,
    unread: notifications.filter((n) => !n.read).length,
    markAllRead: () => setNotifications((ns) => ns.map((n) => ({ ...n, read: true }))),
    markRead: (id) => setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, read: true } : n))),
    pushNotification: (n) =>
      setNotifications((ns) => [
        { ...n, id: `n-${Date.now()}`, read: false, time: "Just now" },
        ...ns,
      ]),
    proposals,
    addProposal: (p) =>
      setProposals((ps) => [
        { ...p, id: `SP-${Math.floor(4500 + Math.random() * 400)}`, submitted: "Today" },
        ...ps,
      ]),
    pilotDecision,
    setPilotDecision,
    appliedFindings,
    toggleFinding: (id, applied) =>
      setAppliedFindings((f) => (applied ? Array.from(new Set([...f, id])) : f.filter((x) => x !== id))),
    invited,
    invite: (id) => setInvited((v) => Array.from(new Set([...v, id]))),
    assistantOpen,
    setAssistantOpen,
    searchOpen,
    setSearchOpen,
  };

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototype() {
  const ctx = React.useContext(PrototypeContext);
  if (!ctx) throw new Error("usePrototype must be used inside PrototypeProvider");
  return ctx;
}
