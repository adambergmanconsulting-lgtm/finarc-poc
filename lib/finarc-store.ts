import { create } from "zustand";
import type { FinArcSnapshot } from "@/lib/data";
import type { CurrencyCode } from "@/lib/currency";
import { DEFAULT_LEVER_STATE, type LeverState } from "@/lib/levers";
import type { HorizonId } from "@/lib/horizons";

export interface FinArcStoreState {
  snapshot: FinArcSnapshot | null;
  levers: LeverState;
  horizonId: HorizonId;
  /** Display only — snapshot amounts stay in SEK; EUR/USD use mock FX in `lib/currency.ts`. */
  displayCurrency: CurrencyCode;
  setSnapshot: (snapshot: FinArcSnapshot) => void;
  setLevers: (partial: Partial<LeverState>) => void;
  setHorizonId: (id: HorizonId) => void;
  setDisplayCurrency: (c: CurrencyCode) => void;
}

export const useFinArcStore = create<FinArcStoreState>((set) => ({
  snapshot: null,
  levers: DEFAULT_LEVER_STATE,
  horizonId: "12m",
  displayCurrency: "SEK",
  setSnapshot: (snapshot) => set({ snapshot }),
  setLevers: (partial) =>
    set((s) => ({
      levers: { ...s.levers, ...partial },
    })),
  setHorizonId: (horizonId) => set({ horizonId }),
  setDisplayCurrency: (displayCurrency) => set({ displayCurrency }),
}));
