#!/bin/bash

echo "👀 Watching for changes... Press Ctrl+C to stop"

# Function to build and restart
build_and_restart() {
    echo "🔄 Change detected! Rebuilding..."
    pkill -f "npm run dev" || true
    pkill -f "next dev" || true
    
    if npm run build; then
        echo "✅ Build successful! Restarting dev server..."
        npm run dev &
    else
        echo "❌ Build failed! Fix errors and save again."
    fi
}

# Watch for changes in src directory
if command -v inotifywait &> /dev/null; then
    while inotifywait -r -e modify,create,delete src/; do
        build_and_restart
    done
else
    echo "Install inotify-tools for automatic watching: sudo apt install inotify-tools"
    echo "For now, just run: ./build-and-restart.sh manually"
fi 