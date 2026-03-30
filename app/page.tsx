export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-semibold tracking-tight">FinArc POC</h1>
      <p className="mt-2 max-w-md text-center text-sm text-[hsl(var(--muted-foreground))]">
        Scaffold ready. Run <code className="rounded bg-[hsl(var(--muted))] px-1">npm run dev</code>{" "}
        locally or <code className="rounded bg-[hsl(var(--muted))] px-1">npm run deploy</code> for
        Vercel.
      </p>
    </main>
  );
}
