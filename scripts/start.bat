@echo off
cd /d "%~dp0\.."
if not exist "node_modules\" (
  echo [finarc-poc] Running dev:setup...
  call npm run dev:setup
)
echo [finarc-poc] Starting dev server...
call npm run dev
