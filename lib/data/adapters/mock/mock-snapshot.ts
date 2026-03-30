import type { FinArcSnapshot } from "../../types";

/**
 * Replaceable mock — sole location for PoC fake numbers tied to the SPEC pillars.
 * Real integrations should map their responses into `FinArcSnapshot` in another adapter.
 */
export const MOCK_FINARC_SNAPSHOT: FinArcSnapshot = {
  schemaVersion: "finarc.snapshot.v1",
  generatedAt: "2026-03-30T12:00:00.000Z",
  baseline: {
    periodId: "2026-03",
    currency: "USD",
    pillars: {
      cloudUsd: 128_400,
      aiUsd: 41_200,
      saasUsd: 36_800,
      laborUsd: 198_000,
    },
    outcomes: {
      deliveries: 1_240_000,
      revenueUsd: 42_500_000,
    },
  },
  forecastStub: {
    periodIds: ["2026-04", "2026-05", "2026-06"],
    series: {},
  },
  trendHistory: [
    { periodId: "2025-10", revenueUsd: 40_200_000, techSpendUsd: 378_000, deliveries: 1_180_000 },
    { periodId: "2025-11", revenueUsd: 40_600_000, techSpendUsd: 382_500, deliveries: 1_195_000 },
    { periodId: "2025-12", revenueUsd: 41_000_000, techSpendUsd: 389_200, deliveries: 1_210_000 },
    { periodId: "2026-01", revenueUsd: 41_400_000, techSpendUsd: 395_800, deliveries: 1_220_000 },
    { periodId: "2026-02", revenueUsd: 41_900_000, techSpendUsd: 401_100, deliveries: 1_232_000 },
    { periodId: "2026-03", revenueUsd: 42_500_000, techSpendUsd: 404_400, deliveries: 1_240_000 },
  ],
  meta: {
    focusDatasetHint: "mock-only",
    topAnomalySummary:
      "$4,200 AI waste spike — 62% internal chat on GPT-4 vs customer-facing workloads",
  },
};
