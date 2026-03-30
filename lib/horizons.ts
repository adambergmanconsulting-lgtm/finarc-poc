/**
 * Preset planning horizons (US-14) — avoid magic strings across charts and levers.
 */
export type HorizonId = "12m" | "3y";

export interface HorizonPreset {
  id: HorizonId;
  label: string;
  /** Approximate month count for stub projection curves. */
  monthSpan: number;
}

export const HORIZON_PRESETS: readonly HorizonPreset[] = [
  { id: "12m", label: "12 months", monthSpan: 12 },
  { id: "3y", label: "3 years", monthSpan: 36 },
] as const;

export function getHorizonPreset(id: HorizonId): HorizonPreset | undefined {
  return HORIZON_PRESETS.find((h) => h.id === id);
}
