#!/usr/bin/env node
/**
 * Remove `.next` to fix corrupted Turbopack / build manifests (ENOENT on app-build-manifest.json).
 * Stop `npm run dev` before running, or the delete may fail on Windows (file locks).
 */
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), ".next");
try {
  fs.rmSync(dir, { recursive: true, force: true });
  console.log("[finarc-poc] Removed .next — run npm run dev again.");
} catch (e) {
  console.error("[finarc-poc] Could not remove .next:", e.message);
  console.error("  → Stop `npm run dev` (and any `next build`), then run: npm run clean");
  process.exit(1);
}
