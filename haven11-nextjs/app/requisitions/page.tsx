"use client";

import { AppShell } from "@/components/AppShell";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

const reqs = [
  { id: "REQ-0421", from: "Kitchen", to: "Store",  items: 7,  value: 124500, status: "Pending",  date: "Today 09:12",  by: "Chef Bola" },
  { id: "REQ-0420", from: "Bar",     to: "Store",  items: 4,  value: 86000,  status: "Approved", date: "Today 08:40",  by: "Chukwu" },
  { id: "REQ-0419", from: "Lounge",  to: "Bar",    items: 2,  value: 14200,  status: "Fulfilled",date: "Yesterday",    by: "Ada" },
  { id: "REQ-0418", from: "Kitchen", to: "Store",  items: 9,  value: 188400, status: "Rejected", date: "Yesterday",    by: "Chef Bola" },
  { id: "REQ-0417", from: "Events",  to: "Store",  items: 12, value: 312000, status: "Approved", date: "2 days ago",   by: "Tunde" },
];

const tone: Record<string, string> = {
  Pending:   "bg-warning/15 text-foreground",
  Approved:  "bg-surface text-primary",
  Fulfilled: "bg-primary text-primary-foreground",
  Rejected:  "bg-destructive/10 text-destructive",
};

export default function Requisitions() {
  return (
    <AppShell title="Requisitions" subtitle="Inter-line stock requests & approvals">
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Pending",        v: "1", I: Clock },
          { l: "Approved today", v: "3", I: CheckCircle2 },
          { l: "Fulfilled today",v: "5", I: CheckCircle2 },
          { l: "Rejected",       v: "1", I: XCircle },
        ].map((s) => {
          const I = s.I;
          return (
            <div key={s.l} className="rounded-xl border border-border bg-card p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.l}</p>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{s.v}</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-surface text-primary"><I className="h-5 w-5" /></span>
            </div>
          );
        })}
      </section>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border bg-surface/40">
              <th className="font-medium px-5 py-2.5">Req #</th>
              <th className="font-medium px-5 py-2.5">From → To</th>
              <th className="font-medium px-5 py-2.5">Items</th>
              <th className="font-medium px-5 py-2.5">Value</th>
              <th className="font-medium px-5 py-2.5">Requested by</th>
              <th className="font-medium px-5 py-2.5">When</th>
              <th className="font-medium px-5 py-2.5">Status</th>
              <th className="font-medium px-5 py-2.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {reqs.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0 hover:bg-surface/50">
                <td className="px-5 py-3 font-mono text-xs">{r.id}</td>
                <td className="px-5 py-3">{r.from} → {r.to}</td>
                <td className="px-5 py-3 tabular-nums">{r.items}</td>
                <td className="px-5 py-3 tabular-nums font-medium">₦{r.value.toLocaleString()}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.by}</td>
                <td className="px-5 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-5 py-3"><span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${tone[r.status]}`}>{r.status}</span></td>
                <td className="px-5 py-3 text-right">
                  {r.status === "Pending" ? (
                    <div className="inline-flex gap-1.5">
                      <button className="rounded-md border border-border bg-card px-2.5 py-1 text-xs font-medium hover:bg-surface">Reject</button>
                      <button className="rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90">Approve</button>
                    </div>
                  ) : (
                    <button className="text-xs font-medium text-primary hover:underline">View</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
