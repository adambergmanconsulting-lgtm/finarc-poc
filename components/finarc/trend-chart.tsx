"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { convertSekToDisplay, formatCurrencyAmount, type CurrencyCode } from "@/lib/currency";
import type { TrendPoint } from "@/lib/data";

function axisLabelRevenue(display: CurrencyCode): string {
  if (display === "SEK") return "Revenue (M SEK)";
  if (display === "EUR") return "Revenue (M €)";
  return "Revenue (M $)";
}

function axisLabelTech(display: CurrencyCode): string {
  if (display === "SEK") return "Tech spend (k SEK)";
  if (display === "EUR") return "Tech spend (k €)";
  return "Tech spend (k $)";
}

export function TrendChart({
  points,
  displayCurrency,
}: {
  points: TrendPoint[];
  displayCurrency: CurrencyCode;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = points.map((p, index) => ({
    index,
    month: p.periodId.slice(5),
    revenue: convertSekToDisplay(p.revenue, displayCurrency) / 1_000_000,
    techSpend: convertSekToDisplay(p.techSpend, displayCurrency) / 1_000,
  }));

  if (!mounted) {
    return (
      <div className="flex h-[320px] w-full min-w-0 items-center justify-center rounded-lg bg-[hsl(var(--muted)/0.35)] text-sm text-[hsl(var(--muted-foreground))]">
        Loading chart…
      </div>
    );
  }

  return (
    <div className="h-[320px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-[hsl(var(--border))]" />
          <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
          <YAxis
            yAxisId="left"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(v) => `${v.toFixed(1)}`}
            label={{
              value: axisLabelRevenue(displayCurrency),
              angle: -90,
              position: "insideLeft",
              fill: "hsl(var(--muted-foreground))",
              fontSize: 11,
            }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(v) => `${v.toFixed(0)}`}
            label={{
              value: axisLabelTech(displayCurrency),
              angle: 90,
              position: "insideRight",
              fill: "hsl(var(--muted-foreground))",
              fontSize: 11,
            }}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value, name, item) => {
              const payload = item?.payload as { index?: number } | undefined;
              const idx = payload?.index ?? 0;
              const p = points[idx];
              if (!p) return [String(value), String(name)];
              if (name === "revenue") {
                return [formatCurrencyAmount(p.revenue, displayCurrency), "Revenue"];
              }
              if (name === "techSpend") {
                return [formatCurrencyAmount(p.techSpend, displayCurrency), "Tech spend"];
              }
              return [String(value), String(name)];
            }}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            name="revenue"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="techSpend"
            name="techSpend"
            stroke="hsl(var(--chart-1))"
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <p className="mt-2 text-center text-xs text-[hsl(var(--muted-foreground))]">
        Cost per delivery moves with tech spend — lever playground applies projected trajectory (next).
      </p>
    </div>
  );
}
