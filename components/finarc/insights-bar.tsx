"use client";

import { useState } from "react";
import type { FinArcSnapshot } from "@/lib/data";
import { useFinArcStore } from "@/lib/finarc-store";
import { projectScenario } from "@/lib/projection";
import { answerInsightPrompt, SUGGESTED_PROMPTS } from "@/lib/insights";
import { cn } from "@/lib/utils";

export function InsightsBar({ snapshot }: { snapshot: FinArcSnapshot }) {
  const levers = useFinArcStore((s) => s.levers);
  const horizonId = useFinArcStore((s) => s.horizonId);
  const displayCurrency = useFinArcStore((s) => s.displayCurrency);
  const [q, setQ] = useState("");
  const [reply, setReply] = useState<string | null>(null);

  const projection = projectScenario(snapshot, levers, horizonId);

  function ask(text: string) {
    setQ(text);
    setReply(answerInsightPrompt(text, snapshot, projection, displayCurrency));
  }

  return (
    <section className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6">
      <h2 className="text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
        Ask about the budget
      </h2>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        Simulated Q&amp;A (US-12) — keyword rules only, no LLM.
      </p>
      <div className="no-print mt-3 flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => ask(p)}
            className={cn(
              "rounded-full border border-[hsl(var(--border))] px-3 py-1 text-xs",
              "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]",
            )}
          >
            {p}
          </button>
        ))}
      </div>
      <div className="no-print mt-4 flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(q)}
          placeholder="Ask anything about the budget…"
          className="min-w-0 flex-1 rounded-md border border-[hsl(var(--input))] bg-[hsl(var(--background))] px-3 py-2 text-sm text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
        />
        <button
          type="button"
          onClick={() => ask(q)}
          className="rounded-md bg-[hsl(var(--primary))] px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))]"
        >
          Ask
        </button>
      </div>
      {reply ? (
        <p className="mt-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-3 text-sm leading-relaxed text-[hsl(var(--foreground))]">
          {reply}
        </p>
      ) : null}
    </section>
  );
}
