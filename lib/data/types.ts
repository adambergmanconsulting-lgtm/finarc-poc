/**
 * FinArc domain snapshot — integration-agnostic.
 * UI, stores, and calculators import from `lib/data` only these shapes (not vendor payloads).
 */

/** YYYY-MM billing / reporting period (string keeps adapters simple). */
export type PeriodId = string;

export interface PillarAmounts {
  cloudUsd: number;
  aiUsd: number;
  saasUsd: number;
  laborUsd: number;
}

export interface BaselinePeriod {
  periodId: PeriodId;
  currency: "USD";
  pillars: PillarAmounts;
  outcomes: {
    deliveries: number;
    revenueUsd: number;
  };
}

/** Lightweight multi-period stub for horizon / trajectory UI (mock precision). */
export interface ForecastStub {
  periodIds: PeriodId[];
  /** Optional per-period pillar totals when the PoC needs a curve; can stay empty and derived in-app. */
  series?: Partial<Record<PeriodId, PillarAmounts>>;
}

export interface FinArcSnapshot {
  schemaVersion: "finarc.snapshot.v1";
  generatedAt: string;
  baseline: BaselinePeriod;
  forecastStub: ForecastStub;
  /** Opaque hook for FOCUS-aligned row payloads later — keep out of UI until normalized. */
  meta?: {
    focusDatasetHint?: string;
  };
}
