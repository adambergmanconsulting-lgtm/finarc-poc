import { getFinArcSnapshot } from "@/lib/data";
import { DashboardShell } from "@/components/finarc/dashboard-shell";

export default async function Home() {
  const snapshot = await getFinArcSnapshot();

  return <DashboardShell initialSnapshot={snapshot} />;
}
