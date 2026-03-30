# FinArc POC — quick start (same idea as MiniDataMesh start.ps1)
$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)
if (-not (Test-Path "node_modules")) {
    Write-Host "[finarc-poc] Running dev:setup (npm install)..."
    npm run dev:setup
}
Write-Host "[finarc-poc] Starting dev server..."
npm run dev
