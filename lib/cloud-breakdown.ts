import type { CloudHostingBreakdown } from "@/lib/data";

/** Verifies adapter consistency: line items sum to the Cloud pillar total. */
export function cloudBreakdownMatchesPillar(
  cloudPillarTotal: number,
  breakdown: CloudHostingBreakdown | undefined,
): boolean {
  if (!breakdown?.lines.length) return true;
  const sum = breakdown.lines.reduce((s, l) => s + l.amount, 0);
  return Math.round(sum) === Math.round(cloudPillarTotal);
}
