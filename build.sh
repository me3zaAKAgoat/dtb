cd backend
npm i
npm run build
mv node_modules dist
cp -rf dist ../
cd ..
mv -f dist build
cd frontend
npm i
npm run build
mv -f dist ../build/build
cd ..
mv build ../
cd ../build
echo "PORT=443" > .env
nano .env
nano cert.pem
nano key.pem
