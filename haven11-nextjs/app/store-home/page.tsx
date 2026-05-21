"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, XCircle, ClipboardList } from "lucide-react";
import { AppShell } from "@/components/AppShell";

interface Req {
  id: string;
  from: string;
  by: string;
  items: number;
  total: string;
  age: string;
  urgent: boolean;
  status: "Pending" | "Approved" | "Rejected";
}

const seedReqs: Req[] = [
  { id: "REQ-041", from: "Kitchen", by: "Amara K.",   items: 7, total: "₦82,000", age: "14 min ago", urgent: true,  status: "Pending" },
  { id: "REQ-040", from: "Bar",     by: "Chukwu B.",  items: 4, total: "₦36,500", age: "1 hr ago",   urgent: false, status: "Pending" },
  { id: "REQ-039", from: "Lounge",  by: "Fatima L.",  items: 2, total: "₦12,000", age: "2 hrs ago",  urgent: false, status: "Approved" },
];

const lowStock = [
  { name: "White Rum 1L",      cat: "Bar",     onHand: 2, reorder: 6,  unit: "btl" },
  { name: "Tomato Paste 400g", cat: "Kitchen", onHand: 3, reorder: 12, unit: "cans" },
  { name: "Palm Oil 5L",       cat: "Kitchen", onHand: 1, reorder: 4,  unit: "cans" },
  { name: "Tonic Water 330ml", cat: "Bar",     onHand: 4, reorder: 24, unit: "cans" },
];

export default function StoreHome() {
  const [reqs, setReqs] = useState(seedReqs);

  function resolve(id: string, action: "Approved" | "Rejected") {
    setReqs((prev) => prev.map((r) => (r.id === id ? { ...r, status: action } : r)));
  }

  const pending = reqs.filter((r) => r.status === "Pending");
  const done    = reqs.filter((r) => r.status !== "Pending");

  return (
    <AppShell title="Store" subtitle="Eze M. · Inventory & requisitions">
      {lowStock.length > 0 && (
        <div className="rounded-2xl border-2 border-warning/40 bg-warning/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <p className="font-semibold text-sm">{lowStock.length} items running low</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {lowStock.map((item) => (
              <div key={item.name} className="flex items-center justify-between bg-card rounded-xl px-4 py-3 border border-border">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.cat}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-warning tabular-nums">{item.onHand} {item.unit}</p>
                  <p className="text-xs text-muted-foreground">reorder at {item.reorder}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
            Requisitions waiting for you
            {pending.length > 0 && (
              <span className="rounded-full bg-destructive/10 text-destructive text-xs font-bold px-2 py-0.5">
                {pending.length}
              </span>
            )}
          </h2>
        </div>

        {pending.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center">
            <CheckCircle2 className="h-10 w-10 text-primary mx-auto mb-3" strokeWidth={1.25} />
            <p className="font-semibold text-muted-foreground">All requisitions handled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pending.map((r) => (
              <div
                key={r.id}
                className={`rounded-2xl border-2 p-5 ${r.urgent ? "border-destructive/30 bg-destructive/5" : "border-border bg-card"}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-base">{r.from}</p>
                      {r.urgent && (
                        <span className="text-xs bg-destructive/10 text-destructive font-semibold px-2 py-0.5 rounded-full">Urgent</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {r.items} items · {r.total} · by {r.by} · {r.age}
                    </p>
                  </div>
                  <p className="text-sm font-mono text-muted-foreground shrink-0">{r.id}</p>
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={() => resolve(r.id, "Approved")}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors active:scale-95">
                    <CheckCircle2 className="h-4 w-4" /> Approve
                  </button>
                  <button type="button" onClick={() => resolve(r.id, "Rejected")}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-border py-3 text-sm font-bold text-muted-foreground hover:bg-surface hover:text-foreground transition-colors active:scale-95">
                    <XCircle className="h-4 w-4" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {done.length > 0 && (
        <div>
          <h2 className="font-semibold text-sm text-muted-foreground mb-3">Already handled today</h2>
          <div className="space-y-2">
            {done.map((r) => (
              <div key={r.id} className="flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4">
                {r.status === "Approved"
                  ? <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  : <XCircle className="h-5 w-5 text-destructive shrink-0" />
                }
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold">{r.from} — {r.items} items</p>
                  <p className="text-xs text-muted-foreground">{r.id} · {r.age}</p>
                </div>
                <span className={`text-xs font-bold ${r.status === "Approved" ? "text-primary" : "text-destructive"}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppShell>
  );
}
