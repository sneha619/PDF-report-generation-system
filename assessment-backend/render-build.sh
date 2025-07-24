#!/bin/bash
set -e

# Step 1: Build frontend
cd ../assessment-frontend
npm install
npm run build

# Step 2: Remove old build in backend (if exists)
rm -rf ../assessment-backend/build

# Step 3: Move new build into backend
mv build ../assessment-backend/

# Step 4: Setup backend
cd ../assessment-backend
npm install

# Step 5: Install Puppeteer Chromium for Render
npx puppeteer browsers install chrome
