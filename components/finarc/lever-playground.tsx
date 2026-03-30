"use client";

import { formatCurrencyAmount } from "@/lib/currency";
import { HORIZON_PRESETS } from "@/lib/horizons";
import { projectScenario } from "@/lib/projection";
import { useFinArcStore } from "@/lib/finarc-store";
import { cn } from "@/lib/utils";
import type { FinArcSnapshot } from "@/lib/data";

export function LeverPlayground({ snapshot }: { snapshot: FinArcSnapshot }) {
  const levers = useFinArcStore((s) => s.levers);
  const setLevers = useFinArcStore((s) => s.setLevers);
  const horizonId = useFinArcStore((s) => s.horizonId);
  const setHorizonId = useFinArcStore((s) => s.setHorizonId);
  const displayCurrency = useFinArcStore((s) => s.displayCurrency);

  const projection = projectScenario(snapshot, levers, horizonId);

  return (
    <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
        Lever playground
      </h2>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Adjust strategy mix — projection updates instantly (mock formula on AI pillar). Amounts stored in
        SEK; display uses mock FX for EUR/USD.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">
            Shift high-cost AI inference to smaller models
          </label>
          <div className="mt-2 flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={100}
              value={levers.aiShiftToSmallerModelsPct}
              onChange={(e) =>
                setLevers({ aiShiftToSmallerModelsPct: Number(e.target.value) })
              }
              className={cn(
                "h-2 w-full cursor-pointer appearance-none rounded-full",
                "accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]",
              )}
            />
            <span className="w-12 tabular-nums text-sm text-[hsl(var(--foreground))]">
              {levers.aiShiftToSmallerModelsPct}%
            </span>
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-[hsl(var(--foreground))]">Planning horizon</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {HORIZON_PRESETS.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => setHorizonId(h.id)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm transition-colors",
                  horizonId === h.id
                    ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--foreground))]"
                    : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]",
                )}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
          Projected savings (illustrative)
        </p>
        <p className="mt-1 text-2xl font-semibold tabular-nums text-[hsl(var(--positive))]">
          {formatCurrencyAmount(projection.headlineSavings, displayCurrency)}
        </p>
        <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
          Annualized mock over {horizonId === "3y" ? "3-year" : "12-month"} horizon — not audit-grade.
        </p>
      </div>
    </section>
  );
}
