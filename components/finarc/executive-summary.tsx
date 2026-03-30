"use client";

import { cn } from "@/lib/utils";
import {
  costPerDelivery,
  digitalSpendToRevenueRatio,
  totalDigitalSpend,
} from "@/lib/metrics";
import type { FinArcSnapshot } from "@/lib/data";

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatPct(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}

export function ExecutiveSummary({ snapshot }: { snapshot: FinArcSnapshot }) {
  const { baseline, trendHistory, meta } = snapshot;
  const spend = totalDigitalSpend(baseline.pillars);
  const cpd = costPerDelivery(baseline);
  const intensity = digitalSpendToRevenueRatio(baseline);

  let momPct: number | null = null;
  if (trendHistory && trendHistory.length >= 2) {
    const prev = trendHistory[trendHistory.length - 2]!.techSpendUsd;
    const cur = trendHistory[trendHistory.length - 1]!.techSpendUsd;
    if (prev > 0) momPct = (cur - prev) / prev;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KpiCard
        label="Total digital spend"
        value={formatUsd(spend)}
        sub={momPct !== null ? `MoM ${momPct >= 0 ? "+" : ""}${formatPct(momPct)}` : undefined}
      />
      <KpiCard label="Cost / delivery" value={formatUsd(cpd)} sub="Primary efficiency KPI" />
      <KpiCard
        label="Tech spend ÷ revenue"
        value={formatPct(intensity)}
        sub="Digital load on revenue"
      />
      <div
        className={cn(
          "rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4",
          "ring-1 ring-[hsl(var(--warning)/0.35)]",
        )}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
          Top anomaly
        </p>
        <p className="mt-2 text-sm leading-snug text-[hsl(var(--foreground))]">
          {meta?.topAnomalySummary ?? "No anomaly flagged (mock)."}
        </p>
      </div>
    </section>
  );
}

function KpiCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-[hsl(var(--foreground))]">
        {value}
      </p>
      {sub ? (
        <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{sub}</p>
      ) : null}
    </div>
  );
}
