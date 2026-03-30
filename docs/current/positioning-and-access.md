# Positioning, data access, and competitive wedge

**Last Updated:** March 2026  
**Status:** Active (hypothesis + constraints; refine as you validate with buyers)  
**Purpose:** Tighten **what FinArc can credibly claim** about integrations, “always-on” behavior, and **why customers would choose it** over adjacent tools. Complements [specifications/SPEC.md](specifications/SPEC.md).

---

## 1. What “always on” means here

**Financial and billing data** are rarely truly real-time end-to-end. In practice, “always on” means:

- **Automated ingestion** on a **known schedule** (hourly to daily per source)
- A **stored, queryable layer** the dashboard reads from
- **Transparent freshness** (e.g. “Azure costs through yesterday”)

That is achievable for major clouds and many SaaS/API sources. **Sub-hour latency** is possible for some APIs; **monthly truth** for HR and some marketing actuals is normal. FinArc wins by **labeling latency and source-of-truth**, not by pretending everything is live.

---

## 2. Reasonable access by domain (hypothesis)

Assumptions: customer **grants** API keys, exports, or service principals; **contracts** allow use of data; **internal owners** align on allocation rules. Without that, no product wins.

| Domain | What organizations typically *can* expose | Typical cadence | Notes / constraints |
|--------|-------------------------------------------|-----------------|---------------------|
| **Cloud (e.g. Azure)** | Cost Management exports, APIs, billing account scope | Hours–1 day lag common | Tags, RI/SP amortization, shared subscriptions need **allocation rules** |
| **AI / LLM** | Provider usage APIs (tokens, model, often project/key); invoices for contract true-up | Minutes–daily for API usage | **Multi-provider** and internal vs external use classification may need **policy + tagging** |
| **SaaS** | Vendor admin APIs (seats, usage where exposed); SSO/IDP signals; invoices | Daily–monthly | **Utilization** quality varies widely by vendor |
| **Labor / personnel** | Time tracking, project codes, headcount/plan from HRIS or FP&A feeds; rarely raw payroll in v1 | Weekly–monthly | **PII / comp sensitivity**; finance often wants **aggregated or role-based** load, not raw salaries in a product DB without governance |
| **Marketing** | Ad platforms (Google, Meta, etc.), agency reports, marketing automation | Near-real-time (ads) to monthly (offline) | **Attribution** and **mapping to product/BU** is the hard part, not export |
| **Sustainability / carbon** | Cloud region carbon factors, third-party intensity data; optional real telemetry | Static factors + periodic updates | Often **modeled**, not metered per dollar everywhere |

**PoC stance:** Mock **FOCUS-shaped** data with **documented** intended sources per column so later integrations are a **mapping exercise**, not a redesign.

---

## 3. Where FinArc can win (competitive wedge)

Honest framing: many buyers already have **something** in each category. The wedge is **the combined workflow and narrative**, not “we have a chart.”

| Alternative | What it does well | Where FinArc aims to win |
|-------------|-------------------|---------------------------|
| **Cloud FinOps tools** (e.g. rightsizing, commitment coverage) | Deep cloud mechanics, some chargeback | Rarely ties **AI spend granularity**, **labor**, **marketing**, and **business denominator** (e.g. deliveries) in one **unit economics** story |
| **BI / data warehouse + dashboards** | Flexible reporting | High build cost; weak **opinionated** scenario modeling + **exec one-pager**; often no **LLM-guided** exploration on the same surface |
| **ERP / FP&A models** | Financial truth, period close | **Slow** to reflect fast-moving digital spend; **scenario “what if”** on tech levers is often **Excel**, not interactive |
| **Vendor-native consoles** (Azure portal, OpenAI usage, etc.) | Source of truth for that vendor | **Siloed**; no cross-pillar **margin** view or **exportable** cross-functional narrative |
| **Generic AI assistants** over spreadsheets | Q&A | **No trust** without a **deterministic model** underneath; FinArc assumes **numbers + provenance** first, LLM second |

**Summarized wedge (for pitches):**

1. **Unified digital P&L lens** — pillars that matter for digital margin, not only infra.  
2. **Unit economics + denominator** — cost per outcome, not only total spend.  
3. **AI-native granularity** — model, usage type, internal vs external — as a first-class pillar.  
4. **Scenario loop** — levers, compare, **recommendations tied to $**, not static dashboards.  
5. **FOCUS-aligned normalization** — credible path from PoC mock to **enterprise cost data** practice.  
6. **LLM as explainer** — natural language and narrative export **on top of** governed numbers.

---

## 4. What we should *not* overclaim

- **“Real-time everything”** — replace with **stated refresh** per source.  
- **“Full payroll in the product day one”** — often **aggregated labor cost** or **engineering hours × blended rate** is the v1 reality.  
- **“Replaces FinOps/ERP”** — FinArc is a **decision and narrative layer**; it may **consume** outputs from those systems.  
- **“AI finds savings automatically”** — risks trust; better: **user-driven levers + transparent assumptions**.

---

## 5. PoC vs production

| PoC | Production direction |
|-----|---------------------|
| Mock FOCUS-like JSON + deterministic math | Pipelines from each **approved** source into the same **semantic model** |
| Simulated NL | Grounded NL on **same** store + optional Vercel AI SDK |
| Single-tenant demo | SSO, RBAC, audit logs, data residency as needed |

---

## Related

- [specifications/SPEC.md](specifications/SPEC.md) — product requirements and user stories  
- [DOCUMENTATION-PRINCIPLES.md](DOCUMENTATION-PRINCIPLES.md) — doc authority
