# FinArc POC — Product Specification

> **Status:** Specification ready for implementation — follow **§5** (Phase 1 + **PoC simplification guardrails**).

---

## 1. Project Overview

**FinArc** is a unified view of **digital technology spend** for industrial operations — Cloud, AI/LLM, SaaS, Labor, and light Sustainability — **expressed in financial terms** (margin, unit economics, scenarios) and tied to **business outcomes**, not to service graphs alone.

It transforms monthly billing surprises into proactive **Digital Margin** control, letting **FP&A and finance-facing digital leaders** simulate “what-if” decisions and see impact on **unit economics** (e.g., Cost per Delivery) and **forecasted profitability**, with **cost-optimization** storylines they can carry into **quarterly shareholder reporting** and **investor-facing** materials (e.g. **earnings** releases, **investor presentations**, and **regulatory** or **statutory** disclosure where required).

#### Positioning: finance profiles first, not “cost telemetry for engineering”

The **primary audience** is **financial and investor-facing profiles**: FP&A, digital finance / value, CFO office, **investor relations**, and leaders who sign off on **external** narratives. The PoC must feel like a **management and reporting** tool — **economic tradeoffs**, **scenarios**, and **defensible numbers** for **stakeholders** and **quarterly** cadence.

It is **deliberately not** aimed at the same job as **application performance monitoring (APM)**, **infrastructure observability**, or **engineering-first cost views** (the class of tools used to trace services, hosts, and latency). Those answer *how systems run* and *where resources go technically*; FinArc answers whether **spend is economically justified** relative to **output**, **margin**, and **disclosure**, and whether **management** can **simulate** and **explain** choices. **Showing costs** is necessary but **insufficient** — the product must **cater to finance mental models** (margin, efficiency, forward view, **shareholder**-ready framing), not replace **SRE** or **platform** dashboards.

#### Financial perspectives to embody (differentiation from the technical lens)

The PoC should **signal** these finance-side concerns — even when data is **mock** — so the story is clearly **not** “infra metrics with dollars attached.”

| Perspective | Finance-led question (FinArc direction) | Typical technical / FinOps tool emphasis |
|-------------|----------------------------------------|------------------------------------------|
| **P&L & margin** | How does this spend move **operating margin**, **OpEx**, or **unit contribution**? | Utilization, rightsizing, **cost per service** |
| **Budget / forecast / actuals** | **Variance** to plan — **rate vs volume vs mix** — and what to **reforecast** | Month-over-month **bill** deltas, **tag** compliance |
| **Management reporting** | **Drivers** leadership can repeat in **operating reviews** and **board** packs | **Dashboards** for engineering owners |
| **Unit economics** | **Cost and revenue per outcome** (e.g. delivery, order) — **economic** efficiency | **Cost per workload**, **per cluster**, **per region** |
| **Allocation & accountability** | **Showback / chargeback** narrative — who consumes what **budget** | **Accounts** and **projects** in cloud consoles |
| **Total cost of ownership** | **Tradeoffs across pillars** (AI vs cloud vs SaaS vs labor) | **Siloed** views per **vendor** or **platform** |
| **Procurement & commitments** | **Contracts**, **seats**, **reservations** / **savings instruments** as **financial** levers | **On-demand** consumption, **autoscaling** |
| **Investor & statutory narrative** | **External-grade** explanation — **quarterly** / **earnings** storyline | **Internal** optimization only |
| **Governance & auditability** | **Defensible** numbers, **reproducible** logic for **CFO** / **audit** scrutiny | **Telemetry** trails, **change** history for **ops** |
| **Strategic & multi-period planning** | **Bridge** from **baseline** to a **stated target** (e.g. **digital margin**, **OpEx** run-rate on tech) over a chosen **horizon** — **months**, **quarters**, or **multi-year** — in line with **rolling forecast** and **long-range plan (LRP)** conversations | **Current-period** or **next-invoice** optimization only |
| **Cash vs accrual (treasury timing)** | When spend **hits cash** vs **accrual** **recognition** — **liquidity**, **payment** timing, **treasury** **visibility** | **Usage** and **invoice** dates **without** **cash** **vs** **book** **split** |
| **COGS vs SG&A** | **Financial statement** **mapping** — **cost of revenue** vs **selling, general & administrative (SG&A)** — **gross margin** vs **operating** **efficiency** | **Resource** and **tag** views **without** **GAAP**-style **line** **placement** |
| **Segment / BU P&L** | **Business unit**, **region**, or **product** **segment** **profitability** and **allocated** digital **burden** | **Consolidated** or **account**-level **tech** **spend** **without** **management** **segment** **reporting** |
| **Transfer pricing** | **Intercompany** **charges** for **shared** platforms — **arm’s-length** **documentation** and **allocation** **keys** | **Single** **legal entity** **billing** and **cost** **accounts** **only** |
| **Tax** | **Capitalization** vs **expense**, **R&D**-relevant **classification**, **permanent establishment (PE)** **exposure** from **where** work runs | **Pre-tax** **run-rates**; **region** as **latency**, not **tax** **nexus** |
| **Working capital** | **Vendor** **terms** (**prepay**, **annual** **contracts**, **DPO**), **cash** **impact** of **renewals** and **commitments** | **Unit** **price** and **consumption** **without** **payment** **terms** or **balance** **sheet** **timing** |

**Technical** tools optimize **reliability**, **utilization**, and **architecture** cost; **financial** profiles optimize **margin**, **accountability**, **planning**, and **disclosure**. FinArc should read as the **second** camp.

**Note:** Rows **Cash** through **Working capital** are **future-depth** lenses — **signal** in **positioning** and **roadmap**; the **PoC** stays **light** and does **not** implement full **tax**, **transfer pricing**, or **statutory** **segment** **engines**.

#### Planning horizon & target projections (FP&A-style)

**Astrid** needs to **tune strategies** (the same **levers** — AI mix, labor allocation, cloud posture, SaaS, etc.) not only for the **next close** or **quarter** but to **steer toward a projection** over **time**: e.g. **where digital margin or spend should land** in **several quarters** or **a couple of years**, consistent with **board** and **FP&A** **targets**. That is **not** the same as **engineering capacity** planning; it is **financial** **pathing**: *if we adopt this mix of moves, how close do we get to the **stated outcome** on what **horizon**?*

The PoC should **accommodate** this by:

- A selectable **planning horizon** (e.g. **next few months**, **4–8 quarters**, or a **multi-year** stub) driving how **forecast** curves and **aggregates** are shown.
- Optional **target** inputs (**margin**, **total digital spend**, **cost per delivery**) so scenarios show a **bridge** / **gap-to-target** story — **tactical** lever changes linked to **strategic** **projection**.
- **Mock** **trajectory** only (no pretense of precision): enough to **demo** **rolling-forecast** and **LRP**-aligned **narrative**, not a full **driver-based** **integrated financial model**.

This extends **US-07** / **US-08** without replacing the **90-second** **tactical** demo; full **horizon** + **target** depth is **P1** (see **US-14**).

### Target Personas (summary)

| Priority | Persona |
|----------|---------|
| **Primary** | FP&A Manager / Director of Digital Value |
| **Secondary** | CFO, Corporate Finance / Controller, CIO/CTO, Head of AI/ML, Operations Director |

#### Primary persona — concrete profile

**Who:** **Astrid Lindqvist**, *Director of Digital Finance & Value* at a mid-market **industrial / logistics** company (e.g. warehouse automation + SaaS control tower). She sits between **FP&A** and **digital/IT**: she owns **technology spend narratives** for monthly operating reviews, **quarterly reporting** to **shareholders** and **investors** (including **investor relations** and **earnings** materials), and board prep, but she does **not** own engineering roadmaps.

**Context:**

- Tech spend is fragmented across **cloud invoices, AI vendor bills, SaaS renewals, and engineering time** — different owners, different timing. Month-end is a scramble to explain **why margin moved**.
- Each **quarter**, she must tie **cost optimization** and **operating efficiency** in digital spend to the **shareholder** and **investor** narrative — defensible in **quarterly reporting** and **earnings-related** communications, not only on internal dashboards.
- Her leadership asks: *“Are we spending the right amount on AI and cloud per unit of output?”* not *“What’s our AWS bill?”*

**Goals:**

- Tie **digital spend** to **business outcomes** (deliveries, revenue, unit cost) in one place.
- Move from **reactive** (“surprise in last month’s close”) to **proactive** (“if we shift X, margin moves Y”).
- **Shape strategies against a forward projection** — adjust **levers** to **approach** **FP&A** / **board**-level **targets** over a chosen **horizon** (**months** through **multi-year**): **rolling forecast** and **long-range** **alignment**, not only **next month’s** bill.
- Produce **credible, shareable** numbers for **CFO**, **investor relations**, and **CIO** conversations — including **quarterly** reporting cycles — not spreadsheet archaeology.

**Frustrations:**

- **Tool sprawl:** FinOps tools show cloud; finance has SaaS in another place; AI usage is opaque or arrives too late.
- **Weak unit economics:** Hard to defend “we need more Copilot seats” vs “we should rightsize VMs” without a common denominator.
- **Static decks:** Scenarios are rebuilt manually in Excel for every “what if.”

**What “win” looks like for her in the PoC:** In one short session she **spots** a plausible problem, **moves a few levers**, **compares** scenarios, and **exports** a one-pager she could actually forward — without training or a data team in the room.

**Secondary personas (how they use the story):**

| Persona | What they need from FinArc |
|---------|-----------------------------|
| **CFO** | Confidence that tech spend is **governed** and linked to **margin**; **P&L**-credible, **audit**-friendly narrative. |
| **Corporate Finance / Controller** | **Budget vs actuals**, **accrual**-consistent treatment, **defensible** roll-ups for **close** and **forecast**. |
| **CIO/CTO** | Alignment between **architecture/cost** choices and **business outcomes**; fewer finance surprises. |
| **Head of AI/ML** | Visibility into **model mix and usage types**; language to justify SLM vs frontier. |
| **Operations Director** | Delivery and cost language stays tied to **operational output** (e.g. per delivery). |

---

### User stories

User stories anchor **scope** and **demo scripts**: each should be demonstrable with mock data. Priority: **P0** = required for PoC success; **P1** = strong differentiator if time allows.

#### Orientation & trust (executive summary)

| ID | Priority | Story |
|----|----------|--------|
| US-01 | P0 | **As** Astrid, **I want** a single view of total digital spend, digital margin, and MoM change **so that** I can open a leadership conversation without assembling spreadsheets. |
| US-02 | P0 | **As** Astrid, **I want** a clear top anomaly (e.g. AI spike with context) **so that** I know *where to look first* within seconds. |
| US-03 | P1 | **As** Astrid, **I want** a compact sustainability/carbon signal tied to regions or workloads **so that** I can mention efficiency without a separate ESG tool. |

#### Diagnosis (where money leaks)

| ID | Priority | Story |
|----|----------|--------|
| US-04 | P0 | **As** Astrid, **I want** spend broken down by pillar (Cloud, AI, SaaS, Labor) with enough drill-down **so that** I can explain *what* drives the total. |
| US-05 | P0 | **As** Astrid, **I want** AI/LLM costs by model and usage type (e.g. internal chat vs customer query) **so that** I can spot misaligned usage (e.g. premium model for low-value work). |
| US-06 | P1 | **As** Astrid, **I want** a trend view of revenue vs tech spend vs cost per delivery **so that** I can see whether spend is outpacing value. |

#### Action & forecasting (levers)

| ID | Priority | Story |
|----|----------|--------|
| US-07 | P0 | **As** Astrid, **I want** to adjust a small set of levers (e.g. shift % to smaller models, reduce tech-debt hours, rightsizing/region, egress, SaaS seats) **so that** I can simulate management decisions, not just read history. |
| US-08 | P0 | **As** Astrid, **I want** projections to update immediately when I move levers **so that** the scenario feels **interactive and trustworthy**. |
| US-09 | P1 | **As** Astrid, **I want** a free-text “custom what-if” field **so that** I can explore a plausible executive question without new UI. |
| US-14 | P1 | **As** Astrid, **I want** to set a **planning horizon** (from **near-term months** through **multi-year**) and optional **financial targets** (e.g. **digital margin**, **tech OpEx** run-rate, **cost per delivery**) **so that** I can **tweak strategies** via levers and see whether the **projection** **bridges** to those **targets** — supporting **rolling forecast** and **long-range plan** narratives, not only the **current quarter**. |

#### Comparison & narrative

| ID | Priority | Story |
|----|----------|--------|
| US-10 | P0 | **As** Astrid, **I want** side-by-side comparison of baseline vs one or two saved scenarios **so that** I can choose a defensible path. |
| US-11 | P0 | **As** Astrid, **I want** ranked recommendations that refresh as levers change **so that** I get **next-step ideas**, not only charts. |
| US-12 | P1 | **As** Astrid, **I want** natural-language questions and suggested prompts that react to my scenario **so that** exploration feels guided without a static FAQ. |

#### Outcome (communicate upward)

| ID | Priority | Story |
|----|----------|--------|
| US-13 | P0 | **As** Astrid, **I want** to export a one-page **Executive Impact Report** (figures + short narrative: quarterly savings, digital margin) **so that** I can share with CFO/CIO without rebuilding a deck. |

**Mapping to the 90-second success metric:** US-01, US-02, US-05, US-07, US-08, US-10, US-13 are the **minimum story set** to hit spot waste → adjust levers → compare → export. **US-14** adds **multi-horizon** **target** **projection** for **strategic** / **FP&A** demos (optional **longer** script).

---

### Core Value Proposition (finance-native)

> **Finance and value leaders** get a **control-tower** view of **technology economics**: **pillar-level spend**, **AI and cloud in plain business language**, **interactive scenarios** across a selectable **planning horizon**, and **exportable narrative** — so **digital spend** is **governed**, **explained** to **investors**, and **tied** to **margin** and **operational output**, including **path** toward **stated** **multi-period** **targets**. That is a different job than **infra observability** or **APM**: FinArc is for **economic** and **reporting** questions, not **service-level** troubleshooting.

### Key 2026 Differentiators (Built In)

- **Finance-native lens** — **margin**, scenarios, and **investor**-ready narrative; not an engineering **cost feed** alone.
- **Granular AI cost tracking** — tokens by model, prompt type, internal vs external.
- **Strong unit economics focus** — Cost / Revenue per Delivery.
- **Scenario modeling & forecasting** — side-by-side comparisons; **horizon**-aware **projection** and optional **bridge** to **targets** (**rolling forecast** / **LRP**-style story, mock precision).
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
| Finance dashboards | **Tremor** (optional — see **§5** **PoC simplification guardrails**) |
| Charts | **Recharts** |
| State | **Zustand** |
| NL / AI | **Simulated LLM** for natural language (upgrade path: Vercel AI SDK) |
| Data | **Modular** — **domain snapshot** in `lib/data` + **mock** adapter; replace with **API** / **FOCUS** ingest (see **§3** **Modular data layer**) |

---

## 3. Data Schema

Use a **clean FOCUS-aligned JSON structure** with **historical** month(s) plus **forecast** rows that can extend across **multiple periods** (monthly or quarterly **stubs**) so **trajectory**, **horizon**, and **target** **bridge** views stay coherent in the UI.

### Pillars (richer granularity)

- **Cloud (Azure):** VMs (G5 rightsizing potential + RI/Savings Plan coverage), Storage, Egress, Region (with mock carbon intensity).
- **AI/LLM:** Token usage by model (GPT-4, 4o-mini, o1-mini), usage type (inference, training, internal chat, customer query, code gen), provider.
- **SaaS:** GitHub Copilot seats, Salesforce, Slack — utilization % where possible.
- **Labor:** Engineering hours (Innovation vs Maintenance/Technical Debt) + fully loaded cost.
- **Business outcomes:** Total Deliveries Processed (primary denominator), mock Revenue, optional CO₂e emissions.

Add **lightweight forecast rows** so sliders can project forward realistically; structure data so a **planning horizon** (months → **multi-year** stub) can drive **aggregated** **projection** without implying **audit**-grade **forecast** accuracy.

### Modular data layer (mock now, integrations later)

**Requirement:** All **fake** / **demo** numbers live in a **replaceable** layer. **UI**, **state** (e.g. Zustand), and **pure calculators** consume **only** a **stable domain snapshot** — not ad hoc imports of JSON from random paths.

| Piece | Role |
|-------|------|
| **Domain types** (`FinArcSnapshot`, pillars, baseline, forecast stub) | **Integration-agnostic** contract; evolve with the product, not with a vendor schema. |
| **`FinArcDataSource`** | Async **`getSnapshot()`** — implemented by **mock**, later by **server routes**, **FOCUS** **pipeline**, **cloud billing** **connectors**, etc. |
| **Mock adapter** | **Sole** place for PoC **literal** figures (`MOCK_FINARC_SNAPSHOT` or equivalent). **No** fake numbers sprinkled in components. |
| **Registry** | **`getFinArcSnapshot()`** + **`setFinArcDataSource()`** (or env-driven factory) so **tests** and **prod** can swap sources without touching UI. |

**Rules:** Components **must not** import `**/mock/**` directly — only **`lib/data`** (or **`@/lib/data`**) **public** exports. New integrations add **`lib/data/adapters/<provider>/`** that **map** vendor payloads **into** **`FinArcSnapshot`** (normalization stays in the adapter, not in pages).

**PoC simplification:** The snapshot can stay **minimal** (one baseline + stub); expand fields as features land, **without** breaking the **adapter** **boundary**.

### Thin abstractions for long-term work (PoC stays small)

Keep **seams** narrow so the PoC does **not** sprawl, but **future** work has **stable** places to land:

| Module / area | PoC | Long-term (same seam) |
|---------------|-----|------------------------|
| **`lib/data`** + **`FinArcDataSource`** | Mock adapter | **API** routes, **ETL**, **FOCUS** ingest → **map** to **`FinArcSnapshot`** |
| **`lib/metrics.ts`** | Pure **KPI** helpers (**total spend**, **CpD**, **spend/revenue**) | Richer **definitions**, **segment** splits — **UI** still imports **one** module |
| **`lib/levers.ts`** | **`LeverState`** + **defaults** (add fields as sliders appear) | Validation, **presets**, **saved** scenarios |
| **`lib/horizons.ts`** | **`HORIZON_PRESETS`** (no arbitrary ranges in v1) | More **presets**, **fiscal** **calendar** |
| **`lib/projection.ts`** | **`projectScenario()`** stub returning **`ProjectionResult`** | Swap **internals** for real **formulas**, **Monte Carlo**, or **service** call — **signature** stable |
| **`lib/report.ts`** | **`ExecutiveReportPayload`** + thin **builder** | **PDF** service, **email**, **CMS** — **layout** consumes **payload**, not **React** |
| **`store/`** (when added) | Zustand holds **levers** + **UI** state **only** | **Hydration**, **undo**, **collab** — **not** raw **adapter** **calls** in components |
| **Copy / NL** | Optional **`lib/copy.ts`** or colocated **templates** | **i18n**, **LLM** **prompts** fed from **`ProjectionResult`** + **metrics** |

**Anti-patterns to avoid:** **KPI** math **inline** in **pages**; **lever** **numbers** **embedded** in **chart** **config**; **export** **logic** **inside** **print** **CSS** only — use **payload** **types** instead.

---

## 4. Key UI Components

### KPI definitions (PoC lock — aligns with `lib/metrics.ts`)

| Label | Definition for v1 | Notes |
|-------|---------------------|--------|
| **Total digital spend** | Sum of **Cloud + AI + SaaS + Labor** (USD) | Single source: **`totalDigitalSpend()`** |
| **Cost per delivery (CpD)** | Total digital spend ÷ **deliveries** | **Primary** efficiency **hero** number on the dashboard |
| **Tech spend intensity** | Total digital spend ÷ **revenue** (ratio 0–1 or %) | **Secondary** KPI — “digital load” on revenue |
| **“Digital Margin” (product language)** | Use the **term** in copy for **recognition**; **do not** mix with **accounting gross margin %** in v1 unless the team adds an explicit **P&L** line later | Avoid ambiguous **Spend ÷ Revenue** **as** “margin” **without** a footnote |

### A. Executive Summary Header

- Total Digital Spend (MoM % change)
- **Efficiency headline:** **Cost per delivery** + optional **tech spend % of revenue** — large KPI with trend sparkline and color-coded score (product may still **label** the block **Digital Margin** in prose)
- **Top anomaly alert** (e.g., “$4,200 AI waste spike — 62% internal chat on GPT-4”)
- **Quick sustainability tile** (e.g., “Carbon intensity: 18% above optimal”)

### B. Trend Dashboard

- Multi-axis chart: **Revenue** vs **Total Tech Spend** vs **Cost per Delivery** (highlight where spend outpaces value).
- **Forecast** / **trajectory** line(s) that update live when levers change, extending over the selected **planning horizon** (see **US-14**).

### C. Natural Language Insights (dynamic & reactive)

- Prompt: “Ask anything about the budget…”
- **Suggested prompts** update from current data/levers (e.g., after switching to SLM: “Your change just reduced projected Q2 AI spend by $11k while maintaining 98% performance.”).

### D. Lever Playground (hero feature)

Real-time, draggable levers with instant recalculation. Include **planning horizon** selection (**near-term** through **multi-year** stub) and optional **target** fields so Astrid can **retune** the **strategy mix** and see **whether** the **mock projection** moves toward **FP&A** / **board**-level **targets** (**bridge** narrative).

| Lever | Examples |
|-------|----------|
| AI / LLM | Switch X% of high-cost inference to smaller models / SLM |
| Labor | Reduce Technical Debt allocation by X% (frees engineering capacity) |
| Cloud | Right-size VMs or move workloads to lower-cost / lower-carbon regions |
| Network | Optimize Egress (CDN/compression simulation) |
| SaaS | Reduce under-utilized seats |
| Custom | Free-text what-if (e.g., “Add 200 more Copilot seats”, “Shift 30% workloads to Azure spot”) |

**Live outputs:**

- Projected **savings** and **margin** impact over the selected **horizon** (not only **quarterly** — **aggregates** may span **months** or **years** for **LRP**-style storytelling)
- New **Digital Margin** & **Cost per Delivery** at relevant **period** endpoints
- Optional **gap-to-target** / **bridge** readout when **targets** are set (**US-14**)
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

1. **`lib/data`** modular snapshot + mock adapter; **`lib/metrics`**, **`lib/levers`**, **`lib/horizons`**, **`lib/projection`**, **`lib/report`** (thin seams per **§3**); Zustand store (levers + calculations + **multi-period** **forecast** hooks for **horizon** / **target**)
2. Executive header + trend chart
3. Lever Playground with live updates and scenario compare; **planning horizon** + optional **targets** (**US-14**, can trail core **P0** flow)
4. Natural language bar (rule-based first)
5. Report export + polish (Nordic dark theme, tooltips, scannability)

### PoC simplification guardrails (keep the build small)

These **implementation** choices reduce scope **without** changing the **product story**. Prefer them unless a requirement explicitly needs more.

| Area | Simpler PoC choice |
|------|---------------------|
| **Surface** | **One** primary **page** (single scroll with sections, or **one** route). **§4.E** “additional screens” are **post-PoC** unless time is left over. |
| **Data** | **One** **baseline** period + **simple** forecast math (hand-tuned formula or linear stub). **Flattened** mock JSON — **not** a full **FOCUS** ingest model. **Pillars**: enough rows to **demo** drill-down; **not** full **Azure** SKU fidelity. |
| **Levers** | **3–5** sliders in **v1** (subset of the lever table). **US-09** custom what-if = **keyword/echo stub** or **defer** if it blocks ship. |
| **Scenarios** | **Baseline + one** alternate (**Scenario A**) for compare; **second** scenario (**B**) = **P1**. **Persistence** = **in-memory** or **localStorage** only. |
| **Horizon / targets (US-14)** | **Preset** horizons only (e.g. **12 months**, **3 years**) + at most **one** optional **target** field — **not** arbitrary date ranges or a full **bridge** **waterfall** chart in v1. |
| **Charts** | **One** trend + **one** pillar view (donut or stacked bar). Skip extra chart types until **P0** feels **solid**. |
| **Recommendations (US-11)** | **Template** strings + **injected numbers** — **not** a separate “engine” or ranking **ML**. |
| **Natural language (US-12)** | **Rule-based** canned responses + **suggested prompts** as **static templates** filled from state — **not** an LLM integration for PoC. |
| **Export (US-13)** | **Print-friendly** layout + **browser Print to PDF**, or **one** lightweight PDF path — avoid heavy PDF composition until **necessary**. |
| **UI libraries** | **shadcn/ui + Recharts** is enough. **Tremor** is **optional** — adopt only if it **speeds** KPI blocks; otherwise skip to **avoid** dependency **sprawl**. |

**90-second path** stays the **gate**: ship **P0** first; treat **P1** stories as **stretch** in the same codebase **after** the minimum path works end-to-end.

---

## 6. Out of Scope (for this spec phase)

- Full production implementation
- Real billing/API integrations (FOCUS alignment is structural only for PoC)
- **Full** implementations of **advanced** **financial** **lenses** in the **big** table (tax, **transfer pricing**, **segment** **engines**, etc.) — **positioning** only for PoC
- **Multi-page** **app** structure, **Scenario Library**, **Cost Explorer**, and **insights feed** as **first-class** features — **covered** in **§4.E** as **future** unless explicitly **pulled** into a **timeboxed** stretch
- **Arbitrary** **multi-year** **precision**, **driver-based** **integrated** **financial** **models**, and **audit**-grade **forecast** **logic**

---

## 7. Documentation & theme (engineering)

- **Docs hub (CVReady-style entry):** [README.md](../../README.md) — quick start, index, principles, UI/UX, coding hygiene.
- **Theme tokens (quick restyle):** [app/theme/finarc-theme.css](../../../app/theme/finarc-theme.css) — CSS variables; details in [ux/theme-and-tokens.md](ux/theme-and-tokens.md).

## 8. Positioning, data access, and competition

- **Market hypothesis, realistic integrations, and wedge vs alternatives:** [../positioning-and-access.md](../positioning-and-access.md).
