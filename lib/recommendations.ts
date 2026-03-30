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
  const stress = snapshot.meta?.scenarioStress;

  if (snapshot.meta?.topAnomalySummary) {
    lines.push(`Priority look: ${snapshot.meta.topAnomalySummary}`);
  }

  if (stress) {
    const half = projection.forecastUncertaintyHalfWidthAnnualSek;
    if (levers.azureCommitCoveragePct < 35) {
      lines.push(
        `Azure predictability: raise commitment coverage — at current levers the mock annualized forecast band is about ±${fmt(half)}; increasing coverage narrows surprise risk for close.`,
      );
    } else if (levers.azureRightsizingGovernancePct < 35) {
      lines.push(
        "Azure: commitment is helping — add rightsizing and tagging discipline so runaway spend does not hide in untagged subscriptions and idle SKUs.",
      );
    } else {
      lines.push(
        `Azure stress (mock): governance + commitments suggest ~${fmt(projection.cloudAnnualizedSavingsSek)} annualized cloud-side savings and a tighter forecast band for CFO narrative.`,
      );
    }
  }

  if (levers.aiShiftToSmallerModelsPct < 25) {
    lines.push(
      `AI mix: ${levers.aiShiftToSmallerModelsPct}% shifted to smaller models — mock bundle (AI + cloud levers) projects ${fmt(projection.headlineSavings)} over the selected horizon.`,
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
