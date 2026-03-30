# Deployment — FinArc POC

**Purpose:** Reach the same practical outcome as a MiniDataMesh-style repo: **local dev via scripts** and **Vercel hosting** via CLI (no dashboard required after initial login).

---

## Prerequisites

- **Node.js 18+** (see `engines` in `package.json` if added later)
- **npm**
- **Vercel account** (free tier is enough for PoC)

---

## Scripts (same idea as MiniDataMesh)

| Command / file | What it does |
|----------------|----------------|
| `npm run dev:setup` | Node version check + `npm install` |
| `scripts/start.bat` | Windows CMD: install if needed, then `npm run dev` |
| `scripts/start.ps1` | PowerShell: same |
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run deploy` | `next build` then `npx vercel` (preview URL) |
| `npm run deploy:prod` | `next build` then `npx vercel --prod` |

First-time Vercel CLI:

```bash
npx vercel login
```

Then from the repo root:

```bash
npm run deploy:prod
```

Follow prompts to link the project (once per folder). Later deploys are one command.

---

## GitHub → Vercel (optional)

If you prefer **no CLI** for ongoing deploys: connect the GitHub repo in the [Vercel dashboard](https://vercel.com); pushes build automatically. The scripts above still work for **script-only** local and CLI deploys.

---

## Environment variables

Add secrets in the Vercel project settings when the PoC uses APIs or AI keys — not required for the static/mock phase.

---

## Related

- Root `vercel.json` — framework hint for Vercel
- [../DOCUMENTATION-INDEX.md](../DOCUMENTATION-INDEX.md)
