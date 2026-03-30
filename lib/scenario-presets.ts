import type { FinArcSnapshot } from "@/lib/data";
import { totalDigitalSpend } from "@/lib/metrics";

/** Demo presets — baseline mock vs stressed Azure + SaaS sprawl narrative. */
export type ScenarioPresetId = "baseline" | "azure_uncontrolled";

export const SCENARIO_PRESET_OPTIONS: { id: ScenarioPresetId; label: string; description: string }[] =
  [
    {
      id: "baseline",
      label: "Baseline",
      description: "Steady-state mock month — typical variance.",
    },
    {
      id: "azure_uncontrolled",
      label: "Azure stress",
      description: "Runaway cloud growth + weak forecast — tame with commitment & governance levers.",
    },
  ];

const CLOUD_STRESS_MULT = 1.32;
const SAAS_STRESS_MULT = 1.12;
/** Annualized uncertainty before levers (SEK) — mock, not statistical. */
const STRESS_UNCERTAINTY_ANNUAL_SEK = 1_420_000;

function scaleCloudBreakdown(
  snapshot: FinArcSnapshot,
  newCloudTotal: number,
): FinArcSnapshot["baseline"]["cloudBreakdown"] {
  const breakdown = snapshot.baseline.cloudBreakdown;
  if (!breakdown?.lines.length) return breakdown;
  const oldCloud = snapshot.baseline.pillars.cloud;
  if (oldCloud <= 0) return breakdown;
  const factor = newCloudTotal / oldCloud;
  const lines = breakdown.lines.map((l) => ({
    ...l,
    amount: Math.round(l.amount * factor),
  }));
  const sum = lines.reduce((s, l) => s + l.amount, 0);
  const drift = newCloudTotal - sum;
  if (lines.length > 0 && drift !== 0) {
    const i = lines.reduce(
      (best, l, idx, arr) => (l.amount >= arr[best]!.amount ? idx : best),
      0,
    );
    lines[i] = { ...lines[i]!, amount: lines[i]!.amount + drift };
  }
  return { ...breakdown, lines };
}

/**
 * Returns a **view** snapshot for the selected preset (clone). Baseline returns a clean clone
 * without `scenarioStress`; **Azure stress** inflates cloud + SaaS, steepens tech spend trend,
 * and swaps the top anomaly copy.
 */
export function applyScenarioPreset(
  snapshot: FinArcSnapshot,
  preset: ScenarioPresetId,
): FinArcSnapshot {
  const base = structuredClone(snapshot);
  if (preset === "baseline") {
    if (base.meta) delete base.meta.scenarioStress;
    return base;
  }

  const oldCloud = snapshot.baseline.pillars.cloud;
  const oldSaas = snapshot.baseline.pillars.saas;
  const newCloud = Math.round(oldCloud * CLOUD_STRESS_MULT);
  const newSaas = Math.round(oldSaas * SAAS_STRESS_MULT);

  base.baseline.pillars.cloud = newCloud;
  base.baseline.pillars.saas = newSaas;
  base.baseline.cloudBreakdown = scaleCloudBreakdown(snapshot, newCloud);

  const oldTotal = totalDigitalSpend(snapshot.baseline.pillars);
  const newTotal = totalDigitalSpend(base.baseline.pillars);
  const trendMult = oldTotal > 0 ? newTotal / oldTotal : 1;

  if (base.trendHistory?.length) {
    base.trendHistory = base.trendHistory.map((p) => ({
      ...p,
      techSpend: Math.round(p.techSpend * trendMult),
    }));
  }

  base.meta = {
    ...base.meta,
    topAnomalySummary:
      "Azure run-rate up ~32% vs plan — egress + compute scaling ahead of governance; SaaS seats drifting (+12%) — forecast error risk for next close.",
    scenarioStress: {
      presetId: "azure_uncontrolled",
      baseForecastUncertaintyAnnualSek: STRESS_UNCERTAINTY_ANNUAL_SEK,
    },
  };

  return base;
}
