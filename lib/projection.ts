import type { FinArcSnapshot } from "@/lib/data";
import { totalDigitalSpend } from "@/lib/metrics";
import type { HorizonId } from "@/lib/horizons";
import type { LeverState } from "@/lib/levers";

function clampPct(p: number): number {
  return Math.min(100, Math.max(0, p));
}

/** Default annualized forecast uncertainty when no stress preset (mock). */
const BASELINE_UNCERTAINTY_ANNUAL_SEK = 265_000;
const MIN_STRESS_UNCERTAINTY_ANNUAL_SEK = 185_000;

/**
 * Output of “what-if” math — extend with per-period series, gap-to-target, etc.
 * Amounts in canonical currency (SEK) for PoC.
 */
export interface ProjectionResult {
  headlineSavings: number;
  horizonId: HorizonId;
  /** Rough annualized multiplier from horizon preset (mock). */
  horizonFactor: number;
  /** Annualized illustrative cloud savings from commitment + governance levers (mock). */
  cloudAnnualizedSavingsSek: number;
  /**
   * Annualized half-width of a mock “forecast uncertainty” band (SEK).
   * Narrows as commitment / governance levers increase under stress.
   */
  forecastUncertaintyHalfWidthAnnualSek: number;
}

const HORIZON_ANNUAL_FACTOR: Record<HorizonId, number> = {
  "12m": 1,
  "3y": 3,
};

function monthlyCloudLeverSavingsSek(cloudPillar: number, levers: LeverState): number {
  const rg = clampPct(levers.azureRightsizingGovernancePct) / 100;
  const cc = clampPct(levers.azureCommitCoveragePct) / 100;
  /** Mock: rightsizing trims waste; commitments capture discount on covered share. */
  return cloudPillar * (rg * 0.07 + cc * 0.045);
}

function uncertaintyHalfWidthAnnual(
  snapshot: FinArcSnapshot,
  levers: LeverState,
): number {
  const base =
    snapshot.meta?.scenarioStress?.baseForecastUncertaintyAnnualSek ??
    BASELINE_UNCERTAINTY_ANNUAL_SEK;
  const cc = clampPct(levers.azureCommitCoveragePct) / 100;
  const rg = clampPct(levers.azureRightsizingGovernancePct) / 100;
  const dampen = (1 - cc * 0.52) * (1 - rg * 0.38);
  const raw = base * dampen;
  if (snapshot.meta?.scenarioStress) {
    return Math.max(MIN_STRESS_UNCERTAINTY_ANNUAL_SEK, Math.round(raw));
  }
  return Math.max(95_000, Math.round(raw));
}

/**
 * Single seam for scenario math. PoC: heuristics on AI + Azure levers; replace with real models later.
 */
export function projectScenario(
  snapshot: FinArcSnapshot,
  levers: LeverState,
  horizonId: HorizonId,
): ProjectionResult {
  const ai = snapshot.baseline.pillars.ai;
  const cloud = snapshot.baseline.pillars.cloud;
  const shift = clampPct(levers.aiShiftToSmallerModelsPct) / 100;
  /** Mock: shifting high-cost inference yields ~18% savings on the shifted slice. */
  const monthlyAiSavings = ai * shift * 0.18;
  const monthlyCloudSavings = monthlyCloudLeverSavingsSek(cloud, levers);
  const horizonFactor = HORIZON_ANNUAL_FACTOR[horizonId];
  const monthlyTotal = monthlyAiSavings + monthlyCloudSavings;
  const headlineSavings = monthlyTotal * 12 * horizonFactor;
  const cloudAnnualizedSavingsSek = monthlyCloudSavings * 12 * horizonFactor;

  return {
    headlineSavings,
    horizonId,
    horizonFactor,
    cloudAnnualizedSavingsSek,
    forecastUncertaintyHalfWidthAnnualSek: uncertaintyHalfWidthAnnual(snapshot, levers),
  };
}

/** Monthly digital spend & CpD after applying lever heuristics (AI + Azure mock). */
export function scenarioMonthlyMetrics(snapshot: FinArcSnapshot, levers: LeverState) {
  const { pillars, outcomes } = snapshot.baseline;
  const base = totalDigitalSpend(pillars);
  const ai = pillars.ai;
  const shift = clampPct(levers.aiShiftToSmallerModelsPct) / 100;
  const monthlyAiSavingsSek = ai * shift * 0.18;
  const monthlyCloudSavingsSek = monthlyCloudLeverSavingsSek(pillars.cloud, levers);
  const monthlySavingsVsBaselineSek = monthlyAiSavingsSek + monthlyCloudSavingsSek;
  const monthlyDigitalSpendSek = base - monthlySavingsVsBaselineSek;
  const d = outcomes.deliveries;
  return {
    monthlyDigitalSpendSek,
    costPerDeliverySek: d > 0 ? monthlyDigitalSpendSek / d : 0,
    monthlySavingsVsBaselineSek,
  };
}
