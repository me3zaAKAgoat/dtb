#!/bin/bash

set -e

# Navigate to backend directory
cd backend || exit

# Remove existing dependencies and install new ones
rm -rf node_modules
npm install

# Build backend
npm run build

# Move built backend files to build directory
mv -f node_modules dist
mv -f dist ../build
cd .. || exit

# Navigate to frontend directory
cd frontend || exit

# Remove existing dependencies and install new ones
rm -rf node_modules
npm install

# Build frontend
npm run build

# Move built frontend files to build directory
mv -f dist ../build/build
cd .. || exit

# Navigate to build directory
rm -rf ../build
mv build ../
cd ../build || exit

# Create .env file with environment variables
cp ../*.pem .
cp ../.env .

# Install PM2
npm install -g pm2

# Check if PM2 process exists
if npx pm2 pid 0 &> /dev/null; then
  echo "Restarting process with ID 0"
  npx pm2 restart 0
else
  echo "Starting index.js"
  npx pm2 start index.js -f
fi
