"use client";

import { formatCurrencyAmount } from "@/lib/currency";
import type { FinArcSnapshot } from "@/lib/data";
import { useFinArcStore } from "@/lib/finarc-store";
import { scenarioMonthlyMetrics } from "@/lib/projection";
import { DEFAULT_LEVER_STATE } from "@/lib/levers";
import { cn } from "@/lib/utils";

export function ScenarioCompare({ snapshot }: { snapshot: FinArcSnapshot }) {
  const displayCurrency = useFinArcStore((s) => s.displayCurrency);
  const scenarioALevers = useFinArcStore((s) => s.scenarioALevers);
  const saveScenarioA = useFinArcStore((s) => s.saveScenarioA);
  const clearScenarioA = useFinArcStore((s) => s.clearScenarioA);
  const resetLeversToBaseline = useFinArcStore((s) => s.resetLeversToBaseline);

  const baselineM = scenarioMonthlyMetrics(snapshot, DEFAULT_LEVER_STATE);
  const scenarioM = scenarioALevers
    ? scenarioMonthlyMetrics(snapshot, scenarioALevers)
    : null;

  return (
    <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Scenario compare
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Baseline levers vs saved Scenario A (US-10). Adjust levers below, then save.
          </p>
        </div>
        <div className="no-print flex flex-wrap gap-2">
          <button
            type="button"
            onClick={saveScenarioA}
            className={cn(
              "rounded-md border border-[hsl(var(--primary))] bg-[hsl(var(--primary))] px-3 py-1.5 text-sm font-medium",
              "text-[hsl(var(--primary-foreground))] hover:opacity-90",
            )}
          >
            Save current as Scenario A
          </button>
          <button
            type="button"
            onClick={clearScenarioA}
            className="rounded-md border border-[hsl(var(--border))] px-3 py-1.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
          >
            Clear Scenario A
          </button>
          <button
            type="button"
            onClick={resetLeversToBaseline}
            className="rounded-md border border-[hsl(var(--border))] px-3 py-1.5 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]"
          >
            Reset levers to baseline
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[hsl(var(--border))] text-left text-[hsl(var(--muted-foreground))]">
              <th className="pb-2 pr-4 font-medium">Metric</th>
              <th className="pb-2 pr-4 font-medium">Baseline (no lever change)</th>
              <th className="pb-2 font-medium">Scenario A (saved)</th>
            </tr>
          </thead>
          <tbody className="text-[hsl(var(--foreground))]">
            <tr className="border-b border-[hsl(var(--border))]/70">
              <td className="py-2.5 pr-4">Monthly digital spend (mock)</td>
              <td className="py-2.5 pr-4 tabular-nums">
                {formatCurrencyAmount(baselineM.monthlyDigitalSpendSek, displayCurrency)}
              </td>
              <td className="py-2.5 tabular-nums">
                {scenarioM ? (
                  formatCurrencyAmount(scenarioM.monthlyDigitalSpendSek, displayCurrency)
                ) : (
                  <span className="text-[hsl(var(--muted-foreground))]">— save a scenario</span>
                )}
              </td>
            </tr>
            <tr className="border-b border-[hsl(var(--border))]/70">
              <td className="py-2.5 pr-4">Cost / delivery</td>
              <td className="py-2.5 pr-4 tabular-nums">
                {formatCurrencyAmount(baselineM.costPerDeliverySek, displayCurrency)}
              </td>
              <td className="py-2.5 tabular-nums">
                {scenarioM ? (
                  formatCurrencyAmount(scenarioM.costPerDeliverySek, displayCurrency)
                ) : (
                  <span className="text-[hsl(var(--muted-foreground))]">—</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="py-2.5 pr-4">AI lever (saved scenario)</td>
              <td className="py-2.5 pr-4 tabular-nums">{DEFAULT_LEVER_STATE.aiShiftToSmallerModelsPct}%</td>
              <td className="py-2.5 tabular-nums">
                {scenarioALevers ? `${scenarioALevers.aiShiftToSmallerModelsPct}%` : "—"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
