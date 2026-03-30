/**
 * Interactive lever positions — kept separate from `FinArcSnapshot` so UI/store can change
 * them without mutating baseline adapter data. Add fields as the lever playground grows.
 */
export interface LeverState {
  /** % of high-cost AI inference shifted to smaller models / SLM (0–100). */
  aiShiftToSmallerModelsPct: number;
}

export const DEFAULT_LEVER_STATE: LeverState = {
  aiShiftToSmallerModelsPct: 0,
};
