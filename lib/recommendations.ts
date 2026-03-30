import type { FinArcSnapshot } from "@/lib/data";
import { formatCurrencyAmount, type CurrencyCode } from "@/lib/currency";
import type { ProjectionResult } from "@/lib/projection";
import type { LeverState } from "@/lib/levers";

/** Rule-based “top 3” style hints (US-11) — swap for scoring engine later. */
export function buildRecommendations(
  snapshot: FinArcSnapshot,
  levers: LeverState,
  projection: ProjectionResult,
  displayCurrency: CurrencyCode,
): string[] {
  const fmt = (sek: number) => formatCurrencyAmount(sek, displayCurrency);
  const lines: string[] = [];

  if (snapshot.meta?.topAnomalySummary) {
    lines.push(`Priority look: ${snapshot.meta.topAnomalySummary}`);
  }

  if (levers.aiShiftToSmallerModelsPct < 20 && projection.headlineSavings > 0) {
    lines.push(
      `AI mix: you are at ${levers.aiShiftToSmallerModelsPct}% shift to smaller models — mock run suggests up to ${fmt(projection.headlineSavings)} over the selected horizon if you increase the lever.`,
    );
  } else if (levers.aiShiftToSmallerModelsPct >= 40) {
    lines.push(
      "AI mix: high shift to smaller models — validate quality SLAs with product owners before locking the narrative for investors.",
    );
  }

  if (snapshot.baseline.cloudBreakdown?.lines.some((l) => l.id === "egress")) {
    lines.push(
      "Cloud: egress and CDN lines are often negotiable — align with networking on compression, regional pinning, and reserved capacity.",
    );
  }

  if (lines.length < 3) {
    lines.push(
      "Cross-pillar: when you brief CFO/IR, pair cloud + AI moves with a single cost-per-delivery trajectory (mock narrative).",
    );
  }

  return lines.slice(0, 3);
}
