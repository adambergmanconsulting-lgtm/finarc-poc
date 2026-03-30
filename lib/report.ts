import { formatCurrencyAmount, type CurrencyCode } from "@/lib/currency";
import type { FinArcSnapshot } from "@/lib/data";
import { totalDigitalSpend } from "@/lib/metrics";
import { scenarioMonthlyMetrics, type ProjectionResult } from "@/lib/projection";
import { DEFAULT_LEVER_STATE, type LeverState } from "@/lib/levers";

/** Payload for print/PDF/export — keeps document layout decoupled from React trees. */
export interface ExecutiveReportPayload {
  generatedAt: string;
  baselinePeriodId: string;
  summaryLines: string[];
  projection?: ProjectionResult;
  recommendations?: string[];
  scenarioCompare?: {
    baselineLevers: LeverState;
    scenarioLevers: LeverState;
  };
}

export function buildExecutiveReportPayload(
  snapshot: FinArcSnapshot,
  opts?: {
    projection?: ProjectionResult;
    displayCurrency?: CurrencyCode;
    recommendations?: string[];
    scenarioALevers?: LeverState | null;
  },
): ExecutiveReportPayload {
  const display = opts?.displayCurrency ?? "SEK";
  const spend = totalDigitalSpend(snapshot.baseline.pillars);
  const baseMetrics = scenarioMonthlyMetrics(snapshot, DEFAULT_LEVER_STATE);

  const lines = [
    `Baseline period ${snapshot.baseline.periodId} (mock, SEK-native storage).`,
    `Total digital spend (month, no lever change): ${formatCurrencyAmount(spend, display)}.`,
    `Cost per delivery (baseline levers): ${formatCurrencyAmount(baseMetrics.costPerDeliverySek, display)}.`,
  ];

  if (opts?.projection) {
    lines.push(
      `Projected savings (current levers, mock horizon): ${formatCurrencyAmount(opts.projection.headlineSavings, display)}.`,
    );
  }

  return {
    generatedAt: new Date().toISOString(),
    baselinePeriodId: snapshot.baseline.periodId,
    summaryLines: lines,
    projection: opts?.projection,
    recommendations: opts?.recommendations,
    scenarioCompare:
      opts?.scenarioALevers != null
        ? { baselineLevers: DEFAULT_LEVER_STATE, scenarioLevers: opts.scenarioALevers }
        : undefined,
  };
}
