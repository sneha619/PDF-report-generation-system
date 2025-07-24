#!/bin/bash
set -e

# Build frontend
cd ../assessment-frontend
npm install
npm run build

# Move build to backend
rm -rf ../assessment-backend/build
mv build ../assessment-backend/

# Setup backend
cd ../assessment-backend
npm install
