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
  meta: {
    focusDatasetHint: "mock-only",
  },
};
