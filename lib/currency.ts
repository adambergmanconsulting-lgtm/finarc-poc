/**
 * All FinArc snapshot amounts are stored in **SEK** (canonical). Display can switch to EUR/USD
 * using mock FX rates — replace with live rates when integrating treasury data.
 */

export type CurrencyCode = "SEK" | "EUR" | "USD";

export const CANONICAL_CURRENCY = "SEK" satisfies CurrencyCode;

/** Mock: SEK per one unit of foreign currency (PoC only). */
export const MOCK_SEK_PER_EUR = 11.25;
export const MOCK_SEK_PER_USD = 10.65;

export const DISPLAY_CURRENCIES: readonly CurrencyCode[] = ["SEK", "EUR", "USD"];

export function convertSekToDisplay(amountSek: number, target: CurrencyCode): number {
  if (target === "SEK") return amountSek;
  if (target === "EUR") return amountSek / MOCK_SEK_PER_EUR;
  return amountSek / MOCK_SEK_PER_USD;
}

const LOCALES: Record<CurrencyCode, string> = {
  SEK: "sv-SE",
  EUR: "sv-SE",
  USD: "en-US",
};

/** Format a value already stored in SEK for the chosen display currency. */
export function formatCurrencyAmount(amountSek: number, display: CurrencyCode): string {
  const v = convertSekToDisplay(amountSek, display);
  return new Intl.NumberFormat(LOCALES[display], {
    style: "currency",
    currency: display,
    maximumFractionDigits: display === "SEK" ? 0 : 2,
  }).format(v);
}
