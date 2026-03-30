import type { FinArcDataSource } from "../types";
import { MOCK_FINARC_SNAPSHOT } from "./mock-snapshot";

export function createMockFinArcDataSource(): FinArcDataSource {
  return {
    async getSnapshot() {
      return structuredClone(MOCK_FINARC_SNAPSHOT);
    },
  };
}

export { MOCK_FINARC_SNAPSHOT } from "./mock-snapshot";
