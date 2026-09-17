import { useNavigate } from "@tanstack/react-router";
import { Building2, FileText, FlaskConical, Rocket } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { PROBLEMS, PROPOSALS, STARTUPS } from "@/data/prototype";
import { usePrototype } from "@/lib/prototype-store";

export function GlobalSearch() {
  const { searchOpen, setSearchOpen } = usePrototype();
  const navigate = useNavigate();

  const go = (to: string) => {
    setSearchOpen(false);
    void navigate({ to });
  };

  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder="Search problems, startups, proposals, pilots…" />
      <CommandList>
        <CommandEmpty>No matching records in this workspace.</CommandEmpty>
        <CommandGroup heading="Problems">
          {PROBLEMS.map((p) => (
            <CommandItem key={p.id} value={`${p.title} ${p.department} ${p.sector}`} onSelect={() => go("/gov/problems")}>
              <FileText className="size-4" />
              <span className="truncate">{p.title}</span>
              <span className="ml-auto text-xs text-muted-foreground">{p.status}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Startups">
          {STARTUPS.map((s) => (
            <CommandItem key={s.id} value={`${s.name} ${s.sector}`} onSelect={() => go(`/gov/startup-profile/${s.id}`)}>
              <Building2 className="size-4" />
              <span className="truncate">{s.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{s.match}% match</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Proposals">
          {PROPOSALS.slice(0, 5).map((p) => (
            <CommandItem key={p.id} value={`${p.id} ${p.startup} ${p.title}`} onSelect={() => go("/gov/proposals")}>
              <Rocket className="size-4" />
              <span className="truncate">{p.id} · {p.startup}</span>
              <span className="ml-auto text-xs text-muted-foreground">{p.status}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Pilots">
          <CommandItem value="Smart Water Monitoring Pilot AquaSense" onSelect={() => go("/gov/pilot")}>
            <FlaskConical className="size-4" />
            <span>Smart Water Monitoring Pilot</span>
            <span className="ml-auto text-xs text-muted-foreground">72%</span>
          </CommandItem>
          <CommandItem value="KPI monitoring evidence" onSelect={() => go("/gov/kpi")}>
            <FlaskConical className="size-4" />
            <span>KPI Monitoring</span>
            <span className="ml-auto text-xs text-muted-foreground">4 KPIs met</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
