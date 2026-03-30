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
import type { TrendPoint } from "@/lib/data";

export function TrendChart({ points }: { points: TrendPoint[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const data = points.map((p) => ({
    month: p.periodId.slice(5),
    revenue: p.revenueUsd / 1_000_000,
    techSpend: p.techSpendUsd / 1_000,
    cpd: p.techSpendUsd / p.deliveries,
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
            tickFormatter={(v) => `$${v}M`}
            label={{ value: "Revenue ($M)", angle: -90, position: "insideLeft", fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(v) => `$${v}k`}
            label={{ value: "Tech spend ($k)", angle: 90, position: "insideRight", fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--popover))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
            }}
            labelStyle={{ color: "hsl(var(--foreground))" }}
            formatter={(value, name) => {
              const v = typeof value === "number" ? value : Number(value);
              if (name === "revenue") return [`$${v.toFixed(2)}M`, "Revenue"];
              if (name === "techSpend") return [`$${(v * 1000).toLocaleString()}`, "Tech spend"];
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
        Cost per delivery trends with tech spend — see lever playground for projected trajectory (next).
      </p>
    </div>
  );
}
