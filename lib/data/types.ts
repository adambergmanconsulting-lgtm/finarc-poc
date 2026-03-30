/**
 * FinArc domain snapshot — integration-agnostic.
 * UI, stores, and calculators import from `lib/data` only these shapes (not vendor payloads).
 */

import type { CurrencyCode } from "@/lib/currency";

/** YYYY-MM billing / reporting period (string keeps adapters simple). */
export type PeriodId = string;

export interface PillarAmounts {
  /** Amounts in canonical currency (`baseline.currency`), PoC: SEK. */
  cloud: number;
  ai: number;
  saas: number;
  labor: number;
}

export interface BaselinePeriod {
  periodId: PeriodId;
  /** Stored amounts (pillars, revenue) use this currency — PoC uses **SEK** for Nordics. */
  currency: CurrencyCode;
  pillars: PillarAmounts;
  outcomes: {
    deliveries: number;
    /** Revenue in same unit as `currency` (SEK in mock). */
    revenue: number;
  };
}

/** Lightweight multi-period stub for horizon / trajectory UI (mock precision). */
export interface ForecastStub {
  periodIds: PeriodId[];
  /** Optional per-period pillar totals when the PoC needs a curve; can stay empty and derived in-app. */
  series?: Partial<Record<PeriodId, PillarAmounts>>;
}

export interface TrendPoint {
  periodId: PeriodId;
  /** Revenue in canonical currency (SEK). */
  revenue: number;
  /** Total digital tech spend in canonical currency (SEK). */
  techSpend: number;
  deliveries: number;
}

export interface FinArcSnapshot {
  schemaVersion: "finarc.snapshot.v1";
  generatedAt: string;
  baseline: BaselinePeriod;
  forecastStub: ForecastStub;
  /** Recent periods for charts (monthly stubs); last row should align with `baseline` for PoC. */
  trendHistory?: TrendPoint[];
  /** Opaque hook for FOCUS-aligned row payloads later — keep out of UI until normalized. */
  meta?: {
    focusDatasetHint?: string;
    /** Pre-computed leadership alert line for US-02. */
    topAnomalySummary?: string;
  };
}
