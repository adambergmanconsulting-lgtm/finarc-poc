# FinArc POC Documentation

**Last Updated:** March 2026

## Start Here (Active Path)

This file is entry-only by design.

- Quick orientation: [current/00-QUICK-START.md](current/00-QUICK-START.md)
- Task navigation: [current/DOCUMENTATION-INDEX.md](current/DOCUMENTATION-INDEX.md)
- Documentation policy: [current/DOCUMENTATION-PRINCIPLES.md](current/DOCUMENTATION-PRINCIPLES.md)
- UX/UI principles: [current/specifications/ux/ui-principles.md](current/specifications/ux/ui-principles.md)
- Theme & tokens (quick restyle): [current/specifications/ux/theme-and-tokens.md](current/specifications/ux/theme-and-tokens.md)
- Product / PoC spec (requirements): [current/specifications/SPEC.md](current/specifications/SPEC.md)
- Positioning, data access & competition: [current/positioning-and-access.md](current/positioning-and-access.md)
- Deploy (scripts, Vercel): [current/guides/DEPLOYMENT.md](current/guides/DEPLOYMENT.md)

## Structure

| Path | Role |
|------|------|
| `docs/current/` | Default read set: principles, index, quick start, UX/theme, coding hygiene |
| `docs/current/specifications/ux/` | UI, UX, and visual system |
| `docs/current/development/` | How we structure code (dedupe, boundaries, LLM-friendly patterns) |
| `docs/current/specifications/SPEC.md` | Product / PoC requirements |
| `docs/current/positioning-and-access.md` | Integrations reality, competitive wedge, claims to avoid |

**Future:** A `docs/library/` tree can hold deeper architecture and historical material (pattern borrowed from larger repos; not required for this PoC).

## Token-Efficient Session Starter

1. Read `docs/current/00-QUICK-START.md` (orientation + pitfalls)
2. Pick one task path in `docs/current/DOCUMENTATION-INDEX.md`
3. For UI or styling: `ui-principles.md` + `theme-and-tokens.md`
4. Open only the files needed for that task

## Prompt Template

`Get situated @docs/README.md. Use active docs first; open docs/current/specifications/SPEC.md only for product scope questions.`
