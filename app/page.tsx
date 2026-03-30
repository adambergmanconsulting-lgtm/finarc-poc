import { getFinArcSnapshot } from "@/lib/data";
import { totalDigitalSpend } from "@/lib/metrics";

export default async function Home() {
  const snapshot = await getFinArcSnapshot();
  const { baseline } = snapshot;
  const digitalSpend = totalDigitalSpend(baseline.pillars);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold tracking-tight">FinArc POC</h1>
      <p className="mt-2 max-w-md text-center text-sm text-[hsl(var(--muted-foreground))]">
        Scaffold ready. Data flows from <code className="rounded bg-[hsl(var(--muted))] px-1">@/lib/data</code>{" "}
        (mock adapter; replace via <code className="rounded bg-[hsl(var(--muted))] px-1">FinArcDataSource</code>
        ).
      </p>
      <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
        Baseline <span className="text-[hsl(var(--foreground))]">{baseline.periodId}</span> — total digital
        spend (mock):{" "}
        <span className="font-medium tabular-nums text-[hsl(var(--foreground))]">
          ${digitalSpend.toLocaleString("en-US")}
        </span>
      </p>
    </main>
  );
}
