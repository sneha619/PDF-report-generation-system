#!/bin/bash
set -e

# Step 1: Build frontend
cd ../assessment-frontend
npm install
npm run build

# Step 2: Clean old build
rm -rf ../assessment-backend/build

# Step 3: Move build into backend
mv build ../assessment-backend/

# Step 4: Install backend dependencies
cd ../assessment-backend
npm install

# Step 5: Manually trigger Chromium download (new Puppeteer syntax)
node -e "import('puppeteer').then(p => p.default.launch().then(b => b.close()))"
