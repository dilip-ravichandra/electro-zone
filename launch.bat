@echo off
REM ElectroZone - Backend_1 & Frontend_1 Launcher
REM This script starts both services in separate windows

echo.
echo ========================================
echo ElectroZone Backend_1 ^& Frontend_1 
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if errorlevel 1 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)

REM Check and install Backend_1 dependencies if needed
echo Checking Backend_1 dependencies...
if not exist "C:\html\electrozone\backend_1\node_modules" (
    echo Installing Backend_1 dependencies...
    cd /d C:\html\electrozone\backend_1
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install Backend_1 dependencies
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo Starting Services...
echo ========================================
echo.

echo Starting Backend_1 on port 5001...
start cmd /k "cd /d C:\html\electrozone\backend_1 && npm run dev"

timeout /t 4 /nobreak

echo Starting Static HTML Frontend on port 8000...
REM Try Python first, fallback to Node.js
where python >nul 2>nul
if errorlevel 1 (
    echo Using Node.js server...
    start cmd /k "cd /d C:\html\electrozone\frontend_1 && node server.js"
) else (
    echo Using Python server...
    start cmd /k "cd /d C:\html\electrozone\frontend_1\public && python -m http.server 8000"
)

echo.
echo ========================================
echo Services Launching!
echo ========================================
echo.
echo Backend API: http://localhost:5001
echo Frontend: http://localhost:8000/auth.html
echo.
echo Please wait 5-10 seconds for services to fully start...
echo.
echo Troubleshooting:
echo - If port 5001 is in use, modify backend_1\.env
echo - If port 8000 is in use, change to another port
echo - If stuck, check the individual terminal windows
echo.
echo Press any key to close this window...
pause
