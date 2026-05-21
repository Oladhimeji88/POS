"use client";

import { useState } from "react";
import { Clock, CheckCircle2, ChefHat } from "lucide-react";
import { AppShell } from "@/components/AppShell";

type Status = "New" | "Cooking" | "Ready";

interface Ticket {
  id: string;
  table: string;
  items: { name: string; qty: number; note?: string }[];
  ageLabel: string;
  ageSecs: number;
  status: Status;
}

const seed: Ticket[] = [
  {
    id: "#2418", table: "Table 12", status: "New", ageLabel: "just now", ageSecs: 30,
    items: [{ name: "Suya Platter", qty: 2 }, { name: "Jollof Rice", qty: 2 }, { name: "Pounded Yam", qty: 1, note: "extra soup" }],
  },
  {
    id: "#2416", table: "Takeout", status: "Cooking", ageLabel: "6 min", ageSecs: 360,
    items: [{ name: "Fried Plantain", qty: 3 }, { name: "Peppered Chicken", qty: 2 }],
  },
  {
    id: "#2415", table: "Event · Wedding", status: "Cooking", ageLabel: "12 min", ageSecs: 720,
    items: [{ name: "Egusi Soup", qty: 8 }, { name: "Fufu", qty: 8 }, { name: "Fried Rice", qty: 6 }],
  },
  {
    id: "#2413", table: "Table 7", status: "Ready", ageLabel: "18 min", ageSecs: 1080,
    items: [{ name: "Grilled Fish", qty: 2 }, { name: "Jollof Rice", qty: 2 }],
  },
  {
    id: "#2410", table: "Table 9", status: "New", ageLabel: "2 min", ageSecs: 120,
    items: [{ name: "Pepper Soup", qty: 1 }, { name: "Fried Yam", qty: 2 }],
  },
];

const statusCfg: Record<Status, { bg: string; border: string; badge: string; label: string }> = {
  New:     { bg: "bg-sky-50",    border: "border-sky-300",    badge: "bg-sky-100 text-sky-700",      label: "New order" },
  Cooking: { bg: "bg-orange-50", border: "border-orange-300", badge: "bg-orange-100 text-orange-700", label: "Cooking" },
  Ready:   { bg: "bg-primary/5", border: "border-primary/40", badge: "bg-primary/10 text-primary",    label: "Ready" },
};

const nextAction: Record<Status, string> = {
  New: "Start cooking",
  Cooking: "Mark ready",
  Ready: "Serve & bump",
};

const order: Status[] = ["New", "Cooking", "Ready"];

export default function KitchenHome() {
  const [tickets, setTickets] = useState(seed);

  function advance(id: string) {
    setTickets((prev) =>
      prev
        .map((t) => {
          if (t.id !== id) return t;
          const idx = order.indexOf(t.status);
          if (idx === order.length - 1) return null!;
          return { ...t, status: order[idx + 1] };
        })
        .filter(Boolean)
    );
  }

  const counts = {
    new:     tickets.filter((t) => t.status === "New").length,
    cooking: tickets.filter((t) => t.status === "Cooking").length,
    ready:   tickets.filter((t) => t.status === "Ready").length,
  };

  return (
    <AppShell title="Kitchen" subtitle="Live order queue">
      <div className="grid grid-cols-3 gap-3 mb-2">
        {[
          { label: "Waiting",  count: counts.new,     color: "text-sky-600",    dot: "bg-sky-400" },
          { label: "Cooking",  count: counts.cooking, color: "text-orange-600", dot: "bg-orange-400" },
          { label: "Ready",    count: counts.ready,   color: "text-primary",    dot: "bg-primary" },
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

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
          <ChefHat className="h-14 w-14 text-muted-foreground/30" strokeWidth={1.25} />
          <p className="text-lg font-semibold text-muted-foreground">All caught up!</p>
          <p className="text-sm text-muted-foreground">No tickets in the queue right now</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tickets.map((t) => {
            const cfg = statusCfg[t.status];
            const urgent = t.ageSecs > 720;
            return (
              <div key={t.id} className={`rounded-2xl border-2 p-5 flex flex-col gap-4 ${cfg.bg} ${cfg.border}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold leading-none">{t.table}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{t.id}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>

                <ul className="space-y-2">
                  {t.items.map((item) => (
                    <li key={item.name} className="flex items-baseline gap-2 text-sm">
                      <span className="font-bold text-base w-5 shrink-0 text-foreground tabular-nums">{item.qty}×</span>
                      <span className="font-medium">{item.name}</span>
                      {item.note && <span className="text-xs text-muted-foreground">({item.note})</span>}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${urgent ? "text-destructive" : "text-muted-foreground"}`}>
                    <Clock className="h-3.5 w-3.5" />
                    {t.ageLabel}
                    {urgent && " · overdue"}
                  </span>
                  <button
                    type="button"
                    onClick={() => advance(t.id)}
                    className={`rounded-xl px-4 py-2 text-sm font-bold transition-all active:scale-95 ${
                      t.status === "Ready"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-foreground text-background hover:bg-foreground/80"
                    }`}
                  >
                    {t.status === "Ready" && <CheckCircle2 className="inline h-4 w-4 mr-1.5 -mt-0.5" />}
                    {nextAction[t.status]}
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
