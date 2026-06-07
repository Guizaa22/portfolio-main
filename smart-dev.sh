#!/bin/bash

# Next.js Auto-Restart Dev Server
# Automatically restarts dev server when build is triggered

SIGNAL_FILE="/tmp/${PWD##*/}-build-signal"
PID_FILE="/tmp/${PWD##*/}-dev-pid"

echo $$ > "$PID_FILE"

restart_dev() {
    echo "Build detected. Restarting dev server..."
    
    if [ -n "$DEV_PID" ]; then
        kill -TERM $DEV_PID 2>/dev/null || true
        sleep 2
        kill -KILL $DEV_PID 2>/dev/null || true
    fi
    
    pkill -f "next dev" || true
    sleep 1
    rm -f "$SIGNAL_FILE"
    
    npm run dev &
    DEV_PID=$!
    echo "Dev server restarted (PID: $DEV_PID)"
}

cleanup() {
    echo "Stopping dev server..."
    if [ -n "$DEV_PID" ]; then
        kill -TERM $DEV_PID 2>/dev/null || true
        sleep 1
        kill -KILL $DEV_PID 2>/dev/null || true
    fi
    pkill -f "next dev" || true
    rm -f "$SIGNAL_FILE" "$PID_FILE"
    exit 0
}

trap cleanup SIGINT SIGTERM

echo "Starting development server for ${PWD##*/}..."

pkill -f "next dev" || true
sleep 1

npm run dev &
DEV_PID=$!
echo "Development server started (PID: $DEV_PID)"

# Watch for build signal
while true; do
    if [ -f "$SIGNAL_FILE" ]; then
        restart_dev
    fi
    sleep 1
done 