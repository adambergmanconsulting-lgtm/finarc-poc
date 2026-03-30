import type { FinArcSnapshot } from "../types";

/**
 * Contract for any backing system: mock JSON, FOCUS pipeline, cloud billing APIs, etc.
 * Implementations live under `lib/data/adapters/<name>/`.
 */
export interface FinArcDataSource {
  getSnapshot(): Promise<FinArcSnapshot>;
}
