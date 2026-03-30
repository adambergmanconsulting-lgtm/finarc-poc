import type { FinArcDataSource } from "./adapters/types";
import { createMockFinArcDataSource } from "./adapters/mock";
import type { FinArcSnapshot } from "./types";

export type { FinArcSnapshot, BaselinePeriod, ForecastStub, PillarAmounts, PeriodId } from "./types";
export type { FinArcDataSource } from "./adapters/types";
export { createMockFinArcDataSource } from "./adapters/mock";

let activeSource: FinArcDataSource = createMockFinArcDataSource();

/** Swap for tests or when wiring a real integration (e.g. server route + FOCUS ingest). */
export function setFinArcDataSource(source: FinArcDataSource): void {
  activeSource = source;
}

/** Single entry for the app: always returns the active `FinArcDataSource`. */
export async function getFinArcSnapshot(): Promise<FinArcSnapshot> {
  return activeSource.getSnapshot();
}
