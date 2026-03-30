"use client";

import { useEffect } from "react";
import type { FinArcSnapshot } from "@/lib/data";
import { useFinArcStore } from "@/lib/finarc-store";
import { CurrencySwitcher } from "./currency-switcher";
import { ExecutiveSummary } from "./executive-summary";
import { LeverPlayground } from "./lever-playground";
import { SourceDataCloudPanel } from "./source-data-cloud";
import { TrendChart } from "./trend-chart";

export function DashboardShell({ initialSnapshot }: { initialSnapshot: FinArcSnapshot }) {
  const snapshot = useFinArcStore((s) => s.snapshot);
  const setSnapshot = useFinArcStore((s) => s.setSnapshot);

  useEffect(() => {
    setSnapshot(initialSnapshot);
  }, [initialSnapshot, setSnapshot]);

  const active = snapshot ?? initialSnapshot;
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
            Digital technology economics — baseline {active.baseline.periodId} (mock data, SEK-native)
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
      </main>
    </div>
  );
}
