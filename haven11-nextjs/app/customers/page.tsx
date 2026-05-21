"use client";

import { AppShell } from "@/components/AppShell";
import { Star } from "lucide-react";

const customers = [
  { name: "Tola Bankole", tier: "Platinum",  visits: 42, spend: 1820000, last: "2d ago",  initials: "TB" },
  { name: "Nkechi A.",    tier: "Gold",      visits: 28, spend: 940000,  last: "1d ago",  initials: "NA" },
  { name: "Femi Okoro",   tier: "Gold",      visits: 21, spend: 712000,  last: "5d ago",  initials: "FO" },
  { name: "Sade Williams",tier: "Silver",    visits: 12, spend: 308000,  last: "1w ago",  initials: "SW" },
  { name: "Acme Corp",    tier: "Corporate", visits: 9,  spend: 2100000, last: "3d ago",  initials: "AC" },
  { name: "Idris M.",     tier: "Silver",    visits: 8,  spend: 184000,  last: "2w ago",  initials: "IM" },
];

const tierColor: Record<string, string> = {
  Platinum:  "bg-foreground text-background",
  Gold:      "bg-warning/20 text-foreground",
  Silver:    "bg-surface text-surface-foreground",
  Corporate: "bg-primary text-primary-foreground",
};

export default function Customers() {
  return (
    <AppShell title="Customers" subtitle="Loyalty, lifetime value and recency">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Active members", v: "1,284" },
          { l: "New this week",  v: "37" },
          { l: "Avg LTV",        v: "₦184k" },
          { l: "Repeat rate",    v: "62%" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{s.v}</p>
          </div>
        ))}
      </section>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <header className="flex items-center justify-between p-5 pb-3">
          <h2 className="text-sm font-semibold">Top customers</h2>
          <button className="text-xs font-medium text-primary hover:underline">View all</button>
        </header>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-y border-border bg-surface/40">
              <th className="font-medium px-5 py-2.5">Customer</th>
              <th className="font-medium px-5 py-2.5">Tier</th>
              <th className="font-medium px-5 py-2.5 text-right">Visits</th>
              <th className="font-medium px-5 py-2.5 text-right">Lifetime spend</th>
              <th className="font-medium px-5 py-2.5">Last seen</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.name} className="border-b border-border last:border-0 hover:bg-surface/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-primary text-xs font-semibold">{c.initials}</div>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${tierColor[c.tier]}`}>
                    <Star className="h-3 w-3" />{c.tier}
                  </span>
                </td>
                <td className="px-5 py-3 text-right tabular-nums">{c.visits}</td>
                <td className="px-5 py-3 text-right tabular-nums font-medium">₦{c.spend.toLocaleString()}</td>
                <td className="px-5 py-3 text-muted-foreground">{c.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
