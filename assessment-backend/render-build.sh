#!/bin/bash
set -e

# Step 1: Build frontend
cd ../assessment-frontend
npm install
npm run build

# Step 2: Move build into backend
mv -f build ../assessment-backend/

# Step 3: Install backend dependencies
cd ../assessment-backend
npm install

# Step 4: Install Puppeteer Chromium (required on Render)
npx puppeteer browsers install chrome
