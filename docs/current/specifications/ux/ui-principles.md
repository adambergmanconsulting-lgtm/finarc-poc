# UI principles — FinArc POC

**Last Updated:** March 2026  
**Status:** Active  
**Purpose:** UX and UI rules for a **finance observability** PoC: scannable KPIs, trustworthy numbers, lever-driven scenarios, and exports. Adapts the *style* of a lean UI doc (clarity, tokens, contrast, typography) from a larger product without domain-specific CV/editor rules.

**Canonical for visuals:** [theme-and-tokens.md](theme-and-tokens.md). Product scope: [../SPEC.md](../SPEC.md).

> **For AI:** Read when changing dashboards, charts, lever UI, copy, or density. For color variable names and file layout, read `theme-and-tokens.md` first.

---

## Core philosophy

| Principle | Rule |
|-----------|------|
| **Clarity over density** | Fewer, stronger metrics on first screen; drill-down for detail |
| **Numbers are honest** | Same formulas in UI, comparison, and export; show units ($, %, per delivery) |
| **State is visible** | Baseline vs scenario A/B clearly labeled; levers show current value |
| **User-owned scenarios** | User adjusts levers and saves; system proposes, user decides |
| **Scannable in seconds** | Executive header answers: spend, margin, top anomaly, sustainability cue (per spec) |
| **Copy is a budget** | Short labels; tooltips for definitions; avoid paragraph blocks in primary dashboard |

---

## Finance & dashboard patterns

- **Primary KPIs:** Digital margin, cost per delivery, MoM spend change — largest type in header region; trends via sparkline or small multiples, not clutter.
- **Multi-axis trends:** Revenue vs spend vs unit cost — distinct series colors from `--chart-*` tokens; legend readable on dark background.
- **Anomalies:** One prominent alert line (e.g., AI waste spike) with **actionable** wording, not generic “something changed.”
- **Lever playground:** Controls are **immediate** — moving a slider updates projections without blocking modals; optional debounce for heavy charts only.
- **Scenario compare:** Baseline vs A vs B — same columns and units; diff-friendly layout.
- **Export:** One-page report reflects on-screen numbers; user must trust parity with the dashboard.

---

## Visual style (PoC)

**Mood:** Nordic-inspired **dark** theme — calm, professional, low glare for long analysis sessions (see spec: Nordic dark, tooltips, scannability).

**Chrome budget**

- Use **cards and borders** to group; avoid stacking many colored pills on one row.
- **Semantic color** for money at risk / savings (positive vs negative) — align with theme tokens, not ad hoc greens/reds per component.
- **Charts:** Prefer restrained gridlines and readable axis labels; tooltips on hover for exact values.

**Hierarchy via typography**

- KPI values: largest; labels smaller and muted via token (`--muted-foreground`).
- Section titles: consistent scale (e.g. `text-sm` / `text-base` font-medium).
- Long text: keep in export preview or collapsible “methodology,” not the main dashboard.

**Interaction**

- Primary actions (export, save scenario) use `--primary`; secondary actions use `--secondary` / outline variants.
- Focus states visible for keyboard users (`--ring`).

---

## Accessibility

- Text/background pairs meet **WCAG AA** where feasible (see token doc for contrast checks).
- Charts are not color-only: use **pattern, labels, or tooltip** to distinguish series when possible.
- Motion: prefer **instant** or subtle transitions; avoid distracting animations on number tickers.

---

## Natural language bar

- **Suggestions** react to lever state (per product spec) — dynamic prompts, not static lorem.
- **User stays in control:** NL explains or proposes; applying changes still goes through visible levers or explicit confirm if you add one later.

---

## Anti-drift

- New metric: does it have a **definition** (tooltip or glossary link) and a **single calculation source**?
- New color: **token** first (`theme-and-tokens.md`).
- New chart: uses **shared chart palette** from theme, not one-off hex.

---

## What we reused from CVReady-style UI docs

- **Entry pattern:** Small active doc owned by UX + pointers to theme and product spec.
- **Token discipline:** Prefer semantic CSS variables and Tailwind mapping over scattered literals (CVReady `ui-principles` layout § — adapted here for dark finance UI).
- **Contrast and hierarchy:** Typography-first hierarchy; semantic color for actions and status, not decoration.
- **Lean copy test:** Before adding helper text — does it change a decision or prevent a mistake? If not, skip or collapse.

---

## Related

- [theme-and-tokens.md](theme-and-tokens.md)
- [../../development/coding-hygiene.md](../../development/coding-hygiene.md)
- [../../DOCUMENTATION-INDEX.md](../../DOCUMENTATION-INDEX.md)
