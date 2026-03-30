import type { BaselinePeriod, PillarAmounts } from "@/lib/data";

/** Sum of pillar spend (canonical currency, PoC: SEK). */
export function totalDigitalSpend(pillars: PillarAmounts): number {
  return pillars.cloud + pillars.ai + pillars.saas + pillars.labor;
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
 * Tech spend as a share of revenue (0–1). Revenue in canonical currency.
 */
export function digitalSpendToRevenueRatio(baseline: BaselinePeriod): number {
  const r = baseline.outcomes.revenue;
  if (r <= 0) return 0;
  return totalDigitalSpend(baseline.pillars) / r;
}
