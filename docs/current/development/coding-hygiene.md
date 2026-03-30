# Coding hygiene — FinArc POC

**Last Updated:** March 2026  
**Purpose:** Ongoing bar for clarity and maintainability: deduplication, where things live, refactor discipline, and LLM-friendly patterns. Reuses the *structure* of a larger-project hygiene doc without CVReady-specific paths.

**Related:** [00-QUICK-START.md](../00-QUICK-START.md) (EPP-01–EPP-06), [ui-principles.md](../specifications/ux/ui-principles.md), [theme-and-tokens.md](../specifications/ux/theme-and-tokens.md).

---

## 1. Dedupe and modularize

**Principles:** (1) Single source of truth for copy, config, constants, theme references, and non-trivial math. (2) Keep components, hooks, and modules focused; extract when a file accumulates multiple responsibilities or becomes hard to test.

**What to dedupe**

| Concern | Single source |
|---------|----------------|
| Colors / radii / semantic status (good/bad margin) | `theme/finarc-theme.css` + [theme-and-tokens.md](../specifications/ux/theme-and-tokens.md) |
| KPI definitions (digital margin, cost per delivery, savings) | One module (e.g. `lib/metrics.ts` or `lib/kpi.ts`) consumed by UI and export |
| Mock FOCUS schema + forecast rows | One typed module + JSON or TS objects |
| User-facing strings for levers / tooltips | Optional `lib/copy.ts` or colocated `messages` object — avoid scattering literals |

**Before adding:** Search for an existing helper or token; extend instead of copying.

---

## 2. Where things live (conventions)

Adjust paths when the Next.js app is scaffolded; keep this table updated.

| Thing | Location |
|-------|----------|
| Theme variables (edit for quick restyle) | `theme/finarc-theme.css` |
| Tailwind ↔ CSS variable mapping | `tailwind.config` + `app/globals.css` (once present) |
| Zustand store: levers, baseline vs scenarios | `stores/` or `lib/store/` |
| Pure calculations from mock data + lever deltas | `lib/calculations/` or `lib/finance/` |
| Mock data (FOCUS-shaped) | `data/` or `lib/mock/` |
| Reusable dashboard primitives (KPI tile, lever control) | `components/` |

---

## 3. Large files (touch rule)

When touching a file that has grown unwieldy (e.g. main dashboard page), prefer extracting: chart config, scenario table, lever panel, or NL bar into dedicated components. Update line counts or a short “known large files” list here when you split.

---

## 4. LLM-friendly code

**Goal:** Easy for humans and AI to locate the right file, bound a change, and verify with types.

| Practice | Rule |
|----------|------|
| **Explicit over implicit** | Export types for props and scenario objects; avoid untyped `any` for money and IDs. |
| **Discoverable structure** | Predictable folders (`components/`, `lib/`, `stores/`); consistent naming (`useScenarioStore`, `KpiHeader`). |
| **Thin UI** | Components render; heavy math lives in `lib/` with unit-test-friendly inputs/outputs. |
| **Logs (if any)** | Prefix with `[ModuleName]`; short module comment at top describing role. |
| **Spec → code** | Owner docs list file paths when stable; update when ownership moves. |

---

## 5. What we reused from CVReady-style hygiene

- **Documentation tree:** entry `docs/README.md`, active `docs/current/`, principles + index + quick start.
- **Separation:** “coding hygiene” = how we structure code; “UI principles” = how the product should feel and read.
- **Token discipline:** Prefer design tokens over raw values in components (see CVReady `ui-principles` layout section — adapted for FinArc dark finance UI in our UI doc).

---

## Related

- [DOCUMENTATION-INDEX.md](../DOCUMENTATION-INDEX.md)
