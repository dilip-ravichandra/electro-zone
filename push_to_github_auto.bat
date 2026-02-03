@echo off
REM Automated helper: init, commit, create GitHub repo (via gh) or add remote, then push
REM Usage: run from repository root. Provide GitHub username and repo name when prompted.

if not exist .git (
  echo Initializing git repository...
  git init
)

echo Staging changes...
git add --all
git commit -m "Initial commit: add frontend and backend" 2>nul || echo "No changes to commit"

set /p USERNAME=GitHub username (default: dilip-ravichandra): 
if "%USERNAME%"=="" set USERNAME=dilip-ravichandra
set /p REPO=Repository name (default: electrozone): 
if "%REPO%"=="" set REPO=electrozone

echo Checking for GitHub CLI (gh)...
where gh >nul 2>&1
if %ERRORLEVEL%==0 (
  echo Found gh. Verifying authentication...
  gh auth status >nul 2>&1
  if %ERRORLEVEL% NEQ 0 (
    echo You are not authenticated with gh. Run: gh auth login
    exit /b 1
  )
  echo Creating repository %USERNAME%/%REPO% and pushing...
  gh repo create %USERNAME%/%REPO% --public --source=. --remote=origin --push
  if %ERRORLEVEL% EQU 0 (
    echo Repository created and pushed via gh.
    exit /b 0
  ) else (
    echo gh failed to create/push. Falling back to manual remote.
  )
)

echo Using manual remote flow (HTTPS).
set REMOTE_URL=https://github.com/%USERNAME%/%REPO%.git

git remote get-url origin >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  echo Remote "origin" already exists. Updating URL to %REMOTE_URL%...
  git remote set-url origin %REMOTE_URL%
) else (
  git remote add origin %REMOTE_URL%
)

git branch -M main
echo Pushing to %REMOTE_URL%...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
  echo Push successful.
) else (
  echo Push failed. Check credentials and remote URL.
)

echo Done.
