"use client";

import { useState } from "react";
import { Users, ShoppingCart, AlertTriangle, CheckCircle2, ClipboardList, Clock, XCircle } from "lucide-react";
import { AppShell } from "@/components/AppShell";

interface Req {
  id: string;
  from: string;
  items: number;
  total: string;
  age: string;
  urgent: boolean;
  status: "Pending" | "Approved" | "Rejected";
}

const seedReqs: Req[] = [
  { id: "REQ-041", from: "Kitchen", items: 7, total: "₦82,000", age: "14 min", urgent: true,  status: "Pending" },
  { id: "REQ-040", from: "Bar",     items: 4, total: "₦36,500", age: "1 hr",   urgent: false, status: "Pending" },
  { id: "REQ-039", from: "Lounge",  items: 2, total: "₦12,000", age: "2 hrs",  urgent: false, status: "Approved" },
];

const shiftStaff = [
  { name: "Ada O.",    role: "Cashier",     status: "Active", since: "08:00" },
  { name: "Amara K.",  role: "Head Chef",   status: "Active", since: "07:00" },
  { name: "Chukwu B.", role: "Bartender",   status: "Active", since: "10:00" },
  { name: "Eze M.",    role: "Storekeeper", status: "Break",  since: "08:00" },
  { name: "Fatima L.", role: "Waitstaff",   status: "Active", since: "09:00" },
  { name: "David K.",  role: "Waitstaff",   status: "Active", since: "09:00" },
];

const alerts = [
  { icon: AlertTriangle, label: "White Rum running low",   meta: "Bar · 2 bottles remaining",    tone: "warn" },
  { icon: AlertTriangle, label: "Tomato paste low",        meta: "Kitchen · 3 cans remaining",   tone: "warn" },
  { icon: CheckCircle2,  label: "Shift handover complete", meta: "Morning → Afternoon · Ada O.", tone: "ok" },
];

export default function ManagerDashboard() {
  const [reqs, setReqs] = useState(seedReqs);

  function resolve(id: string, action: "Approved" | "Rejected") {
    setReqs((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
  }

  const pending = reqs.filter((r) => r.status === "Pending");

  return (
    <AppShell title="Dashboard" subtitle="Tunde A. · Wednesday, 20 May 2026">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "On shift",  value: "12",                    sub: "2 on break",     Icon: Users,        color: "text-primary" },
          { label: "Orders",    value: "9",                     sub: "open right now",  Icon: ShoppingCart, color: "text-foreground" },
          { label: "Approvals", value: String(pending.length),  sub: "need action",     Icon: ClipboardList,color: pending.length > 0 ? "text-destructive" : "text-primary" },
        ].map((k) => (
          <div key={k.label} className="rounded-2xl border border-border bg-card p-5 text-center">
            <k.Icon className={`h-6 w-6 mx-auto mb-2 ${k.color}`} strokeWidth={1.75} />
            <p className="text-3xl font-bold">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="space-y-3">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            Requisitions
            {pending.length > 0 && (
              <span className="rounded-full bg-destructive/10 text-destructive text-xs font-bold px-2 py-0.5">
                {pending.length} pending
              </span>
            )}
          </h2>

          {pending.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center">
              <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" strokeWidth={1.25} />
              <p className="text-sm text-muted-foreground font-medium">All clear</p>
            </div>
          ) : (
            pending.map((r) => (
              <div
                key={r.id}
                className={`rounded-2xl border-2 p-5 ${r.urgent ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold">{r.from}</p>
                      {r.urgent && <span className="text-xs bg-destructive/10 text-destructive font-semibold px-2 py-0.5 rounded-full">Urgent</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.items} items · {r.total} · {r.age} ago</p>
                  </div>
                  <p className="text-xs font-mono text-muted-foreground">{r.id}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => resolve(r.id, "Approved")}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 active:scale-95 transition-all">
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button type="button" onClick={() => resolve(r.id, "Rejected")}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border-2 border-border py-2.5 text-sm font-bold text-muted-foreground hover:bg-surface active:scale-95 transition-all">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="font-semibold text-sm mb-4">Alerts</h2>
            <div className="space-y-3">
              {alerts.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${a.tone === "ok" ? "bg-primary/10 text-primary" : "bg-warning/15 text-warning"}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{a.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-sm">Staff on shift</h2>
            </div>
            <ul className="divide-y divide-border">
              {shiftStaff.map((s) => (
                <li key={s.name} className="flex items-center gap-3 px-5 py-3">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-surface text-xs font-bold shrink-0">
                    {s.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />{s.role} · since {s.since}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === "Active" ? "bg-primary/10 text-primary" : "bg-warning/15 text-foreground"}`}>
                    {s.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
