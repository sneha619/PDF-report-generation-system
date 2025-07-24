#!/bin/bash
set -e

# Step 1: Build frontend
cd ../assessment-frontend
npm install
npm run build

# Step 2: Move frontend build into backend
mv -f build ../assessment-backend/

# Step 3: Back to backend
cd ../assessment-backend
npm install

# Step 4: Install Puppeteer Chrome
node -e "require('puppeteer').install({ browser: 'chrome' })"
