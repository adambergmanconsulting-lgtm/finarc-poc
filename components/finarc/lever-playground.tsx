"use client";

import { formatCurrencyAmount } from "@/lib/currency";
import { HORIZON_PRESETS } from "@/lib/horizons";
import { projectScenario } from "@/lib/projection";
import { useFinArcStore } from "@/lib/finarc-store";
import { SCENARIO_PRESET_OPTIONS } from "@/lib/scenario-presets";
import { cn } from "@/lib/utils";
import type { FinArcSnapshot } from "@/lib/data";

function LeverSlider({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  id: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-[hsl(var(--foreground))]" htmlFor={id}>
        {label}
      </label>
      <div className="mt-2 flex items-center gap-4">
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            "h-2 w-full cursor-pointer appearance-none rounded-full",
            "accent-[hsl(var(--primary))] bg-[hsl(var(--muted))]",
          )}
        />
        <span className="w-12 tabular-nums text-sm text-[hsl(var(--foreground))]">{value}%</span>
      </div>
    </div>
  );
}

export function LeverPlayground({ snapshot }: { snapshot: FinArcSnapshot }) {
  const levers = useFinArcStore((s) => s.levers);
  const setLevers = useFinArcStore((s) => s.setLevers);
  const horizonId = useFinArcStore((s) => s.horizonId);
  const setHorizonId = useFinArcStore((s) => s.setHorizonId);
  const displayCurrency = useFinArcStore((s) => s.displayCurrency);
  const scenarioPresetId = useFinArcStore((s) => s.scenarioPresetId);
  const setScenarioPresetId = useFinArcStore((s) => s.setScenarioPresetId);

  const projection = projectScenario(snapshot, levers, horizonId);
  const stress = snapshot.meta?.scenarioStress;

  return (
    <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
        Lever playground
      </h2>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Choose a data preset, then tune strategy — projection updates instantly (mock formulas). Amounts
        stored in SEK; display uses mock FX for EUR/USD.
      </p>

      <div className="mt-6">
        <span className="text-sm font-medium text-[hsl(var(--foreground))]">Scenario preset</span>
        <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {SCENARIO_PRESET_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              title={opt.description}
              onClick={() => setScenarioPresetId(opt.id)}
              className={cn(
                "rounded-md border px-3 py-2 text-left text-sm transition-colors",
                scenarioPresetId === opt.id
                  ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--foreground))]"
                  : "border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]",
              )}
            >
              <span className="font-medium text-[hsl(var(--foreground))]">{opt.label}</span>
              <span className="mt-0.5 block text-xs text-[hsl(var(--muted-foreground))]">
                {opt.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {stress ? (
        <p className="mt-4 rounded-lg border border-[hsl(var(--warning)/0.45)] bg-[hsl(var(--warning)/0.08)] px-3 py-2 text-sm text-[hsl(var(--foreground))]">
          Stress mode: cloud and SaaS baselines are inflated and forecast uncertainty is wide — use Azure
          levers to show how commitments and governance improve predictability (mock).
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <LeverSlider
          id="lever-ai"
          label="Shift high-cost AI inference to smaller models"
          value={levers.aiShiftToSmallerModelsPct}
          onChange={(n) => setLevers({ aiShiftToSmallerModelsPct: n })}
        />
        <LeverSlider
          id="lever-azure-commit"
          label="Azure commitment coverage (RI / savings plan style)"
          value={levers.azureCommitCoveragePct}
          onChange={(n) => setLevers({ azureCommitCoveragePct: n })}
        />
        <LeverSlider
          id="lever-azure-gov"
          label="Azure rightsizing & governance (tagging, idle capacity)"
          value={levers.azureRightsizingGovernancePct}
          onChange={(n) => setLevers({ azureRightsizingGovernancePct: n })}
        />

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

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            Projected savings (illustrative)
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-[hsl(var(--positive))]">
            {formatCurrencyAmount(projection.headlineSavings, displayCurrency)}
          </p>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
            Annualized mock over {horizonId === "3y" ? "3-year" : "12-month"} horizon — AI + Azure levers;
            not audit-grade.
          </p>
        </div>
        <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
            Forecast uncertainty (mock half-width / year)
          </p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-[hsl(var(--foreground))]">
            ±{formatCurrencyAmount(projection.forecastUncertaintyHalfWidthAnnualSek, displayCurrency)}
          </p>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
            Narrows as commitment and governance levers rise; illustrative band for CFO narrative only.
          </p>
        </div>
      </div>
    </section>
  );
}
