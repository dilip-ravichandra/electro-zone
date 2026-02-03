#!/bin/bash
# ElectroZone - Backend_1 & Frontend_1 Launcher for macOS/Linux

echo ""
echo "========================================"
echo "ElectroZone Backend_1 & Frontend_1"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed"
    exit 1
fi

# Start Backend_1
echo "Starting Backend_1..."
cd "$( cd "$(dirname "$0")" && pwd )/backend_1"
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start Frontend_1
echo "Starting Frontend_1..."
cd "$( cd "$(dirname "$0")" && pwd )/frontend_1"
npm start &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Services Launched!"
echo "========================================"
echo ""
echo "Backend: http://localhost:5001"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for both processes
wait
