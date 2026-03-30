import type { BaselinePeriod, PillarAmounts } from "@/lib/data";

/** Sum of pillar spend — single definition for KPIs and export. */
export function totalDigitalSpend(pillars: PillarAmounts): number {
  return pillars.cloudUsd + pillars.aiUsd + pillars.saasUsd + pillars.laborUsd;
}

/**
 * Total digital spend ÷ deliveries — primary unit-economics denominator in SPEC.
 */
export function costPerDelivery(baseline: BaselinePeriod): number {
  const d = baseline.outcomes.deliveries;
  if (d <= 0) return 0;
  return totalDigitalSpend(baseline.pillars) / d;
}

/**
 * Tech spend as a share of revenue (0–1). When SPEC locks “Digital Margin,” rename or
 * combine with margin% — this is a stable interim efficiency ratio for dashboards.
 */
export function digitalSpendToRevenueRatio(baseline: BaselinePeriod): number {
  const r = baseline.outcomes.revenueUsd;
  if (r <= 0) return 0;
  return totalDigitalSpend(baseline.pillars) / r;
}
