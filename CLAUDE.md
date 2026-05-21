# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**NativeID ROS** — a Restaurant Operating System UI prototype built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui. The application is currently a frontend-only prototype; all data is hardcoded as static arrays in each page file. There is no backend, API layer, or database.

The active sub-project is `haven11-nextjs/`. The `leaf-layout-craft/` directory is empty.

## Commands

All commands run from `haven11-nextjs/`:

```bash
npm run dev       # start dev server (http://localhost:3000)
npm run build     # production build
npm run lint      # ESLint via next lint
npm run format    # Prettier (write mode)
```

There are no tests configured.

## Architecture

### Auth & roles

`lib/auth.tsx` exports `AuthProvider`, `useAuth`, `STAFF_ROSTER`, and the `StaffRole` type. Auth is entirely client-side: staff select their avatar on `/login`, enter a 4-digit PIN, and the session is stored in `localStorage` under `nativeid_user`.

Six roles exist: `owner`, `manager`, `cashier`, `kitchen`, `bartender`, `storekeeper`. Each role maps to a `defaultRoute` and a filtered set of sidebar nav items.

**Dev login PINs** (hardcoded in `STAFF_ROSTER`):
| Role | Name | PIN |
|---|---|---|
| owner | Seun O. | 0000 |
| manager | Tunde A. | 1111 |
| cashier | Ada O. | 2222 |
| kitchen | Amara K. | 3333 |
| bartender | Chukwu B. | 4444 |
| storekeeper | Eze M. | 5555 |

### Layout system

Every page wraps its content in `<AppShell>` from `components/AppShell.tsx`. `AppShell` renders the sticky sidebar (role-filtered nav from `roleNav`) and the top header. It reads `useAuth()` to determine which nav items to show — pages don't need to handle navigation or auth state themselves.

`AppShell.tsx` also exports two reusable primitives:
- `<PageSection>` — a card container with a title/description header and optional action slot
- `<Stat>` — a single KPI card (label, large value, hint)

`AuthGuard` (wrapping the root layout) redirects unauthenticated users to `/login` and shows a splash while resolving.

### Route → role access

| Route | Accessible by |
|---|---|
| `/` | owner |
| `/manager-dashboard` | manager |
| `/cashier-home` | cashier |
| `/kitchen-home` | kitchen |
| `/bar-home` | bartender |
| `/store-home` | storekeeper |
| `/pos` | owner, manager, cashier, bartender |
| `/inventory` | owner, manager, storekeeper |
| `/kitchen-bar` | owner, manager, kitchen, bartender |
| `/requisitions` | owner, manager, storekeeper |
| `/cashier`, `/staff`, `/reports` | owner, manager |
| `/menu`, `/events`, `/customers`, `/alerts` | owner |

### Styling conventions

Tailwind CSS v4 is configured entirely via `app/globals.css` (no `tailwind.config.js`). The design token palette uses `oklch` color values. Key semantic tokens beyond the shadcn standard:

- `bg-surface` / `text-surface-foreground` — soft green secondary surface, used for hover states, panel backgrounds, and secondary blocks
- `text-warning` / `bg-warning` — amber tones for low-stock and caution states
- `bg-primary` / `text-primary-foreground` — deep green accent (active nav, CTA buttons, badges)

Font is **Outfit** loaded from Google Fonts in the root layout. The custom `shake` keyframe (defined in `globals.css`) is used for PIN error feedback on the login page.

shadcn/ui components live in `components/ui/` and use the **new-york** style. Add new shadcn components with:
```bash
npx shadcn@latest add <component>
```

### Path aliases

`@/*` resolves to the `haven11-nextjs/` root (configured in `tsconfig.json`). Use `@/lib/...`, `@/components/...`, etc. — never use relative paths from deep directories.

### Data pattern

Each module page (inventory, POS, cashier, etc.) declares its own static data array at the top of the file. When adding real API integration, the natural seam is to replace those arrays with `use` / `fetch` calls or a data-fetching hook, while keeping the rendering logic unchanged.
