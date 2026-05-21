"use client";

import { AppShell } from "@/components/AppShell";
import { Search, Filter, Download, AlertTriangle } from "lucide-react";

const stock = [
  { sku: "BAR-0021", name: "White Rum 1L",      line: "Bar",     onHand: 4,  reorder: 12, unit: "btl", status: "Low" },
  { sku: "KIT-0114", name: "Basmati Rice",       line: "Kitchen", onHand: 38, reorder: 20, unit: "kg",  status: "OK" },
  { sku: "BAR-0007", name: "Heineken 330ml",     line: "Bar",     onHand: 96, reorder: 48, unit: "btl", status: "OK" },
  { sku: "KIT-0202", name: "Goat Meat",          line: "Kitchen", onHand: 6,  reorder: 10, unit: "kg",  status: "Low" },
  { sku: "KIT-0145", name: "Tilapia (whole)",    line: "Kitchen", onHand: 0,  reorder: 8,  unit: "pcs", status: "Out" },
  { sku: "LNG-0033", name: "Sparkling Water",    line: "Lounge",  onHand: 24, reorder: 12, unit: "btl", status: "OK" },
  { sku: "BAR-0044", name: "Lime",               line: "Bar",     onHand: 14, reorder: 20, unit: "kg",  status: "Low" },
  { sku: "KIT-0061", name: "Vegetable Oil",      line: "Kitchen", onHand: 22, reorder: 10, unit: "L",   status: "OK" },
];

export default function Inventory() {
  return (
    <AppShell title="Inventory" subtitle="Real-time stock across kitchen, bar & lounge">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Total SKUs",   v: "284" },
          { l: "Low stock",    v: "12",     tone: "text-warning" },
          { l: "Out of stock", v: "1",      tone: "text-destructive" },
          { l: "Stock value",  v: "₦18.4M" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</p>
            <p className={`mt-2 text-2xl font-semibold tracking-tight ${s.tone ?? ""}`}>{s.v}</p>
          </div>
        ))}
      </section>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-border">
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 w-72">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search SKU or item…" className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-surface"><Filter className="h-3.5 w-3.5" />Filter</button>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-surface"><Download className="h-3.5 w-3.5" />Export</button>
            <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">New SKU</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-surface/40">
                <th className="font-medium px-5 py-2.5">SKU</th>
                <th className="font-medium px-5 py-2.5">Item</th>
                <th className="font-medium px-5 py-2.5">Line</th>
                <th className="font-medium px-5 py-2.5 text-right">On hand</th>
                <th className="font-medium px-5 py-2.5 text-right">Reorder</th>
                <th className="font-medium px-5 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((r) => (
                <tr key={r.sku} className="border-b border-border last:border-0 hover:bg-surface/50">
                  <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.sku}</td>
                  <td className="px-5 py-3 font-medium">{r.name}</td>
                  <td className="px-5 py-3 text-muted-foreground">{r.line}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{r.onHand} {r.unit}</td>
                  <td className="px-5 py-3 text-right tabular-nums text-muted-foreground">{r.reorder} {r.unit}</td>
                  <td className="px-5 py-3">
                    <span className={[
                      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                      r.status === "OK"  ? "bg-surface text-primary" :
                      r.status === "Low" ? "bg-warning/15 text-foreground" :
                      "bg-destructive/10 text-destructive",
                    ].join(" ")}>
                      {r.status !== "OK" && <AlertTriangle className="h-3 w-3" />}
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
