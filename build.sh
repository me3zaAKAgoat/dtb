#!/bin/bash

# Remove old build files
rm -rf ../build

# Install dependencies and build backend
cd backend || exit
npm ci
npm run build
mv -f node_modules dist
mv -f dist ../build

# Build frontend
cd ../frontend || exit
npm ci
npm run build
mv -f dist ../build/build

# Move build files to main directory
cd ..
mv build ..

# Configure environment variables and SSL certificates
cd ../build || exit
echo "$ENV" > .env
echo "$SSL_CERT" > cert.pem
echo "$SSL_KEY" > key.pem
