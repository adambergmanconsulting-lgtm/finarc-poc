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

### Git remote and Vercel (“Failed to parse Git repo URL”)

Vercel only understands **standard** GitHub URLs (`https://github.com/org/repo.git` or `git@github.com:org/repo.git`). A **local SSH host alias** (e.g. `git@github-personal:org/repo.git` from `~/.ssh/config`) is valid for your machine but **not** for Vercel’s Git integration.

**Fix:** set `origin` to HTTPS (or standard `git@github.com:…`), or keep your alias on a second remote (e.g. `personal`). Example:

```bash
git remote set-url origin https://github.com/adambergmanconsulting-lgtm/finarc-poc.git
```

Then in the Vercel project **Settings → Git**, connect the repository again if needed. Pushes: use **Git Credential Manager**, **GitHub CLI** (`gh auth login`), or a **PAT** with HTTPS.

---

## Environment variables

Add secrets in the Vercel project settings when the PoC uses APIs or AI keys — not required for the static/mock phase.

---

## Related

- Root `vercel.json` — framework hint for Vercel
- [../DOCUMENTATION-INDEX.md](../DOCUMENTATION-INDEX.md)
