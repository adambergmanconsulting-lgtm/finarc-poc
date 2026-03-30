import type { FinArcSnapshot } from "@/lib/data";
import { formatCurrencyAmount, type CurrencyCode } from "@/lib/currency";
import { totalDigitalSpend } from "@/lib/metrics";
import type { ProjectionResult } from "@/lib/projection";

/** Rule-based NL (US-12 PoC) — no LLM. */
export function answerInsightPrompt(
  prompt: string,
  snapshot: FinArcSnapshot,
  projection: ProjectionResult,
  displayCurrency: CurrencyCode,
): string {
  const q = prompt.trim().toLowerCase();
  const spend = formatCurrencyAmount(totalDigitalSpend(snapshot.baseline.pillars), displayCurrency);
  const savings = formatCurrencyAmount(projection.headlineSavings, displayCurrency);

  if (!q) return "Ask about savings, cloud, AI, margin, or export.";

  if (q.includes("saving") || q.includes("save")) {
    return `Mock projection: moving the current levers suggests about ${savings} over your selected horizon (${projection.horizonId === "3y" ? "3 years" : "12 months"} annualized stub).`;
  }
  if (q.includes("predict") || q.includes("variance") || q.includes("uncertain")) {
    const u = projection.forecastUncertaintyHalfWidthAnnualSek;
    return `Mock forecast band (annual half-width): about ±${formatCurrencyAmount(u, displayCurrency)}. Under the Azure stress preset it starts wide; moving commitment and governance levers narrows it for a “tamed” storyline.`;
  }
  if (q.includes("cloud") || q.includes("azure")) {
    const n = snapshot.baseline.cloudBreakdown?.lines.length ?? 0;
    const stress = snapshot.meta?.scenarioStress
      ? " Azure stress preset is on — use commitment + rightsizing sliders to show predictability vs runaway spend."
      : "";
    return n > 0
      ? `Cloud is split into ${n} mock Azure line items below the KPIs — start with compute vs egress when you explain variance.${stress}`
      : `Cloud is a single pillar total in this snapshot — add a cloudBreakdown in the data adapter for hosting detail.${stress}`;
  }
  if (q.includes("ai") || q.includes("model")) {
    return "AI spend uses ‘shift to smaller models’ — higher % applies ~18% savings on the shifted slice. Azure levers add commitment discounts and rightsizing-style trims in the same mock bundle.";
  }
  if (q.includes("margin") || q.includes("delivery") || q.includes("cpd")) {
    return "Cost per delivery is the hero efficiency KPI; tech-spend-to-revenue ratio shows digital load — both update with scenario levers (mock).";
  }
  if (q.includes("export") || q.includes("report") || q.includes("pdf")) {
    return "Use ‘Print report’ to open a print-friendly Executive Impact layout (browser Print to PDF).";
  }

  return `Total digital spend (baseline month) is about ${spend}. Try keywords: savings, cloud, AI, margin, export.`;
}

export const SUGGESTED_PROMPTS = [
  "What are the biggest savings opportunities?",
  "How is Azure hosting split?",
  "How do I tame forecast uncertainty?",
] as const;
