"use client";

import type { FinArcSnapshot } from "@/lib/data";
import { useFinArcStore } from "@/lib/finarc-store";
import { projectScenario } from "@/lib/projection";
import { buildRecommendations } from "@/lib/recommendations";
import { buildExecutiveReportPayload } from "@/lib/report";

export function ExecutiveReportExport({ snapshot }: { snapshot: FinArcSnapshot }) {
  const levers = useFinArcStore((s) => s.levers);
  const horizonId = useFinArcStore((s) => s.horizonId);
  const displayCurrency = useFinArcStore((s) => s.displayCurrency);
  const scenarioALevers = useFinArcStore((s) => s.scenarioALevers);

  const projection = projectScenario(snapshot, levers, horizonId);
  const recommendations = buildRecommendations(snapshot, levers, projection, displayCurrency);
  const payload = buildExecutiveReportPayload(snapshot, {
    projection,
    displayCurrency,
    recommendations,
    scenarioALevers,
  });

  return (
    <section className="finarc-executive-report rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 print:border-0 print:shadow-none">
      <div className="no-print mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
            Executive Impact Report
          </h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            US-13 — use browser <strong>Print → Save as PDF</strong>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))]"
        >
          Print / PDF
        </button>
      </div>

      <div className="text-[hsl(var(--foreground))]">
        <h1 className="text-2xl font-bold tracking-tight print:text-black">FinArc — Executive Impact</h1>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))] print:text-neutral-700">
          Generated {new Date(payload.generatedAt).toLocaleString("sv-SE")} · Display currency:{" "}
          {displayCurrency}
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-sm leading-relaxed print:text-black">
          {payload.summaryLines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        {payload.recommendations?.length ? (
          <>
            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide print:text-black">
              Recommendations
            </h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm print:text-black">
              {payload.recommendations.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ol>
          </>
        ) : null}
        <p className="mt-8 text-xs text-[hsl(var(--muted-foreground))] print:text-neutral-600">
          Mock PoC — not for external distribution without validation.
        </p>
      </div>
    </section>
  );
}
