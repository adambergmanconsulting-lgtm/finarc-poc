# Quick Start — FinArc POC

**Last Updated:** March 2026  
**Status:** Active  
**Purpose:** High-signal orientation for engineers and AI assistants.

---

## Read Order (Token-Efficient)

1. This file
2. [DOCUMENTATION-INDEX.md](DOCUMENTATION-INDEX.md)
3. [DOCUMENTATION-PRINCIPLES.md](DOCUMENTATION-PRINCIPLES.md)
4. [specifications/ux/ui-principles.md](specifications/ux/ui-principles.md) for UI/UX work
5. [specifications/ux/theme-and-tokens.md](specifications/ux/theme-and-tokens.md) before changing colors or global style
6. Product requirements: [specifications/SPEC.md](specifications/SPEC.md)  
7. Positioning & integrations reality: [positioning-and-access.md](positioning-and-access.md)

---

## Product Snapshot

FinArc is a **unified financial observability** PoC: Cloud, AI/LLM, SaaS, Labor, and Sustainability in one view, tied to business outcomes (e.g., cost per delivery, digital margin). Natural language and **levers** drive scenario comparison and exportable executive summaries.

Boundaries: PoC uses **mock FOCUS-style data** and **simulated** NL; structure should allow swapping in real integrations later.

---

## Engineering Principles (EPP)

Aligned with the hygiene doc; short labels for reviews and commits.

| ID | Principle |
|----|-----------|
| **EPP-01** | **Dedupe:** Single source of truth for copy, theme tokens, mock schema shapes, and non-trivial calculations (prefer one store / module). |
| **EPP-02** | **Modularize:** Extract when a file mixes multiple concerns or grows hard to scan. |
| **EPP-03** | **Tokens first:** No hard-coded hex in components — use CSS variables or Tailwind mapped to `app/theme/finarc-theme.css`. |
| **EPP-04** | **Scenario integrity:** Lever changes and exports must trace back to the same calculation helpers as the UI. |
| **EPP-05** | **Explicit user control:** Levers and NL are user-driven; no silent “optimization” that changes numbers without a visible cause. |
| **EPP-06** | **LLM-friendly structure:** Obvious file names, typed props, thin UI vs. pure `lib/` math. |

---

## Work Sequence

1. Scope the change (product vs. visual vs. data).
2. Open the smallest relevant docs from the index.
3. Implement: tokens + components + store/calculations as per hygiene doc.
4. Update docs only when behavior or token semantics change.

---

## Common Pitfalls

- Drift between **chart colors** and **semantic tokens** (fix in theme file, not per chart).
- Duplicating **KPI formulas** in components instead of shared selectors/helpers.
- Adding **dense finance jargon** without a plain-language label (see UI principles).
- One-off colors instead of **theme variables** — breaks quick restyle.

---

## Quick Repo Map (when app scaffold exists)

| Area | Intended location (convention) |
|------|--------------------------------|
| App shell / routes | `app/` |
| UI components | `components/` |
| Global styles + theme import | `app/globals.css` imports `app/theme/finarc-theme.css` |
| State, scenarios, calculations | `lib/` or `stores/` |
| Mock FOCUS data | `data/` or `lib/mock/` |

Adjust to match actual Next.js layout once created; update this table in the same PR.
