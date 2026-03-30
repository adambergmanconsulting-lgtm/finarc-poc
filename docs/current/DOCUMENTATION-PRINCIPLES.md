# FinArc Documentation Principles

**Meta · March 2026** — Keep docs small, stable, and cheap to load in sessions.

---

## Tree

| Path | Role |
|------|------|
| `docs/README.md` | Entry + navigation |
| `docs/current/` | Default read set |
| `docs/current/specifications/ux/` | UI, UX, theme tokens |
| `docs/current/development/` | Coding hygiene, structure |
| `docs/current/specifications/SPEC.md` | Product / PoC requirements (owned separately from engineering how-to) |
| `docs/current/positioning-and-access.md` | Market wedge, realistic integrations, competitive framing |

**Unsure?** Behavior and visuals → `docs/current/`. Product “what we’re building” → `docs/current/specifications/SPEC.md`.

---

## Placement (new content)

| Content | Location |
|---------|----------|
| Product / PoC requirements | `docs/current/specifications/SPEC.md` |
| Positioning, data access, competition | `docs/current/positioning-and-access.md` |
| UX / UI / theme | `docs/current/specifications/ux/` |
| Coding hygiene, repo conventions | `docs/current/development/` |
| Entry / nav | `docs/README.md`, `DOCUMENTATION-INDEX.md` |
| How we write docs | This file |
| Tooling manifests, CI inputs | Next to consumer (`scripts/`, `config/`) — **not** prose under `docs/` unless human-readable |

---

## `docs/` vs tooling

- **`docs/` = humans:** Markdown (images OK). Avoid machine-only registries as the primary artifact here.
- **Tooling may link into `docs/`** for discoverability; keep canonical config in code where appropriate.

---

## Authority when docs disagree

1. Product requirements (`docs/current/specifications/SPEC.md`) → 2. Active UX/theme specs → 3. Coding hygiene → 4. Indexes / this file (navigation only, not product truth).

---

## Rules

One owner doc per concept; link instead of duplicating; delete docs with no distinct job. Spec states: **Draft** · **Active** (matches intent/code) · **Archived** (reference-only).

---

## Update checklist

- Fix links you touched; keep `DOCUMENTATION-INDEX.md` in sync when adding a new “first stop.”
- Theme changes: update `theme/finarc-theme.css` **and** `theme-and-tokens.md` when semantics change.

---

## AI / token discipline

1. **Route before bulk read:** `DOCUMENTATION-INDEX.md` → then open only files needed.
2. **`docs/current/` first** for engineering and UX.
3. **Prefer linking one owner doc** over pasting long specs into chat.
