"use client";

import { formatCurrencyAmount, type CurrencyCode } from "@/lib/currency";
import type { CloudHostingBreakdown } from "@/lib/data";
import { cloudBreakdownMatchesPillar } from "@/lib/cloud-breakdown";

export function SourceDataCloudPanel({
  cloudTotalSek,
  breakdown,
  displayCurrency,
}: {
  cloudTotalSek: number;
  breakdown: CloudHostingBreakdown | undefined;
  displayCurrency: CurrencyCode;
}) {
  if (!breakdown?.lines.length) {
    return (
      <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
        <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Source data — cloud hosting
        </h2>
        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
          No granular cloud breakdown in this snapshot — only the **Cloud** pillar total (
          {formatCurrencyAmount(cloudTotalSek, displayCurrency)}). Wire an adapter that maps Azure Cost
          Management / FOCUS rows into <code className="rounded bg-[hsl(var(--muted))] px-1">cloudBreakdown</code>.
        </p>
      </section>
    );
  }

  const aligned = cloudBreakdownMatchesPillar(cloudTotalSek, breakdown);

  return (
    <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Source data — {breakdown.provider === "azure" ? "Azure" : breakdown.provider} hosting
        </h2>
        {breakdown.regionSummary ? (
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{breakdown.regionSummary}</p>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
        Mock line items (SEK-native). Real integrations replace this with CM export / FOCUS-aligned rows
        mapped in <code className="rounded bg-[hsl(var(--muted))] px-1">lib/data/adapters/&lt;provider&gt;</code>.
      </p>

      {!aligned ? (
        <p className="mt-3 rounded-md border border-[hsl(var(--destructive)/0.45)] bg-[hsl(var(--destructive)/0.08)] px-3 py-2 text-sm text-[hsl(var(--destructive))]">
          Line items do not sum to the Cloud pillar — fix the adapter or mock data.
        </p>
      ) : null}

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[hsl(var(--border))] text-left text-[hsl(var(--muted-foreground))]">
              <th className="pb-2 pr-4 font-medium">Component</th>
              <th className="pb-2 pr-4 font-medium">Detail</th>
              <th className="pb-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {breakdown.lines.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[hsl(var(--border))]/60 text-[hsl(var(--foreground))]"
              >
                <td className="py-2.5 pr-4 align-top">{row.label}</td>
                <td className="max-w-md py-2.5 pr-4 align-top text-[hsl(var(--muted-foreground))]">
                  {row.detail ?? "—"}
                </td>
                <td className="py-2.5 text-right tabular-nums font-medium">
                  {formatCurrencyAmount(row.amount, displayCurrency)}
                </td>
              </tr>
            ))}
            <tr className="text-[hsl(var(--foreground))]">
              <td colSpan={2} className="pt-3 font-semibold">
                Cloud pillar total
              </td>
              <td className="pt-3 text-right tabular-nums font-semibold">
                {formatCurrencyAmount(cloudTotalSek, displayCurrency)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
