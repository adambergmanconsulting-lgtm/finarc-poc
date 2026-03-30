# FinArc POC — Product Specification

> **Status:** Specification only. Implementation deferred.

---

## 1. Project Overview

**FinArc** is a unified financial observability platform for industrial operations that brings Cloud, AI/LLM, SaaS, Labor, and Sustainability costs into one real-time view — tied directly to business outcomes.

It transforms monthly billing surprises into proactive **Digital Margin** control, letting FP&A and Digital leaders simulate “what-if” decisions and immediately see impact on unit economics (e.g., Cost per Delivery) and forecasted profitability.

### Target Personas (summary)

| Priority | Persona |
|----------|---------|
| **Primary** | FP&A Manager / Director of Digital Value |
| **Secondary** | CFO, CIO/CTO, Head of AI/ML, Operations Director |

#### Primary persona — concrete profile

**Who:** **Elena Vasquez**, *Director of Digital Finance & Value* at a mid-market **industrial / logistics** company (e.g. warehouse automation + SaaS control tower). She sits between **FP&A** and **digital/IT**: she owns **technology spend narratives** for monthly ops reviews and board prep, but she does **not** own engineering roadmaps.

**Context:**

- Tech spend is fragmented across **cloud invoices, AI vendor bills, SaaS renewals, and engineering time** — different owners, different timing. Month-end is a scramble to explain **why margin moved**.
- Her leadership asks: *“Are we spending the right amount on AI and cloud per unit of output?”* not *“What’s our AWS bill?”*

**Goals:**

- Tie **digital spend** to **business outcomes** (deliveries, revenue, unit cost) in one place.
- Move from **reactive** (“surprise in last month’s close”) to **proactive** (“if we shift X, margin moves Y”).
- Produce **credible, shareable** numbers for CFO/CIO conversations — not spreadsheet archaeology.

**Frustrations:**

- **Tool sprawl:** FinOps tools show cloud; finance has SaaS in another place; AI usage is opaque or arrives too late.
- **Weak unit economics:** Hard to defend “we need more Copilot seats” vs “we should rightsize VMs” without a common denominator.
- **Static decks:** Scenarios are rebuilt manually in Excel for every “what if.”

**What “win” looks like for her in the PoC:** In one short session she **spots** a plausible problem, **moves a few levers**, **compares** scenarios, and **exports** a one-pager she could actually forward — without training or a data team in the room.

**Secondary personas (how they use the story):**

| Persona | What they need from FinArc |
|---------|-----------------------------|
| **CFO** | Confidence that tech spend is **governed** and linked to **margin**; audit-friendly narrative. |
| **CIO/CTO** | Alignment between **architecture/cost** choices and **business outcomes**; fewer finance surprises. |
| **Head of AI/ML** | Visibility into **model mix and usage types**; language to justify SLM vs frontier. |
| **Operations Director** | Delivery and cost language stays tied to **operational output** (e.g. per delivery). |

---

### User stories

User stories anchor **scope** and **demo scripts**: each should be demonstrable with mock data. Priority: **P0** = required for PoC success; **P1** = strong differentiator if time allows.

#### Orientation & trust (executive summary)

| ID | Priority | Story |
|----|----------|--------|
| US-01 | P0 | **As** Elena, **I want** a single view of total digital spend, digital margin, and MoM change **so that** I can open a leadership conversation without assembling spreadsheets. |
| US-02 | P0 | **As** Elena, **I want** a clear top anomaly (e.g. AI spike with context) **so that** I know *where to look first* within seconds. |
| US-03 | P1 | **As** Elena, **I want** a compact sustainability/carbon signal tied to regions or workloads **so that** I can mention efficiency without a separate ESG tool. |

#### Diagnosis (where money leaks)

| ID | Priority | Story |
|----|----------|--------|
| US-04 | P0 | **As** Elena, **I want** spend broken down by pillar (Cloud, AI, SaaS, Labor) with enough drill-down **so that** I can explain *what* drives the total. |
| US-05 | P0 | **As** Elena, **I want** AI/LLM costs by model and usage type (e.g. internal chat vs customer query) **so that** I can spot misaligned usage (e.g. premium model for low-value work). |
| US-06 | P1 | **As** Elena, **I want** a trend view of revenue vs tech spend vs cost per delivery **so that** I can see whether spend is outpacing value. |

#### Action & forecasting (levers)

| ID | Priority | Story |
|----|----------|--------|
| US-07 | P0 | **As** Elena, **I want** to adjust a small set of levers (e.g. shift % to smaller models, reduce tech-debt hours, rightsizing/region, egress, SaaS seats) **so that** I can simulate management decisions, not just read history. |
| US-08 | P0 | **As** Elena, **I want** projections to update immediately when I move levers **so that** the scenario feels **interactive and trustworthy**. |
| US-09 | P1 | **As** Elena, **I want** a free-text “custom what-if” field **so that** I can explore a plausible executive question without new UI. |

#### Comparison & narrative

| ID | Priority | Story |
|----|----------|--------|
| US-10 | P0 | **As** Elena, **I want** side-by-side comparison of baseline vs one or two saved scenarios **so that** I can choose a defensible path. |
| US-11 | P0 | **As** Elena, **I want** ranked recommendations that refresh as levers change **so that** I get **next-step ideas**, not only charts. |
| US-12 | P1 | **As** Elena, **I want** natural-language questions and suggested prompts that react to my scenario **so that** exploration feels guided without a static FAQ. |

#### Outcome (communicate upward)

| ID | Priority | Story |
|----|----------|--------|
| US-13 | P0 | **As** Elena, **I want** to export a one-page **Executive Impact Report** (figures + short narrative: quarterly savings, digital margin) **so that** I can share with CFO/CIO without rebuilding a deck. |

**Mapping to the 90-second success metric:** US-01, US-02, US-05, US-07, US-08, US-10, US-13 are the **minimum story set** to hit spot waste → adjust levers → compare → export.

---

### Core Value Proposition (the “Datadog moment”)

> See your entire digital spend like you see infrastructure health — with granular visibility, AI-powered insights, real-time levers, and scenario planning — so every technology dollar clearly drives more deliveries, higher margins, and sustainable growth.

### Key 2026 Differentiators (Built In)

- **Granular AI cost tracking** — tokens by model, prompt type, internal vs external.
- **Strong unit economics focus** — Cost / Revenue per Delivery.
- **Scenario modeling & forecasting** — side-by-side comparisons.
- **FOCUS-compliant data foundation** — easy future real-data integration.
- **Light sustainability angle** — e.g., carbon-aware region/VM choices.
- **Natural language + recommendation engine** — reacts to user changes.

### Success Metric for the PoC

In **under 90 seconds**, a user can:

1. Spot waste (e.g., GPT-4 internal chat spike),
2. Adjust **2–3 levers**,
3. Compare scenarios, and
4. Export a one-page **“Executive Impact Report”** showing quarterly savings + improved Digital Margin.

---

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js 15** |
| Styling | **Tailwind** |
| Components | **shadcn/ui** |
| Finance dashboards | **Tremor** |
| Charts | **Recharts** |
| State | **Zustand** |
| NL / AI | **Simulated LLM** for natural language (upgrade path: Vercel AI SDK) |
| Data | **Mock data** in **FOCUS 1.3–style** schema |

---

## 3. Data Schema

Use a **clean FOCUS-aligned JSON structure** (one month + forecast rows).

### Pillars (richer granularity)

- **Cloud (Azure):** VMs (G5 rightsizing potential + RI/Savings Plan coverage), Storage, Egress, Region (with mock carbon intensity).
- **AI/LLM:** Token usage by model (GPT-4, 4o-mini, o1-mini), usage type (inference, training, internal chat, customer query, code gen), provider.
- **SaaS:** GitHub Copilot seats, Salesforce, Slack — utilization % where possible.
- **Labor:** Engineering hours (Innovation vs Maintenance/Technical Debt) + fully loaded cost.
- **Business outcomes:** Total Deliveries Processed (primary denominator), mock Revenue, optional CO₂e emissions.

Add **lightweight forecast rows** so sliders can project forward realistically.

---

## 4. Key UI Components

### A. Executive Summary Header

- Total Digital Spend (MoM % change)
- **Digital Margin** (Spend ÷ Deliveries or Revenue) — large KPI with trend sparkline and color-coded efficiency score
- **Top anomaly alert** (e.g., “$4,200 AI waste spike — 62% internal chat on GPT-4”)
- **Quick sustainability tile** (e.g., “Carbon intensity: 18% above optimal”)

### B. Trend Dashboard

- Multi-axis chart: **Revenue** vs **Total Tech Spend** vs **Cost per Delivery** (highlight where spend outpaces value).
- **Forecast line** that updates live when levers change.

### C. Natural Language Insights (dynamic & reactive)

- Prompt: “Ask anything about the budget…”
- **Suggested prompts** update from current data/levers (e.g., after switching to SLM: “Your change just reduced projected Q2 AI spend by $11k while maintaining 98% performance.”).

### D. Lever Playground (hero feature)

Real-time, draggable levers with instant recalculation:

| Lever | Examples |
|-------|----------|
| AI / LLM | Switch X% of high-cost inference to smaller models / SLM |
| Labor | Reduce Technical Debt allocation by X% (frees engineering capacity) |
| Cloud | Right-size VMs or move workloads to lower-cost / lower-carbon regions |
| Network | Optimize Egress (CDN/compression simulation) |
| SaaS | Reduce under-utilized seats |
| Custom | Free-text what-if (e.g., “Add 200 more Copilot seats”, “Shift 30% workloads to Azure spot”) |

**Live outputs:**

- Projected **Quarterly Savings** ($ and %)
- New **Digital Margin** & **Cost per Delivery**
- **Side-by-side scenario comparison** — Baseline vs Scenario A vs Scenario B
- **Top 3 Recommendations** panel (refreshes with levers)
- **Save Scenario** + **Export Executive Report** (PDF: charts + narrative)

### E. Additional High-Value Screens

- **Spend by Pillar** — donut + drill-down table
- **Cost Explorer** — filterable FOCUS-style table
- **Recommendations & Insights feed** — prioritized by $ impact
- **Scenario Library** — compare multiple saved what-ifs

---

## 5. Phase 1 Implementation Plan (streamlined for speed)

Priority order:

1. Mock data + Zustand store (levers + calculations)
2. Executive header + trend chart
3. Lever Playground with live updates and scenario compare
4. Natural language bar (rule-based first)
5. Report export + polish (Nordic dark theme, tooltips, scannability)

---

## 6. Out of Scope (for this spec phase)

- Full production implementation
- Real billing/API integrations (FOCUS alignment is structural only for PoC)

---

## 7. Documentation & theme (engineering)

- **Docs hub (CVReady-style entry):** [README.md](../../README.md) — quick start, index, principles, UI/UX, coding hygiene.
- **Theme tokens (quick restyle):** [theme/finarc-theme.css](../../../theme/finarc-theme.css) — CSS variables; details in [ux/theme-and-tokens.md](ux/theme-and-tokens.md).

## 8. Positioning, data access, and competition

- **Market hypothesis, realistic integrations, and wedge vs alternatives:** [../positioning-and-access.md](../positioning-and-access.md).
