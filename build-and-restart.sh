#!/bin/bash

echo "🔄 Stopping any running dev servers..."
# Kill any existing npm run dev processes
pkill -f "npm run dev" || true
pkill -f "next dev" || true

echo "🏗️  Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Starting dev server..."
    npm run dev
else
    echo "❌ Build failed! Not starting dev server."
    exit 1
fi 