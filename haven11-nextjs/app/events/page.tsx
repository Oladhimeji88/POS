"use client";

import { AppShell } from "@/components/AppShell";
import { Calendar, Users, MapPin } from "lucide-react";

const events = [
  { name: "Adeyemi × Okoro Wedding",  date: "Today · 16:00",        venue: "Garden Hall", guests: 180, package: "Premium",    value: 4200000, status: "Live" },
  { name: "Acme Corp End-of-year",    date: "Fri 22 May · 19:00",   venue: "Lounge",      guests: 60,  package: "Cocktail",   value: 1450000, status: "Confirmed" },
  { name: "Birthday — Tola B.",       date: "Sat 23 May · 20:00",   venue: "Terrace",     guests: 25,  package: "À la carte", value: 620000,  status: "Confirmed" },
  { name: "Product Launch — Greenleaf",date: "Mon 25 May · 18:00",  venue: "Garden Hall", guests: 120, package: "Buffet",     value: 2800000, status: "Deposit pending" },
];

export default function Events() {
  return (
    <AppShell title="Events" subtitle="Bookings, packages and BEOs">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Live now",       v: "1" },
          { l: "Next 7 days",   v: "4" },
          { l: "Pipeline value", v: "₦9.1M" },
          { l: "Avg guest count",v: "96" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{s.v}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        {events.map((e) => (
          <article key={e.name} className="rounded-xl border border-border bg-card p-5 flex flex-wrap items-center gap-5">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold">{e.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground flex flex-wrap items-center gap-3">
                <span>{e.date}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{e.venue}</span>
                <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{e.guests} guests</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{e.package}</p>
              <p className="text-sm font-semibold tabular-nums">₦{e.value.toLocaleString()}</p>
            </div>
            <span className={[
              "rounded-full px-2.5 py-1 text-xs font-medium",
              e.status === "Live"      ? "bg-primary text-primary-foreground" :
              e.status === "Confirmed" ? "bg-surface text-primary" :
              "bg-warning/15 text-foreground",
            ].join(" ")}>{e.status}</span>
            <button className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-surface">Open BEO</button>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
