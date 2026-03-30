"use client";

import { useEffect, useMemo } from "react";
import type { FinArcSnapshot } from "@/lib/data";
import { useFinArcStore } from "@/lib/finarc-store";
import { applyScenarioPreset } from "@/lib/scenario-presets";
import { CurrencySwitcher } from "./currency-switcher";
import { ExecutiveSummary } from "./executive-summary";
import { LeverPlayground } from "./lever-playground";
import { ExecutiveReportExport } from "./executive-report-export";
import { InsightsBar } from "./insights-bar";
import { RecommendationsPanel } from "./recommendations-panel";
import { ScenarioCompare } from "./scenario-compare";
import { SourceDataCloudPanel } from "./source-data-cloud";
import { TrendChart } from "./trend-chart";

export function DashboardShell({ initialSnapshot }: { initialSnapshot: FinArcSnapshot }) {
  const snapshot = useFinArcStore((s) => s.snapshot);
  const setSnapshot = useFinArcStore((s) => s.setSnapshot);
  const scenarioPresetId = useFinArcStore((s) => s.scenarioPresetId);

  useEffect(() => {
    setSnapshot(initialSnapshot);
  }, [initialSnapshot, setSnapshot]);

  const raw = snapshot ?? initialSnapshot;
  const active = useMemo(
    () => applyScenarioPreset(raw, scenarioPresetId),
    [raw, scenarioPresetId],
  );
  const trend = active.trendHistory?.length ? active.trendHistory : [];
  const displayCurrency = useFinArcStore((s) => s.displayCurrency);

  return (
    <div className="min-h-screen bg-[hsl(var(--background))]">
      <header className="flex flex-col gap-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
            FinArc
          </h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Digital technology economics — {active.baseline.periodId} (mock data, SEK-native)
            {scenarioPresetId === "azure_uncontrolled" ? (
              <span className="text-[hsl(var(--warning))]"> · Azure stress preset</span>
            ) : null}
          </p>
        </div>
        <CurrencySwitcher />
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6">
        <ExecutiveSummary snapshot={active} />

        <SourceDataCloudPanel
          cloudTotalSek={active.baseline.pillars.cloud}
          breakdown={active.baseline.cloudBreakdown}
          displayCurrency={displayCurrency}
        />

        <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
          <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Revenue vs tech spend
          </h2>
          {trend.length > 0 ? (
            <TrendChart points={trend} displayCurrency={displayCurrency} />
          ) : (
            <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">No trend history in snapshot.</p>
          )}
        </section>

        <LeverPlayground snapshot={active} />

        <ScenarioCompare snapshot={active} />

        <RecommendationsPanel snapshot={active} />

        <InsightsBar snapshot={active} />

        <ExecutiveReportExport snapshot={active} />
      </main>
    </div>
  );
}
