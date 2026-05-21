"use client";

import { AppShell } from "@/components/AppShell";
import { AlertTriangle, ShieldAlert, CheckCircle2, Eye } from "lucide-react";

const feed = [
  { icon: ShieldAlert,   tone: "danger", title: "Over-pour pattern detected",     meta: "Bartender: Chukwu · −2.4% variance, 3rd day",      time: "2 min ago" },
  { icon: AlertTriangle, tone: "warn",   title: "Low stock — White Rum 1L",       meta: "Bar · reorder level reached",                       time: "14 min ago" },
  { icon: AlertTriangle, tone: "warn",   title: "Requisition awaiting approval",  meta: "Kitchen → Store · 7 items · ₦124,500",              time: "32 min ago" },
  { icon: ShieldAlert,   tone: "danger", title: "Discount threshold exceeded",    meta: "Server: Femi · 22% on order #A-2401",               time: "48 min ago" },
  { icon: CheckCircle2,  tone: "ok",     title: "Cash reconciled — Ada",          meta: "Shift 10:00–18:00 · ₦0 variance",                   time: "1 hr ago" },
  { icon: AlertTriangle, tone: "warn",   title: "Void rate above baseline",       meta: "Kitchen · 4 voids in last hour (vs. avg 1)",        time: "1 hr ago" },
  { icon: CheckCircle2,  tone: "ok",     title: "Backup completed",               meta: "Local snapshot synced to cloud",                     time: "2 hr ago" },
];

const toneClass = (t: string) =>
  t === "danger" ? "bg-destructive/10 text-destructive border-destructive/20"
  : t === "warn" ? "bg-warning/15 text-foreground border-warning/30"
  : "bg-surface text-primary border-primary/20";

export default function Alerts() {
  return (
    <AppShell title="Alerts & Security" subtitle="Anomalies, approvals and audit trail">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Critical",        v: "2", tone: "text-destructive" },
          { l: "Warnings",        v: "5" },
          { l: "Resolved today",  v: "12", tone: "text-primary" },
          { l: "Open approvals",  v: "3" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className={`mt-2 text-2xl font-semibold tracking-tight ${s.tone ?? ""}`}>{s.v}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <header className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Live alert feed</h2>
            <button className="text-xs font-medium text-primary hover:underline">Mark all read</button>
          </header>
          <ul className="mt-4 space-y-3">
            {feed.map((a, i) => {
              const Icon = a.icon;
              return (
                <li key={i} className={`flex items-start gap-3 rounded-lg border p-3 ${toneClass(a.tone)}`}>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-background/60">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-tight">{a.title}</p>
                    <p className="mt-0.5 text-xs opacity-80">{a.meta}</p>
                  </div>
                  <span className="text-xs opacity-70 whitespace-nowrap">{a.time}</span>
                  <button className="grid h-7 w-7 place-items-center rounded-md border border-border/60 bg-background/60 hover:bg-background"><Eye className="h-3.5 w-3.5" /></button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold">Security posture</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {[
              { name: "2FA enforced on admins",      ok: true },
              { name: "Role-based access reviewed",  ok: true },
              { name: "Audit log streaming",         ok: true },
              { name: "Backup snapshot < 24h",       ok: true },
              { name: "Idle sessions auto-locked",   ok: false },
            ].map((c) => (
              <li key={c.name} className="flex items-center justify-between">
                <span className="text-foreground/90">{c.name}</span>
                <span className={[
                  "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  c.ok ? "bg-surface text-primary" : "bg-warning/15 text-foreground",
                ].join(" ")}>{c.ok ? "OK" : "Review"}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AppShell>
  );
}
