"use client";

import { DISPLAY_CURRENCIES, type CurrencyCode } from "@/lib/currency";
import { useFinArcStore } from "@/lib/finarc-store";
import { cn } from "@/lib/utils";

const LABELS: Record<CurrencyCode, string> = {
  SEK: "SEK",
  EUR: "EUR",
  USD: "USD",
};

export function CurrencySwitcher() {
  const displayCurrency = useFinArcStore((s) => s.displayCurrency);
  const setDisplayCurrency = useFinArcStore((s) => s.setDisplayCurrency);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-[hsl(var(--muted-foreground))]">
        Display
      </span>
      <div className="flex rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--background))] p-0.5">
        {DISPLAY_CURRENCIES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => setDisplayCurrency(code)}
            className={cn(
              "rounded px-2.5 py-1 text-xs font-medium transition-colors",
              displayCurrency === code
                ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]"
                : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]",
            )}
          >
            {LABELS[code]}
          </button>
        ))}
      </div>
    </div>
  );
}
