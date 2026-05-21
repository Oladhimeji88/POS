"use client";

import { useState } from "react";
import {
  Plus, Minus, Trash2, CreditCard, Banknote, Smartphone,
  CheckCircle2, ChevronLeft, Users,
} from "lucide-react";
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

interface CartItem { name: string; price: number; qty: number; emoji: string }

// ── Static data ────────────────────────────────────────────────────────────────

const INITIAL_TABLES: Table[] = [
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

const STATUS_CONFIG: Record<TableStatus, {
  card: string; badge: string; dot: string; label: string; selectable: boolean;
}> = {
  available: {
    card:      "border-border bg-card hover:border-primary/60 hover:bg-primary/5 cursor-pointer active:scale-[0.97]",
    badge:     "bg-emerald-100 text-emerald-700",
    dot:       "bg-emerald-500",
    label:     "Available",
    selectable: true,
  },
  occupied: {
    card:      "border-amber-200 bg-amber-50/60 cursor-not-allowed",
    badge:     "bg-amber-100 text-amber-700",
    dot:       "bg-amber-500",
    label:     "Occupied",
    selectable: false,
  },
  reserved: {
    card:      "border-blue-200 bg-blue-50/60 cursor-not-allowed",
    badge:     "bg-blue-100 text-blue-700",
    dot:       "bg-blue-500",
    label:     "Reserved",
    selectable: false,
  },
};

const categories = ["All", "Starters", "Mains", "Grill", "Sides", "Drinks", "Cocktails"];

const menuItems = [
  { name: "Jollof Rice",     price: 4500,  cat: "Mains",     emoji: "🍚" },
  { name: "Pounded Yam",     price: 4200,  cat: "Mains",     emoji: "🫙" },
  { name: "Pepper Soup",     price: 5200,  cat: "Starters",  emoji: "🍲" },
  { name: "Suya Platter",    price: 7800,  cat: "Grill",     emoji: "🥩" },
  { name: "Grilled Tilapia", price: 9200,  cat: "Grill",     emoji: "🐟" },
  { name: "Goat Meat Asun",  price: 6800,  cat: "Grill",     emoji: "🍖" },
  { name: "Fried Plantain",  price: 1800,  cat: "Sides",     emoji: "🍌" },
  { name: "Chin Chin",       price: 1500,  cat: "Sides",     emoji: "🍪" },
  { name: "Heineken",        price: 2200,  cat: "Drinks",    emoji: "🍺" },
  { name: "Chapman",         price: 3500,  cat: "Drinks",    emoji: "🍹" },
  { name: "Espresso",        price: 2000,  cat: "Drinks",    emoji: "☕" },
  { name: "Mojito",          price: 4800,  cat: "Cocktails", emoji: "🍸" },
];

const payMethods = [
  { id: "cash",     label: "Cash",     Icon: Banknote,   color: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  { id: "card",     label: "Card",     Icon: CreditCard, color: "border-sky-300 bg-sky-50 text-sky-700" },
  { id: "transfer", label: "Transfer", Icon: Smartphone, color: "border-purple-300 bg-purple-50 text-purple-700" },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function POS() {
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [cat, setCat] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [screen, setScreen] = useState<"tables" | "menu" | "pay" | "done">("tables");
  const [method, setMethod] = useState<string | null>(null);

  const filtered = cat === "All" ? menuItems : menuItems.filter((i) => i.cat === cat);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.qty * i.price, 0);
  const vat = Math.round(subtotal * 0.075);
  const total = subtotal + vat;

  function selectTable(table: Table) {
    setSelectedTable(table);
    setScreen("menu");
  }

  function addItem(item: (typeof menuItems)[0]) {
    setCart((prev) => {
      const existing = prev.find((c) => c.name === item.name);
      if (existing) return prev.map((c) => c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { name: item.name, price: item.price, qty: 1, emoji: item.emoji }];
    });
  }

  function changeQty(name: string, delta: number) {
    setCart((prev) =>
      prev.map((c) => c.name === name ? { ...c, qty: c.qty + delta } : c).filter((c) => c.qty > 0)
    );
  }

  function confirmPayment(methodId: string) {
    setMethod(methodId);
    if (selectedTable) {
      setTables((prev) =>
        prev.map((t) =>
          t.id === selectedTable.id
            ? { ...t, status: "available", guests: undefined, orderTotal: undefined }
            : t
        )
      );
    }
    setScreen("done");
  }

  function reset() {
    setCart([]);
    setMethod(null);
    setSelectedTable(null);
    setScreen("tables");
  }

  // ── Table selection screen ──────────────────────────────────────────────────

  if (screen === "tables") {
    const availCount    = tables.filter((t) => t.status === "available").length;
    const occupiedCount = tables.filter((t) => t.status === "occupied").length;
    const reservedCount = tables.filter((t) => t.status === "reserved").length;

    return (
      <AppShell title="Select a table" subtitle="Choose an available table to begin the order">
        <div className="space-y-6 max-w-3xl">

          {/* Status summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Available", count: availCount,    color: "text-emerald-600" },
              { label: "Occupied",  count: occupiedCount, color: "text-amber-600"   },
              { label: "Reserved",  count: reservedCount, color: "text-blue-600"    },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-4 text-center">
                <p className={`text-3xl font-bold tabular-nums ${s.color}`}>{s.count}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Floor plan by zone */}
          {ZONES.map((zone) => {
            const zoneTables = tables.filter((t) => t.zone === zone);
            return (
              <section key={zone}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-0.5">
                  {zone}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {zoneTables.map((table) => {
                    const cfg = STATUS_CONFIG[table.status];
                    return (
                      <button
                        key={table.id}
                        type="button"
                        disabled={!cfg.selectable}
                        onClick={() => cfg.selectable && selectTable(table)}
                        className={`rounded-2xl border-2 p-4 text-left transition-all ${cfg.card}`}
                      >
                        {/* Header row */}
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-sm font-bold leading-tight">{table.label}</p>
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${cfg.badge}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                          </span>
                        </div>

                        {/* Seats */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3 shrink-0" />
                          <span>{table.seats} seats</span>
                        </div>

                        {/* Occupied details */}
                        {table.status === "occupied" && (
                          <div className="mt-2.5 pt-2.5 border-t border-amber-200 space-y-0.5">
                            <p className="text-xs text-muted-foreground">{table.guests} guests</p>
                            <p className="text-sm font-bold tabular-nums">₦{table.orderTotal?.toLocaleString()}</p>
                          </div>
                        )}

                        {/* Reserved details */}
                        {table.status === "reserved" && (
                          <div className="mt-2.5 pt-2.5 border-t border-blue-200">
                            <p className="text-xs text-muted-foreground leading-relaxed">{table.reservation}</p>
                          </div>
                        )}

                        {/* Tap-to-select hint on available */}
                        {table.status === "available" && (
                          <p className="mt-2.5 text-xs font-medium text-primary/70">Tap to select</p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </AppShell>
    );
  }

  // ── Order complete screen ───────────────────────────────────────────────────

  if (screen === "done") {
    return (
      <AppShell title="Order complete">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-2xl font-bold">Payment received</p>
            <p className="mt-1 text-muted-foreground">
              {selectedTable?.label} · ₦{total.toLocaleString()} via{" "}
              {payMethods.find((m) => m.id === method)?.label}
            </p>
            <p className="mt-2 text-xs font-medium text-emerald-600">
              {selectedTable?.label} is now available
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="rounded-2xl bg-primary px-8 py-3.5 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            New order
          </button>
        </div>
      </AppShell>
    );
  }

  // ── Payment screen ──────────────────────────────────────────────────────────

  if (screen === "pay") {
    return (
      <AppShell title="Choose payment" subtitle={selectedTable?.label}>
        <div className="max-w-sm mx-auto space-y-4">
          <button
            type="button"
            onClick={() => setScreen("menu")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back to cart
          </button>

          <div className="rounded-2xl border border-border bg-card p-5 text-center mb-2">
            <p className="text-sm text-muted-foreground">
              Amount to collect · {selectedTable?.label}
            </p>
            <p className="text-4xl font-bold mt-1 tabular-nums">₦{total.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {cartCount} item{cartCount !== 1 ? "s" : ""} · incl. 7.5% VAT
            </p>
          </div>

          <div className="space-y-3">
            {payMethods.map(({ id, label, Icon, color }) => (
              <button
                key={id}
                type="button"
                onClick={() => confirmPayment(id)}
                className={`flex items-center gap-4 w-full rounded-2xl border-2 p-5 font-semibold text-left transition-all active:scale-[0.98] ${color}`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
                <span className="text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </AppShell>
    );
  }

  // ── Menu + cart screen ──────────────────────────────────────────────────────

  return (
    <AppShell title={selectedTable?.label ?? "New order"} subtitle="Tap items to add · then charge">
      <div className="flex gap-5 items-start">

        {/* Menu grid */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                className={[
                  "px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shrink-0",
                  cat === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground/70 hover:text-foreground hover:bg-surface",
                ].join(" ")}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((item) => {
              const inCart = cart.find((c) => c.name === item.name);
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => addItem(item)}
                  className="relative rounded-2xl border-2 border-border bg-card p-5 text-left hover:border-primary/40 hover:bg-surface transition-all active:scale-[0.97]"
                >
                  {inCart && (
                    <span className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold grid place-items-center">
                      {inCart.qty}
                    </span>
                  )}
                  <span className="text-3xl">{item.emoji}</span>
                  <p className="mt-2 text-sm font-semibold leading-tight">{item.name}</p>
                  <p className="mt-1 text-base font-bold text-primary tabular-nums">₦{item.price.toLocaleString()}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cart sidebar */}
        <aside className="hidden lg:flex w-72 shrink-0 flex-col rounded-2xl border border-border bg-card sticky top-20 overflow-hidden">
          <div className="px-5 pt-4 pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm">
                {cartCount === 0 ? "Cart is empty" : `${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              </h2>
              {selectedTable && (
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {selectedTable.label}
                </span>
              )}
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-12 text-center px-4">
              <p className="text-sm text-muted-foreground">Tap any item on the left to add it here</p>
            </div>
          ) : (
            <ul className="flex-1 overflow-y-auto divide-y divide-border">
              {cart.map((item) => (
                <li key={item.name} className="flex items-center gap-3 px-5 py-3">
                  <span className="text-xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground tabular-nums">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button type="button" aria-label="Remove one" onClick={() => changeQty(item.name, -1)}
                      className="grid h-7 w-7 place-items-center rounded-lg border border-border hover:bg-surface transition-colors">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-sm font-semibold tabular-nums">{item.qty}</span>
                    <button type="button" aria-label="Add one" onClick={() => changeQty(item.name, 1)}
                      className="grid h-7 w-7 place-items-center rounded-lg border border-border hover:bg-surface transition-colors">
                      <Plus className="h-3 w-3" />
                    </button>
                    <button type="button" aria-label="Remove item" onClick={() => changeQty(item.name, -item.qty)}
                      className="ml-1 grid h-7 w-7 place-items-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t border-border p-5 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">₦{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT 7.5%</span>
                <span className="tabular-nums">₦{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-1">
                <span>Total</span>
                <span className="tabular-nums">₦{total.toLocaleString()}</span>
              </div>
            </div>
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={() => setScreen("pay")}
              className="w-full rounded-2xl bg-primary py-4 text-base font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Charge ₦{total.toLocaleString()}
            </button>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}
