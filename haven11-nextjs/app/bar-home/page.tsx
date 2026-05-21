"use client";

import { useState } from "react";
import { Clock, CheckCircle2, Wine } from "lucide-react";
import { AppShell } from "@/components/AppShell";

type TabStatus = "Waiting" | "Making" | "Ready";

interface BarTab {
  id: string;
  location: string;
  drinks: { name: string; qty: number }[];
  total: string;
  ageLabel: string;
  ageSecs: number;
  status: TabStatus;
}

const seed: BarTab[] = [
  { id: "BAR-04", location: "Bar · Seat 4",       status: "Making",  ageLabel: "4 min", ageSecs: 240, total: "₦22,500",  drinks: [{ name: "Johnnie Walker Black", qty: 2 }, { name: "Soda Water", qty: 2 }] },
  { id: "BAR-07", location: "Lounge · Table 3",   status: "Waiting", ageLabel: "1 min", ageSecs: 60,  total: "₦18,000",  drinks: [{ name: "Chapman", qty: 3 }, { name: "Kunu", qty: 1 }] },
  { id: "BAR-09", location: "Bar · Seat 9",       status: "Ready",   ageLabel: "7 min", ageSecs: 420, total: "₦31,500",  drinks: [{ name: "Hennessy VSOP", qty: 1 }, { name: "Lime Sour", qty: 1 }] },
  { id: "BAR-11", location: "Lounge · Table 8",   status: "Making",  ageLabel: "9 min", ageSecs: 540, total: "₦44,000",  drinks: [{ name: "Whiskey Sour", qty: 2 }, { name: "Mojito", qty: 2 }] },
  { id: "BAR-02", location: "Event · Wedding",    status: "Waiting", ageLabel: "2 min", ageSecs: 120, total: "₦142,000", drinks: [{ name: "Zobo Cocktail", qty: 8 }, { name: "Beer Bucket (5×)", qty: 4 }] },
];

const cfg: Record<TabStatus, { bg: string; border: string; badge: string }> = {
  Waiting: { bg: "bg-sky-50",    border: "border-sky-300",    badge: "bg-sky-100 text-sky-700" },
  Making:  { bg: "bg-orange-50", border: "border-orange-300", badge: "bg-orange-100 text-orange-700" },
  Ready:   { bg: "bg-primary/5", border: "border-primary/40", badge: "bg-primary/10 text-primary" },
};

const nextLabel: Record<TabStatus, string> = {
  Waiting: "Start making",
  Making:  "Mark ready",
  Ready:   "Hand off",
};

const statusOrder: TabStatus[] = ["Waiting", "Making", "Ready"];

export default function BarHome() {
  const [tabs, setTabs] = useState(seed);

  function advance(id: string) {
    setTabs((prev) =>
      prev
        .map((t) => {
          if (t.id !== id) return t;
          const idx = statusOrder.indexOf(t.status);
          if (idx === statusOrder.length - 1) return null!;
          return { ...t, status: statusOrder[idx + 1] };
        })
        .filter(Boolean)
    );
  }

  const counts = {
    waiting: tabs.filter((t) => t.status === "Waiting").length,
    making:  tabs.filter((t) => t.status === "Making").length,
    ready:   tabs.filter((t) => t.status === "Ready").length,
  };

  return (
    <AppShell title="Bar" subtitle="Active drink orders">
      <div className="grid grid-cols-3 gap-3 mb-2">
        {[
          { label: "Waiting", count: counts.waiting, color: "text-sky-600",    dot: "bg-sky-400" },
          { label: "Making",  count: counts.making,  color: "text-orange-600", dot: "bg-orange-400" },
          { label: "Ready",   count: counts.ready,   color: "text-primary",    dot: "bg-primary" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
            </div>
            <p className={`text-3xl font-bold mt-1 ${s.color}`}>{s.count}</p>
          </div>
        ))}
      </div>

      {tabs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <Wine className="h-14 w-14 text-muted-foreground/30" strokeWidth={1.25} />
          <p className="text-lg font-semibold text-muted-foreground">Bar queue is clear</p>
          <p className="text-sm text-muted-foreground">New drink orders will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tabs.map((t) => {
            const c = cfg[t.status];
            const urgent = t.ageSecs > 480;
            return (
              <div key={t.id} className={`rounded-2xl border-2 p-5 flex flex-col gap-4 ${c.bg} ${c.border}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-bold leading-tight">{t.location}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 font-mono">{t.id}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${c.badge}`}>
                    {t.status}
                  </span>
                </div>

                <ul className="space-y-2">
                  {t.drinks.map((d) => (
                    <li key={d.name} className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-base w-5 shrink-0 tabular-nums">{d.qty}×</span>
                      <span className="font-medium">{d.name}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5">
                  <div className="text-xs space-y-0.5">
                    <p className={`flex items-center gap-1.5 font-medium ${urgent ? "text-destructive" : "text-muted-foreground"}`}>
                      <Clock className="h-3.5 w-3.5" />{t.ageLabel}{urgent && " · slow"}
                    </p>
                    <p className="font-bold text-sm tabular-nums">{t.total}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => advance(t.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-bold transition-all active:scale-95 ${
                      t.status === "Ready"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-foreground text-background hover:bg-foreground/80"
                    }`}
                  >
                    {t.status === "Ready" && <CheckCircle2 className="inline h-4 w-4 mr-1 -mt-0.5" />}
                    {nextLabel[t.status]}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
