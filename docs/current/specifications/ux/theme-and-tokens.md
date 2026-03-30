# Theme and design tokens — FinArc POC

**Last Updated:** March 2026  
**Status:** Active  
**Purpose:** Single place to understand **how styling is wired** so the site can be restyled quickly (rebrand, contrast pass, light mode later) without hunting through components.

---

## Visual direction (suggested)

- **Mood:** Nordic-inspired **dark** shell — calm, analytical, low glare for long sessions; avoid neon “crypto” fintech tropes.
- **Palette:** Cool **blue-gray** surfaces, **teal–cyan** primary (actions, links, key series), **muted** secondary text; reserve **green/red** semantics for margin up/down and alerts only.
- **Type:** **Inter** (via `next/font`) for UI; use **tabular figures** (`font-variant-numeric: tabular-nums`) on money and KPI rows when you build tables.
- **Density:** Prefer clear hierarchy (one strong KPI row, then charts) over decorative chrome; finance users scan numbers first.
- **Brand:** `public/finarc-logo.png` and `public/finarc-mark.svg` are **fictional** PoC assets — replace for production.

## Philosophy

- **One source of truth for color and radius:** `app/theme/finarc-theme.css`.
- **Components consume semantic tokens** — e.g. “card,” “primary,” “positive,” “chart-1” — not raw hex in JSX.
- **shadcn/ui alignment:** Variable names follow the usual `--background`, `--foreground`, `--primary`, … pattern so generated components map cleanly.
- **Default mood:** **Nordic-inspired dark** (see [SPEC.md](../SPEC.md) — polish, tooltips, scannability). Light mode can be a second block later (e.g. `:root` vs `.dark` or `data-theme`).

---

## Files (once Next.js + Tailwind exist)

| File | Role |
|------|------|
| `app/theme/finarc-theme.css` | **Edit here first** for global visual changes. Defines `:root` CSS custom properties. |
| `app/globals.css` | `@import` the theme file, then Tailwind layers; optional base typography. |
| `tailwind.config.*` | Map `background`, `foreground`, `chart-*`, etc. to `hsl(var(--…))` or project convention. |
| `components.json` | shadcn — keep `cssVariables: true` so components use tokens. |

**PoC rule:** If you change a color in a component, you probably should add or reuse a variable in `app/theme/finarc-theme.css` instead.

---

## Token table (semantic)

Values live in `app/theme/finarc-theme.css`; this table documents **meaning** so charts, alerts, and KPIs stay consistent.

| Token group | Use |
|-------------|-----|
| `--background`, `--foreground` | App shell, default text |
| `--card`, `--card-foreground` | Panels, scenario cards, summary tiles |
| `--popover`, `--popover-foreground` | Dropdowns, tooltips container |
| `--primary`, `--primary-foreground` | Primary actions (export, save scenario) |
| `--secondary`, `--muted`, `--accent` | Secondary buttons, subtle fills |
| `--destructive` | Irreversible or dangerous actions (use sparingly) |
| `--border`, `--input`, `--ring` | Borders, inputs, focus rings |
| `--positive` / `--negative` (or semantic chart) | **Finance-specific:** margin up / waste or downside (pair with foreground variants if needed) |
| `--chart-1` … `--chart-5` | Tremor / Recharts series; keep distinct and colorblind-safe |

---

## Quick restyle checklist

1. Open `app/theme/finarc-theme.css`.
2. Adjust HSL (or OKLCH) tuples **without** renaming variables unless you update Tailwind mapping and this doc.
3. Verify: focus visible, chart distinction, positive/negative semantics, WCAG contrast on `--foreground` vs `--background` / `--card`.
4. Snapshot or list any **hard-coded** colors still in components — eliminate in favor of tokens.

---

## Related

- [ui-principles.md](ui-principles.md) — layout, density, finance UX
- [../../development/coding-hygiene.md](../../development/coding-hygiene.md) — EPP-03 tokens first
