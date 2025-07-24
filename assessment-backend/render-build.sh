#!/bin/bash
set -e

# Step 1: Build frontend
cd ../assessment-frontend
npm install
npm run build

# Step 2: Clean previous build in backend
rm -rf ../assessment-backend/build

# Step 3: Move frontend build into backend
mv build ../assessment-backend/

# Step 4: Install backend dependencies
cd ../assessment-backend
npm install

# Step 5: Install Chromium for Puppeteer
npx puppeteer browsers install chrome || true
