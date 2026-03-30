import type { FinArcSnapshot } from "../../types";

/**
 * Replaceable mock — sole location for PoC fake numbers tied to the SPEC pillars.
 * Amounts are **SEK** (Nordic PoC default). Display currency (EUR/USD) uses mock FX in `lib/currency.ts`.
 */
export const MOCK_FINARC_SNAPSHOT: FinArcSnapshot = {
  schemaVersion: "finarc.snapshot.v1",
  generatedAt: "2026-03-30T12:00:00.000Z",
  baseline: {
    periodId: "2026-03",
    currency: "SEK",
    pillars: {
      cloud: 1_367_000,
      ai: 439_000,
      saas: 392_000,
      labor: 2_109_000,
    },
    outcomes: {
      deliveries: 1_240_000,
      revenue: 450_000_000,
    },
  },
  forecastStub: {
    periodIds: ["2026-04", "2026-05", "2026-06"],
    series: {},
  },
  trendHistory: [
    { periodId: "2025-10", revenue: 428_000_000, techSpend: 4_026_000, deliveries: 1_180_000 },
    { periodId: "2025-11", revenue: 432_500_000, techSpend: 4_074_000, deliveries: 1_195_000 },
    { periodId: "2025-12", revenue: 437_000_000, techSpend: 4_145_000, deliveries: 1_210_000 },
    { periodId: "2026-01", revenue: 441_000_000, techSpend: 4_215_000, deliveries: 1_220_000 },
    { periodId: "2026-02", revenue: 446_500_000, techSpend: 4_272_000, deliveries: 1_232_000 },
    { periodId: "2026-03", revenue: 450_000_000, techSpend: 4_307_000, deliveries: 1_240_000 },
  ],
  meta: {
    focusDatasetHint: "mock-only-sek",
    topAnomalySummary:
      "42 000 SEK AI waste spike — 62% internal chat on GPT-4 vs customer-facing workloads",
  },
};
