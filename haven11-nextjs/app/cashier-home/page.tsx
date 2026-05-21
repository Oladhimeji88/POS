"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Banknote, CreditCard, Smartphone, Users } from "lucide-react";
import { AppShell } from "@/components/AppShell";

// ── Types ──────────────────────────────────────────────────────────────────────

type TableStatus = "available" | "occupied" | "reserved";

interface Table {
  id: string;
  label: string;
  zone: string;
  seats: number;
  status: TableStatus;
  guests?: number;
  orderTotal?: number;
  reservation?: string;
}

// ── Static data ────────────────────────────────────────────────────────────────

const TABLES: Table[] = [
  { id: "T1",  label: "Table 1",  zone: "Indoor",  seats: 2, status: "available" },
  { id: "T2",  label: "Table 2",  zone: "Indoor",  seats: 4, status: "occupied",  guests: 3, orderTotal: 48200 },
  { id: "T3",  label: "Table 3",  zone: "Indoor",  seats: 4, status: "occupied",  guests: 4, orderTotal: 76500 },
  { id: "T4",  label: "Table 4",  zone: "Indoor",  seats: 6, status: "reserved",  reservation: "19:30 · Tola Bankole" },
  { id: "T5",  label: "Table 5",  zone: "Indoor",  seats: 2, status: "available" },
  { id: "T6",  label: "Table 6",  zone: "Indoor",  seats: 4, status: "available" },
  { id: "T7",  label: "Table 7",  zone: "Indoor",  seats: 8, status: "occupied",  guests: 7, orderTotal: 122400 },
  { id: "T8",  label: "Table 8",  zone: "Indoor",  seats: 4, status: "available" },
  { id: "T9",  label: "Table 9",  zone: "Terrace", seats: 4, status: "available" },
  { id: "T10", label: "Table 10", zone: "Terrace", seats: 6, status: "occupied",  guests: 5, orderTotal: 94800 },
  { id: "T11", label: "Table 11", zone: "Terrace", seats: 4, status: "reserved",  reservation: "20:00 · Nkechi A." },
  { id: "T12", label: "Table 12", zone: "Terrace", seats: 2, status: "available" },
  { id: "BAR", label: "Bar",      zone: "Bar",     seats: 8, status: "occupied",  guests: 4, orderTotal: 38600 },
];

const ZONES = ["Indoor", "Terrace", "Bar"] as const;

const STATUS_CONFIG: Record<TableStatus, { card: string; dot: string; badge: string; label: string }> = {
  available: { card: "border-emerald-200 bg-emerald-50/40", dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700", label: "Free" },
  occupied:  { card: "border-amber-200 bg-amber-50/50",    dot: "bg-amber-500",   badge: "bg-amber-100 text-amber-700",   label: "Occupied" },
  reserved:  { card: "border-blue-200 bg-blue-50/40",      dot: "bg-blue-500",    badge: "bg-blue-100 text-blue-700",    label: "Reserved" },
};

const recentOrders = [
  { id: "#A-2418", table: "Table 6",  items: 6,  total: "₦48,200",  method: "Card",     time: "2 min ago" },
  { id: "#A-2417", table: "Table 2",  items: 3,  total: "₦22,500",  method: "Cash",     time: "8 min ago" },
  { id: "#A-2416", table: "Table 10", items: 4,  total: "₦31,000",  method: "Transfer", time: "12 min ago" },
  { id: "#A-2415", table: "Table 7",  items: 22, total: "₦310,000", method: "Card",     time: "18 min ago" },
  { id: "#A-2414", table: "Bar",      items: 5,  total: "₦41,800",  method: "Cash",     time: "24 min ago" },
];

const methodBadge: Record<string, string> = {
  Card:     "bg-sky-100 text-sky-700",
  Cash:     "bg-emerald-100 text-emerald-700",
  Transfer: "bg-purple-100 text-purple-700",
};

// ── Component ──────────────────────────────────────────────────────────────────

export default function CashierHome() {
  const router = useRouter();

  const availCount    = TABLES.filter((t) => t.status === "available").length;
  const occupiedCount = TABLES.filter((t) => t.status === "occupied").length;
  const reservedCount = TABLES.filter((t) => t.status === "reserved").length;
  const totalCovers   = TABLES.filter((t) => t.status === "occupied").reduce((s, t) => s + (t.guests ?? 0), 0);

  return (
    <AppShell title="My Shift" subtitle="Ada O. · 08:00 – 16:00">

      {/* New order CTA */}
      <button
        type="button"
        onClick={() => router.push("/pos")}
        className="w-full rounded-3xl bg-primary p-8 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-primary/90 transition-colors group text-primary-foreground"
      >
        <div className="text-left">
          <p className="text-xl font-bold">New Order</p>
          <p className="text-sm text-primary-foreground/70 mt-0.5">Select a table and start taking orders</p>
        </div>
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-foreground/15 group-hover:bg-primary-foreground/20 transition-colors shrink-0">
          <ShoppingCart className="h-8 w-8" strokeWidth={1.5} />
        </div>
      </button>

      {/* Table status overview */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-sm font-semibold">Floor plan</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{totalCovers} covers seated across {occupiedCount} tables</p>
          </div>
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {availCount} free
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {occupiedCount} occupied
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              {reservedCount} reserved
            </span>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {ZONES.map((zone) => {
            const zoneTables = TABLES.filter((t) => t.zone === zone);
            return (
              <div key={zone}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{zone}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {zoneTables.map((table) => {
                    const cfg = STATUS_CONFIG[table.status];
                    return (
                      <div
                        key={table.id}
                        className={`rounded-xl border-2 p-3.5 ${cfg.card}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-bold">{table.label}</p>
                          <span className={`h-2 w-2 rounded-full ${cfg.dot} shrink-0`} />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                          <Users className="h-3 w-3 shrink-0" />
                          <span>{table.seats} seats</span>
                        </div>
                        {table.status === "occupied" && (
                          <div className="mt-1.5 pt-1.5 border-t border-amber-200">
                            <p className="text-xs text-muted-foreground">{table.guests} guests</p>
                            <p className="text-xs font-bold tabular-nums mt-0.5">₦{table.orderTotal?.toLocaleString()}</p>
                          </div>
                        )}
                        {table.status === "reserved" && (
                          <p className="mt-1.5 pt-1.5 border-t border-blue-200 text-xs text-muted-foreground leading-snug">
                            {table.reservation}
                          </p>
                        )}
                        {table.status === "available" && (
                          <button
                            type="button"
                            onClick={() => router.push("/pos")}
                            className="mt-1.5 text-xs font-semibold text-primary hover:underline"
                          >
                            Seat guests →
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shift KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Cash",     value: "₦312,400", Icon: Banknote,    color: "text-emerald-600" },
          { label: "Card",     value: "₦528,900", Icon: CreditCard,  color: "text-sky-600" },
          { label: "Transfer", value: "₦189,200", Icon: Smartphone,  color: "text-purple-600" },
          { label: "Orders",   value: "47",        Icon: ShoppingCart,color: "text-primary" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5">
            <k.Icon className={`h-5 w-5 mb-3 ${k.color}`} strokeWidth={1.75} />
            <p className="text-xl font-bold tabular-nums">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold text-sm">Recent orders</h2>
        </div>
        <ul className="divide-y divide-border">
          {recentOrders.map((o) => (
            <li key={o.id} className="flex items-center gap-4 px-6 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold tabular-nums">{o.id}</p>
                  <span className="text-xs text-muted-foreground">{o.table}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${methodBadge[o.method]}`}>
                    {o.method}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{o.items} items · {o.time}</p>
              </div>
              <p className="text-base font-bold tabular-nums shrink-0">{o.total}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Cash drawer */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold text-sm mb-5">Cash drawer</h2>
        <div className="space-y-3 text-sm">
          {[
            { label: "Opening float",  value: "₦50,000" },
            { label: "Cash received",  value: "+ ₦312,400" },
            { label: "Petty cash out", value: "− ₦8,500" },
            { label: "Expected total", value: "₦353,900", bold: true },
          ].map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-muted-foreground">{r.label}</span>
              <span className={r.bold ? "text-base font-bold" : "font-medium tabular-nums"}>{r.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl bg-primary/5 border border-primary/20 px-5 py-4 flex items-center justify-between">
          <p className="text-sm font-medium text-primary">Variance</p>
          <p className="text-xl font-bold text-primary tabular-nums">₦0.00</p>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-2xl border border-border py-3.5 text-sm font-semibold text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
        >
          Close shift & reconcile
        </button>
      </div>
    </AppShell>
  );
}
