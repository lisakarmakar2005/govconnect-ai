import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePrototype } from "@/lib/prototype-store";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Pilots", "Proposals", "Compliance", "System"] as const;

export function NotificationCenter() {
  const { notifications, unread, markAllRead, markRead } = usePrototype();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = React.useState<string>("All");

  const visible = notifications.filter((n) => tab === "All" || n.category === tab);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
          aria-label={`Notifications, ${unread} unread`}
        >
          <Bell className="size-5" />
          {unread > 0 ? (
            <span className="absolute -right-0.5 -top-0.5 grid min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
              {unread}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[22rem] p-0">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            <p className="text-xs text-muted-foreground">{unread} unread</p>
          </div>
          <Button variant="ghost" size="sm" onClick={markAllRead}>
            Mark all read
          </Button>
        </div>
        <div className="border-b border-border px-2 py-2">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full justify-start overflow-x-auto">
              {CATEGORIES.map((c) => (
                <TabsTrigger key={c} value={c} className="text-xs">
                  {c}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <ScrollArea className="max-h-80">
          <ul className="divide-y divide-border">
            {visible.map((n) => (
              <li key={n.id}>
                <Link
                  to={n.href as never}
                  onClick={() => {
                    markRead(n.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "block px-4 py-3 transition-colors hover:bg-surface",
                    !n.read && "bg-accent/5",
                  )}
                >
                  <div className="flex items-start gap-2">
                    {!n.read ? <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden /> : <span className="mt-1.5 size-2 shrink-0" />}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{n.detail}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">
                        {n.category} · {n.time}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            {visible.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-muted-foreground">Nothing here yet.</li>
            ) : null}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
