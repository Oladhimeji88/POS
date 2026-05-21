"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, ShoppingCart, Boxes, ChefHat, Wine,
  ClipboardList, Coins, Users, CalendarRange, HeartHandshake,
  BarChart3, ShieldAlert, Bell, Plus, LogOut,
} from "lucide-react";
import type { ReactNode } from "react";
import { useAuth, type StaffRole } from "@/lib/auth";

type NavItem = {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
};

const allModules: NavItem[] = [
  { href: "/", icon: LayoutDashboard, label: "Overview" },
  { href: "/pos", icon: ShoppingCart, label: "POS" },
  { href: "/inventory", icon: Boxes, label: "Inventory" },
  { href: "/menu", icon: ChefHat, label: "Menu & Recipes" },
  { href: "/kitchen-bar", icon: Wine, label: "Kitchen & Bar" },
  { href: "/requisitions", icon: ClipboardList, label: "Requisitions" },
  { href: "/cashier", icon: Coins, label: "Cashier & Shifts" },
  { href: "/staff", icon: Users, label: "Staff" },
  { href: "/events", icon: CalendarRange, label: "Events" },
  { href: "/customers", icon: HeartHandshake, label: "Customers" },
  { href: "/reports", icon: BarChart3, label: "Reports" },
  { href: "/alerts", icon: ShieldAlert, label: "Alerts & Security" },
];

const roleNav: Record<StaffRole, NavItem[]> = {
  owner: allModules,
  manager: [
    { href: "/manager-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/pos", icon: ShoppingCart, label: "POS" },
    { href: "/inventory", icon: Boxes, label: "Inventory" },
    { href: "/kitchen-bar", icon: Wine, label: "Kitchen & Bar" },
    { href: "/requisitions", icon: ClipboardList, label: "Requisitions" },
    { href: "/cashier", icon: Coins, label: "Cashier & Shifts" },
    { href: "/staff", icon: Users, label: "Staff" },
    { href: "/reports", icon: BarChart3, label: "Reports" },
  ],
  cashier: [
    { href: "/cashier-home", icon: LayoutDashboard, label: "My Shift" },
    { href: "/pos", icon: ShoppingCart, label: "POS" },
  ],
  kitchen: [
    { href: "/kitchen-home", icon: ChefHat, label: "Kitchen Display" },
  ],
  bartender: [
    { href: "/bar-home", icon: Wine, label: "Bar Queue" },
    { href: "/pos", icon: ShoppingCart, label: "POS" },
  ],
  storekeeper: [
    { href: "/store-home", icon: Boxes, label: "Store" },
    { href: "/requisitions", icon: ClipboardList, label: "Requisitions" },
  ],
};

export function AppShell({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const modules = roleNav[user.role];

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex sticky top-0 h-screen w-60 flex-col border-r border-border bg-card shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-border">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
            N
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">NativeID</p>
            <p className="text-[11px] text-muted-foreground">Restaurant OS</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {modules.map((m) => {
            const Icon = m.icon;
            const active = pathname === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={[
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:bg-surface hover:text-foreground",
                ].join(" ")}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.75} />
                {m.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-border p-4 space-y-1">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
              {user.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.title}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/95 px-6 backdrop-blur">
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight leading-tight">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" aria-label="Notifications" className="relative grid h-10 w-10 place-items-center rounded-xl border border-border bg-card hover:bg-surface transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
            </button>
            {(user.role === "owner" || user.role === "manager" || user.role === "cashier") && (
              <button
                type="button"
                onClick={() => router.push("/pos")}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
                New order
              </button>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageSection({ title, description, action, children }: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
