import type { FinArcSnapshot } from "@/lib/data";
import { totalDigitalSpend } from "@/lib/metrics";
import type { HorizonId } from "@/lib/horizons";
import type { LeverState } from "@/lib/levers";

function clampPct(p: number): number {
  return Math.min(100, Math.max(0, p));
}

/**
 * Output of “what-if” math — extend with per-period series, gap-to-target, etc.
 * Amounts in canonical currency (SEK) for PoC.
 */
export interface ProjectionResult {
  headlineSavings: number;
  horizonId: HorizonId;
  /** Rough annualized multiplier from horizon preset (mock). */
  horizonFactor: number;
}

const HORIZON_ANNUAL_FACTOR: Record<HorizonId, number> = {
  "12m": 1,
  "3y": 3,
};

/**
 * Single seam for scenario math. PoC: heuristic on AI pillar + lever; replace with real models later.
 */
export function projectScenario(
  snapshot: FinArcSnapshot,
  levers: LeverState,
  horizonId: HorizonId,
): ProjectionResult {
  const ai = snapshot.baseline.pillars.ai;
  const shift = clampPct(levers.aiShiftToSmallerModelsPct) / 100;
  /** Mock: shifting high-cost inference yields ~18% savings on the shifted slice. */
  const monthlySavings = ai * shift * 0.18;
  const horizonFactor = HORIZON_ANNUAL_FACTOR[horizonId];
  const headlineSavings = monthlySavings * 12 * horizonFactor;

  return { headlineSavings, horizonId, horizonFactor };
}

/** Monthly digital spend & CpD after applying lever heuristic (same AI-shift model as `projectScenario`). */
export function scenarioMonthlyMetrics(snapshot: FinArcSnapshot, levers: LeverState) {
  const { pillars, outcomes } = snapshot.baseline;
  const base = totalDigitalSpend(pillars);
  const ai = pillars.ai;
  const shift = clampPct(levers.aiShiftToSmallerModelsPct) / 100;
  const monthlySavingsSek = ai * shift * 0.18;
  const monthlyDigitalSpendSek = base - monthlySavingsSek;
  const d = outcomes.deliveries;
  return {
    monthlyDigitalSpendSek,
    costPerDeliverySek: d > 0 ? monthlyDigitalSpendSek / d : 0,
    monthlySavingsVsBaselineSek: monthlySavingsSek,
  };
}
