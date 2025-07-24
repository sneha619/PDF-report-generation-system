#!/bin/bash
set -e

# Step 1: Build frontend
cd ../assessment-frontend
npm install
npm run build

# Step 2: Clean old build if any
rm -rf ../assessment-backend/build

# Step 3: Move build into backend
mv build ../assessment-backend/

# Step 4: Install backend dependencies
cd ../assessment-backend
npm install

# Step 5: Install Puppeteer Chromium manually (safe method)
node -e "require('puppeteer').createBrowserFetcher({product: 'chrome'}).download('121.0.0.0')"
