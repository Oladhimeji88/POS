"use client";

import { AppShell } from "@/components/AppShell";
import { Download, TrendingUp } from "lucide-react";

const sevenDay = [62, 71, 58, 84, 92, 78, 96];
const days = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];

const topItems = [
  { name: "Jollof Rice",    sold: 142, revenue: 639000 },
  { name: "Suya Platter",   sold: 98,  revenue: 764400 },
  { name: "Grilled Tilapia",sold: 76,  revenue: 699200 },
  { name: "Mojito",         sold: 62,  revenue: 297600 },
  { name: "Heineken",       sold: 184, revenue: 404800 },
];

export default function Reports() {
  const max = Math.max(...sevenDay);
  return (
    <AppShell title="Reports" subtitle="Sales, performance and trends">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <header className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Sales — last 7 days</h2>
              <p className="text-xs text-muted-foreground">₦14.8M total · daily breakdown</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-xs font-medium text-surface-foreground"><TrendingUp className="h-3.5 w-3.5" />+18.2%</div>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-surface"><Download className="h-3.5 w-3.5" />Export</button>
            </div>
          </header>
          <div className="mt-6 grid grid-cols-7 gap-3 items-end h-56">
            {sevenDay.map((v, i) => (
              <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full rounded-md bg-primary/15 hover:bg-primary transition-colors" style={{ height: `${(v / max) * 100}%` }} title={`${v * 25}k`} />
                <span className="text-[10px] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Sales mix</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { name: "Food",   v: 58 },
              { name: "Drinks", v: 26 },
              { name: "Events", v: 12 },
              { name: "Other",  v: 4 },
            ].map((m) => (
              <li key={m.name}>
                <div className="flex justify-between">
                  <span className="font-medium">{m.name}</span>
                  <span className="tabular-nums text-muted-foreground">{m.v}%</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${m.v}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <header className="p-5 pb-3">
          <h2 className="text-sm font-semibold">Top-selling items — this week</h2>
        </header>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-y border-border bg-surface/40">
              <th className="font-medium px-5 py-2.5">Item</th>
              <th className="font-medium px-5 py-2.5 text-right">Units sold</th>
              <th className="font-medium px-5 py-2.5 text-right">Revenue</th>
              <th className="font-medium px-5 py-2.5">Share</th>
            </tr>
          </thead>
          <tbody>
            {topItems.map((t) => {
              const maxRev = Math.max(...topItems.map((i) => i.revenue));
              const pct = (t.revenue / maxRev) * 100;
              return (
                <tr key={t.name} className="border-b border-border last:border-0 hover:bg-surface/50">
                  <td className="px-5 py-3 font-medium">{t.name}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{t.sold}</td>
                  <td className="px-5 py-3 text-right tabular-nums font-medium">₦{t.revenue.toLocaleString()}</td>
                  <td className="px-5 py-3 w-64">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
