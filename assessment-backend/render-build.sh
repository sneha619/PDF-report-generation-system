#!/bin/bash
set -e

# Step 1: Build frontend
cd ../assessment-frontend
npm install
npm run build

# Step 2: Remove old build if exists and move new one
rm -rf ../assessment-backend/build
mv build ../assessment-backend/

# Step 3: Install backend dependencies
cd ../assessment-backend
npm install

# Step 4: Install Chromium for Puppeteer (Render-compatible)
node -e "require('puppeteer').install()"
