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
  if (q.includes("cloud") || q.includes("azure")) {
    const n = snapshot.baseline.cloudBreakdown?.lines.length ?? 0;
    return n > 0
      ? `Cloud is broken into ${n} mock Azure line items below the KPIs — start with compute vs egress when you explain variance.`
      : "Cloud is a single pillar total in this snapshot — add a `cloudBreakdown` in the data adapter for hosting detail.";
  }
  if (q.includes("ai") || q.includes("model")) {
    return "AI spend uses the lever ‘shift to smaller models’ — higher % reduces the AI pillar in the mock formula (~18% on shifted volume).";
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
  "What happens to cost per delivery if I move the AI lever?",
] as const;
