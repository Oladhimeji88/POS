"use client";

import {
  Circle,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";

const kpis = [
  { label: "Sales today", value: "₦2,418,500", delta: "+12.4%", up: true, hint: "vs. yesterday" },
  { label: "Open tabs", value: "14", delta: "₦612k", up: true, hint: "active bar & lounge" },
  { label: "Stock variance", value: "−1.8%", delta: "−0.6pp", up: false, hint: "today, all lines" },
  { label: "Avg ticket time", value: "11m 42s", delta: "−1m 08s", up: true, hint: "kitchen + bar" },
];

const lines = [
  { name: "Kitchen", value: 945000, share: 39 },
  { name: "Bar", value: 812000, share: 33 },
  { name: "Lounge", value: 421500, share: 18 },
  { name: "Events", value: 240000, share: 10 },
];

const alerts = [
  { icon: AlertTriangle, tone: "warn", title: "Low stock — White Rum 1L", meta: "Bar · reorder level reached" },
  { icon: ShieldAlert, tone: "danger", title: "Over-pour pattern detected", meta: "Bartender: Chukwu · −2.4% variance, 3rd day" },
  { icon: CheckCircle2, tone: "ok", title: "Cash reconciled — Ada", meta: "Shift 10:00–18:00 · ₦0 variance" },
  { icon: AlertTriangle, tone: "warn", title: "Requisition awaiting approval", meta: "Kitchen → Store · 7 items" },
];

const orders = [
  { id: "#A-2418", channel: "Dine-in · T12", items: 6, total: "₦48,200", status: "In kitchen", t: "2m" },
  { id: "#A-2417", channel: "Bar tab · 04", items: 3, total: "₦22,500", status: "Open", t: "8m" },
  { id: "#A-2416", channel: "Takeout", items: 4, total: "₦31,000", status: "Ready", t: "12m" },
  { id: "#A-2415", channel: "Event · Wedding", items: 22, total: "₦310,000", status: "Serving", t: "18m" },
  { id: "#A-2414", channel: "Dine-in · T05", items: 5, total: "₦41,800", status: "Paid", t: "24m" },
];

export default function Dashboard() {
  return (
    <AppShell title="Operations overview" subtitle="Wednesday, 20 May 2026 · all lines">
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{k.value}</p>
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className={["inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium", k.up ? "bg-surface text-primary" : "bg-destructive/10 text-destructive"].join(" ")}>
                {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {k.delta}
              </span>
              <span className="text-muted-foreground">{k.hint}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">Revenue by service line</h2>
              <p className="text-xs text-muted-foreground">Today · ₦2,418,500 total</p>
            </div>
            <div className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-xs font-medium text-surface-foreground">
              <TrendingUp className="h-3.5 w-3.5" /> +12.4%
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {lines.map((l) => (
              <div key={l.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{l.name}</span>
                  <span className="tabular-nums text-muted-foreground">₦{l.value.toLocaleString()} · {l.share}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${l.share}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Hourly sales</p>
            <div className="mt-3 grid grid-cols-12 items-end gap-1.5 h-28">
              {[18, 26, 22, 34, 48, 42, 56, 72, 84, 68, 92, 78].map((h, i) => (
                <div key={i} className="rounded-sm bg-primary/15 hover:bg-primary transition-colors" style={{ height: `${h}%` }} title={`${10 + i}:00`} />
              ))}
            </div>
            <div className="mt-2 grid grid-cols-12 text-[10px] text-muted-foreground">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="text-center">{10 + i}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Live alerts</h2>
            <span className="text-xs text-muted-foreground">4 active</span>
          </div>
          <ul className="mt-4 space-y-3">
            {alerts.map((a, i) => {
              const Icon = a.icon;
              const tone = a.tone === "danger" ? "bg-destructive/10 text-destructive" : a.tone === "warn" ? "bg-warning/15 text-foreground" : "bg-surface text-primary";
              return (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border/60 p-3 hover:bg-surface/60 transition-colors">
                  <span className={`grid h-8 w-8 place-items-center rounded-md ${tone}`}><Icon className="h-4 w-4" /></span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-tight">{a.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.meta}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between p-5 pb-3">
            <div>
              <h2 className="text-sm font-semibold">Recent orders</h2>
              <p className="text-xs text-muted-foreground">Live feed across POS, bar tabs and events</p>
            </div>
            <button className="text-xs font-medium text-primary hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-y border-border bg-surface/40">
                  <th className="font-medium px-5 py-2.5">Order</th>
                  <th className="font-medium px-5 py-2.5">Channel</th>
                  <th className="font-medium px-5 py-2.5">Items</th>
                  <th className="font-medium px-5 py-2.5">Total</th>
                  <th className="font-medium px-5 py-2.5">Status</th>
                  <th className="font-medium px-5 py-2.5 text-right">Age</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                    <td className="px-5 py-3 font-medium tabular-nums">{o.id}</td>
                    <td className="px-5 py-3 text-muted-foreground">{o.channel}</td>
                    <td className="px-5 py-3 tabular-nums">{o.items}</td>
                    <td className="px-5 py-3 tabular-nums font-medium">{o.total}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-surface-foreground">
                        <Circle className="h-1.5 w-1.5 fill-primary text-primary" />
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-muted-foreground tabular-nums">{o.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Inventory health</h2>
            <span className="text-xs text-muted-foreground">3 lines</span>
          </div>
          <div className="mt-5 space-y-5">
            {[
              { name: "Kitchen", ok: 142, low: 6, out: 1 },
              { name: "Bar", ok: 88, low: 4, out: 0 },
              { name: "Lounge", ok: 41, low: 2, out: 0 },
            ].map((row) => {
              const total = row.ok + row.low + row.out;
              return (
                <div key={row.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{row.name}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{total} SKUs</span>
                  </div>
                  <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-surface">
                    <div className="bg-primary" style={{ width: `${(row.ok / total) * 100}%` }} />
                    <div className="bg-warning" style={{ width: `${(row.low / total) * 100}%` }} />
                    <div className="bg-destructive" style={{ width: `${(row.out / total) * 100}%` }} />
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>OK {row.ok}</span>
                    <span>Low {row.low}</span>
                    <span>Out {row.out}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
