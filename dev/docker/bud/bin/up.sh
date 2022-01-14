#!/bin/bash

cd /bud

echo clean yarn caches
yarn cache clean

echo login
npx npm-cli-login -u test -p test -e test@test.com -r http://verdaccio:4873

echo install
yarn

echo build
yarn @bud build

echo done!

while true; do
  sleep 100
done
