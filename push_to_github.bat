@echo off
REM Helper: initialize local git repo and push to GitHub
REM Usage: run from repository root (double-click or run in PowerShell/CMD)

:: Initialize git if needed
if not exist .git (
  echo Initializing git repository...
  git init
)

echo Creating initial commit (if any changes)...
git add --all
git commit -m "Initial commit: add frontend and backend" 2>nul || echo "No changes to commit"

set /p REMOTE_URL=Enter remote URL (HTTPS or SSH), e.g. https://github.com/yourname/electrozone.git : 
if "%REMOTE_URL%"=="" (
  echo No remote provided. Exiting.
  exit /b 1
)

REM Add remote if not present
git remote get-url origin >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  git remote add origin %REMOTE_URL%
) else (
  echo Remote "origin" already exists. Skipping add.
)

git branch -M main
echo Pushing to remote origin/main...
git push -u origin main

echo Done.
