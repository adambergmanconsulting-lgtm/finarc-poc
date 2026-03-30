"use client";

import type { FinArcSnapshot } from "@/lib/data";
import { useFinArcStore } from "@/lib/finarc-store";
import { projectScenario } from "@/lib/projection";
import { buildRecommendations } from "@/lib/recommendations";

export function RecommendationsPanel({ snapshot }: { snapshot: FinArcSnapshot }) {
  const levers = useFinArcStore((s) => s.levers);
  const horizonId = useFinArcStore((s) => s.horizonId);
  const displayCurrency = useFinArcStore((s) => s.displayCurrency);

  const projection = projectScenario(snapshot, levers, horizonId);
  const items = buildRecommendations(snapshot, levers, projection, displayCurrency);

  return (
    <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
        Top recommendations
      </h2>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Rule-based (US-11) — refreshes when levers or horizon change.
      </p>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-[hsl(var(--foreground))]">
        {items.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ol>
    </section>
  );
}
