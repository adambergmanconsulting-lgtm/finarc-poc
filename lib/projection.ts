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
}

/**
 * Single seam for scenario math. PoC: stub; later: replace body with real formulas
 * or call a worker/API while keeping the signature stable.
 */
export function projectScenario(
  _snapshot: FinArcSnapshot,
  _levers: LeverState,
  horizonId: HorizonId,
): ProjectionResult {
  return { headlineSavingsUsd: 0, horizonId };
}
