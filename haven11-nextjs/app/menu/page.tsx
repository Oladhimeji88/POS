"use client";

import { AppShell } from "@/components/AppShell";
import { ChefHat, Pencil } from "lucide-react";

const dishes = [
  { name: "Jollof Rice",     category: "Mains",     price: 4500, cost: 1280, margin: 72, recipe: 8 },
  { name: "Suya Platter",    category: "Grill",     price: 7800, cost: 2950, margin: 62, recipe: 6 },
  { name: "Grilled Tilapia", category: "Grill",     price: 9200, cost: 3400, margin: 63, recipe: 7 },
  { name: "Pepper Soup",     category: "Starters",  price: 5200, cost: 1650, margin: 68, recipe: 9 },
  { name: "Pounded Yam",     category: "Mains",     price: 4200, cost: 1100, margin: 74, recipe: 5 },
  { name: "Mojito",          category: "Cocktails", price: 4800, cost: 1200, margin: 75, recipe: 4 },
];

export default function Menu() {
  return (
    <AppShell title="Menu & Recipes" subtitle="Cost, margin and recipe linkage across the menu">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {dishes.map((d) => (
          <article key={d.name} className="rounded-xl border border-border bg-card p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{d.category}</p>
                <h3 className="mt-1 text-base font-semibold">{d.name}</h3>
              </div>
              <button className="grid h-8 w-8 place-items-center rounded-md border border-border hover:bg-surface"><Pencil className="h-3.5 w-3.5" /></button>
            </div>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <div>
                <dt className="text-muted-foreground">Price</dt>
                <dd className="mt-1 font-semibold tabular-nums">₦{d.price.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Cost</dt>
                <dd className="mt-1 font-semibold tabular-nums">₦{d.cost.toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Margin</dt>
                <dd className="mt-1 font-semibold tabular-nums text-primary">{d.margin}%</dd>
              </div>
            </dl>
            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-muted-foreground"><ChefHat className="h-3.5 w-3.5" />{d.recipe} ingredients</span>
              <button className="font-medium text-primary hover:underline">View recipe →</button>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <div className="h-full bg-primary" style={{ width: `${d.margin}%` }} />
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
