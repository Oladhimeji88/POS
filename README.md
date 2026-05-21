# NativeID ROS — Restaurant Operating System

A role-based Restaurant Operating System UI prototype built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui (new-york style)
- **Font:** Outfit (Google Fonts)

## Getting Started

```bash
git clone https://github.com/Oladhimeji88/POS.git
cd POS/haven11-nextjs
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

Run these from the `haven11-nextjs/` directory:

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Roles & Login

On the login screen, select a staff avatar and enter the corresponding PIN:

| Role | Name | PIN |
|---|---|---|
| Owner | Seun O. | 0000 |
| Manager | Tunde A. | 1111 |
| Cashier | Ada O. | 2222 |
| Kitchen | Amara K. | 3333 |
| Bartender | Chukwu B. | 4444 |
| Storekeeper | Eze M. | 5555 |

Each role is routed to a tailored dashboard with role-appropriate navigation.

## Module Overview

| Route | Access |
|---|---|
| `/` | Owner dashboard |
| `/manager-dashboard` | Manager |
| `/cashier-home` | Cashier |
| `/kitchen-home` | Kitchen |
| `/bar-home` | Bartender |
| `/store-home` | Storekeeper |
| `/pos` | Owner, Manager, Cashier, Bartender |
| `/inventory` | Owner, Manager, Storekeeper |
| `/kitchen-bar` | Owner, Manager, Kitchen, Bartender |
| `/requisitions` | Owner, Manager, Storekeeper |
| `/cashier`, `/staff`, `/reports` | Owner, Manager |
| `/menu`, `/events`, `/customers`, `/alerts` | Owner |

## Project Structure

```
haven11-nextjs/
├── app/               # Next.js App Router pages
├── components/
│   ├── ui/            # shadcn/ui components
│   ├── AppShell.tsx   # Sidebar layout + nav
│   └── AuthGuard.tsx  # Auth redirect wrapper
├── lib/
│   └── auth.tsx       # Auth context, roles, staff roster
└── app/globals.css    # Tailwind v4 config + design tokens
```

## Notes

- This is a **frontend-only prototype** — all data is hardcoded as static arrays in each page file. There is no backend, API, or database.
- Auth is client-side only; sessions are stored in `localStorage`.
- To add a new shadcn component: `npx shadcn@latest add <component>`
