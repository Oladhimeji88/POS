"use client";

import { AppShell } from "@/components/AppShell";
import { Clock } from "lucide-react";

const staff = [
  { name: "Ada Okafor",     role: "Cashier",     status: "On shift", hours: "6h 12m", sales: "₦612k", initials: "AO" },
  { name: "Chukwu Eze",     role: "Bartender",   status: "On shift", hours: "5h 40m", sales: "₦488k", initials: "CE" },
  { name: "Bola Adebayo",   role: "Head Chef",   status: "On shift", hours: "7h 22m", sales: "—",     initials: "BA" },
  { name: "Tunde Adekunle", role: "Ops Manager", status: "On shift", hours: "8h 00m", sales: "—",     initials: "TA" },
  { name: "Zainab Ibrahim", role: "Server",      status: "Break",    hours: "3h 18m", sales: "₦212k", initials: "ZI" },
  { name: "Femi Lawal",     role: "Server",      status: "Off",      hours: "—",      sales: "—",     initials: "FL" },
];

export default function Staff() {
  return (
    <AppShell title="Staff" subtitle="Roles, shifts and performance">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "On shift",   v: "11" },
          { l: "On break",   v: "2" },
          { l: "Total staff",v: "34" },
          { l: "Avg shift",  v: "7h 12m" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{s.v}</p>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {staff.map((p) => (
          <article key={p.name} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary font-semibold">{p.initials}</div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.role}</p>
              </div>
              <span className={[
                "ml-auto rounded-full px-2 py-0.5 text-[11px] font-medium",
                p.status === "On shift" ? "bg-surface text-primary" :
                p.status === "Break"    ? "bg-warning/15 text-foreground" :
                "bg-muted text-muted-foreground",
              ].join(" ")}>{p.status}</span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt className="text-muted-foreground inline-flex items-center gap-1"><Clock className="h-3 w-3" />Hours today</dt>
                <dd className="mt-1 font-semibold">{p.hours}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Sales attributed</dt>
                <dd className="mt-1 font-semibold tabular-nums">{p.sales}</dd>
              </div>
            </dl>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
