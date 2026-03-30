#!/usr/bin/env node
/**
 * Build + deploy via Vercel CLI (same end state as a linked GitHub → Vercel deploy).
 * First time: run `npx vercel login` once.
 *
 * Usage:
 *   npm run deploy        → preview deployment
 *   npm run deploy:prod   → production
 */
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const prod = process.argv.includes("--prod");

function main() {
  console.log("[finarc-poc] Building…");
  execSync("npm run build", { stdio: "inherit", cwd: root });

  const cmd = prod ? "npx --yes vercel --prod" : "npx --yes vercel";
  console.log(`[finarc-poc] Deploying (${prod ? "production" : "preview"})…`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

main();
