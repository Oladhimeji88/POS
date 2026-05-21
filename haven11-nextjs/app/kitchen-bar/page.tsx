"use client";

import { AppShell } from "@/components/AppShell";
import { Clock, ChefHat, Wine } from "lucide-react";

const tickets = [
  { id: "#A-2418", table: "T12",       line: "Kitchen", items: ["2× Jollof Rice", "1× Suya Platter", "1× Plantain"],      age: 2,  status: "Firing" },
  { id: "#A-2419", table: "T07",       line: "Kitchen", items: ["1× Grilled Tilapia", "2× Pepper Soup"],                   age: 5,  status: "Cooking" },
  { id: "#A-2420", table: "T04 · Bar", line: "Bar",     items: ["3× Mojito", "2× Heineken"],                               age: 1,  status: "Pouring" },
  { id: "#A-2421", table: "T15",       line: "Kitchen", items: ["1× Pounded Yam", "1× Goat Meat Asun"],                    age: 8,  status: "Plating" },
  { id: "#A-2422", table: "T02 · Bar", line: "Bar",     items: ["1× Chapman", "1× Espresso"],                              age: 3,  status: "Ready" },
  { id: "#A-2423", table: "T18",       line: "Kitchen", items: ["2× Suya Platter"],                                        age: 11, status: "Plating" },
];

export default function KitchenBar() {
  const cols = [
    { key: "Kitchen", icon: ChefHat },
    { key: "Bar",     icon: Wine },
  ];

  return (
    <AppShell title="Kitchen & Bar Display" subtitle="Live tickets · auto-refresh every 5s">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {cols.map((c) => {
          const Icon = c.icon;
          const list = tickets.filter((t) => t.line === c.key);
          return (
            <section key={c.key} className="rounded-xl border border-border bg-card">
              <header className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground"><Icon className="h-4 w-4" /></span>
                  <h2 className="text-sm font-semibold">{c.key} line</h2>
                </div>
                <span className="text-xs text-muted-foreground">{list.length} active</span>
              </header>
              <ul className="p-4 space-y-3">
                {list.map((t) => (
                  <li key={t.id} className="rounded-lg border border-border bg-background p-3 hover:border-primary/40 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold tabular-nums">{t.id}</p>
                        <p className="text-xs text-muted-foreground">{t.table}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[11px] font-medium text-surface-foreground">
                          <Clock className="h-3 w-3" />{t.age}m
                        </span>
                        <span className={[
                          "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
                          t.status === "Ready" ? "bg-primary text-primary-foreground" : "bg-warning/15 text-foreground",
                        ].join(" ")}>{t.status}</span>
                      </div>
                    </div>
                    <ul className="mt-2 text-sm space-y-0.5">
                      {t.items.map((it) => (<li key={it} className="text-foreground/90">• {it}</li>))}
                    </ul>
                    <div className="mt-3 flex gap-2">
                      <button className="flex-1 rounded-md border border-border bg-card py-1.5 text-xs font-medium hover:bg-surface">Bump</button>
                      <button className="flex-1 rounded-md bg-primary py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Mark ready</button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
