import type { FinArcSnapshot } from "@/lib/data";
import type { ProjectionResult } from "@/lib/projection";

/** Payload for print/PDF/export — keeps document layout decoupled from React trees. */
export interface ExecutiveReportPayload {
  generatedAt: string;
  baselinePeriodId: string;
  summaryLines: string[];
  projection?: ProjectionResult;
}

export function buildExecutiveReportPayload(
  snapshot: FinArcSnapshot,
  projection?: ProjectionResult,
): ExecutiveReportPayload {
  return {
    generatedAt: new Date().toISOString(),
    baselinePeriodId: snapshot.baseline.periodId,
    summaryLines: [`Baseline period ${snapshot.baseline.periodId} (mock).`],
    projection,
  };
}
