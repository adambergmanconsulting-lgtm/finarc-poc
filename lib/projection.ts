import type { FinArcSnapshot } from "@/lib/data";
import type { HorizonId } from "@/lib/horizons";
import type { LeverState } from "@/lib/levers";

/**
 * Output of “what-if” math — extend with per-period series, gap-to-target, etc.
 * UI and export should depend on this shape, not raw lever objects.
 */
export interface ProjectionResult {
  headlineSavingsUsd: number;
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
  const ai = snapshot.baseline.pillars.aiUsd;
  const shift = Math.min(100, Math.max(0, levers.aiShiftToSmallerModelsPct)) / 100;
  /** Mock: shifting high-cost inference yields ~18% savings on the shifted slice. */
  const monthlySavings = ai * shift * 0.18;
  const horizonFactor = HORIZON_ANNUAL_FACTOR[horizonId];
  const headlineSavingsUsd = monthlySavings * 12 * horizonFactor;

  return { headlineSavingsUsd, horizonId, horizonFactor };
}
