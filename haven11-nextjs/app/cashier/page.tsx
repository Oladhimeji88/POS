"use client";

import { AppShell } from "@/components/AppShell";

const shifts = [
  { cashier: "Ada O.",    shift: "10:00–18:00", opening: 50000, sales: 612400, expected: 662400, counted: 662400, variance: 0 },
  { cashier: "Bayo K.",   shift: "10:00–18:00", opening: 50000, sales: 488200, expected: 538200, counted: 537400, variance: -800 },
  { cashier: "Tunde A.",  shift: "14:00–22:00", opening: 50000, sales: 724800, expected: 774800, counted: 776000, variance: 1200 },
  { cashier: "Zainab I.", shift: "18:00–02:00", opening: 50000, sales: 392100, expected: 442100, counted: 442100, variance: 0 },
];

export default function Cashier() {
  return (
    <AppShell title="Cashier & Shifts" subtitle="Float, sales and end-of-shift reconciliation">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { l: "Cash in tills",    v: "₦2.4M" },
          { l: "Today's variance", v: "+₦400",  tone: "text-primary" },
          { l: "Active shifts",    v: "4" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className={`mt-2 text-2xl font-semibold tracking-tight ${s.tone ?? ""}`}>{s.v}</p>
          </div>
        ))}
      </section>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <header className="flex items-center justify-between p-5 pb-3">
          <div>
            <h2 className="text-sm font-semibold">Shift reconciliation</h2>
            <p className="text-xs text-muted-foreground">Today · 4 cashiers</p>
          </div>
          <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Close shift</button>
        </header>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-y border-border bg-surface/40">
              <th className="font-medium px-5 py-2.5">Cashier</th>
              <th className="font-medium px-5 py-2.5">Shift</th>
              <th className="font-medium px-5 py-2.5 text-right">Opening</th>
              <th className="font-medium px-5 py-2.5 text-right">Sales</th>
              <th className="font-medium px-5 py-2.5 text-right">Expected</th>
              <th className="font-medium px-5 py-2.5 text-right">Counted</th>
              <th className="font-medium px-5 py-2.5 text-right">Variance</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((s) => (
              <tr key={s.cashier} className="border-b border-border last:border-0 hover:bg-surface/50">
                <td className="px-5 py-3 font-medium">{s.cashier}</td>
                <td className="px-5 py-3 text-muted-foreground">{s.shift}</td>
                <td className="px-5 py-3 text-right tabular-nums">₦{s.opening.toLocaleString()}</td>
                <td className="px-5 py-3 text-right tabular-nums">₦{s.sales.toLocaleString()}</td>
                <td className="px-5 py-3 text-right tabular-nums">₦{s.expected.toLocaleString()}</td>
                <td className="px-5 py-3 text-right tabular-nums font-medium">₦{s.counted.toLocaleString()}</td>
                <td className={`px-5 py-3 text-right tabular-nums font-medium ${s.variance === 0 ? "text-primary" : s.variance < 0 ? "text-destructive" : "text-foreground"}`}>
                  {s.variance > 0 ? "+" : ""}₦{s.variance.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
