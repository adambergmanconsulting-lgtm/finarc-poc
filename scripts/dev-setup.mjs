#!/usr/bin/env node
/**
 * Cross-platform dev setup: Node version check + npm install.
 * Mirrors the intent of MiniDataMesh `npm run dev:setup`.
 */
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MIN_NODE = 18;

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function main() {
  const major = Number(process.version.slice(1).split(".")[0]);
  if (Number.isNaN(major) || major < MIN_NODE) {
    console.error(`[finarc-poc] Node.js ${MIN_NODE}+ required. Current: ${process.version}`);
    process.exit(1);
  }
  console.log(`[finarc-poc] Node ${process.version} OK. Installing dependencies…`);
  execSync("npm install", { stdio: "inherit", cwd: root, shell: true });
  console.log("[finarc-poc] Done. Run: npm run dev   or   .\\scripts\\start.ps1");
}

main();
