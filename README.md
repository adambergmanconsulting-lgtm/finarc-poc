# FinArc POC

Unified financial observability — Next.js proof of concept. Product requirements live under [`docs/current/specifications/SPEC.md`](docs/current/specifications/SPEC.md).

## Quick start

```bash
npm run dev:setup   # install deps (Node 18+)
npm run dev         # http://localhost:3000
```

Or on Windows: `start.bat` or `.\start.ps1`

## Deploy (Vercel CLI)

```bash
npx vercel login          # once
npm run deploy:prod       # build + production deploy
```

See [`docs/current/guides/DEPLOYMENT.md`](docs/current/guides/DEPLOYMENT.md) for details.
