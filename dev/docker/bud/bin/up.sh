#!/bin/bash

cd /bud

echo login
npx npm-cli-login -u test -p test -e test@test.com -r http://verdaccio:4873

cp -rf /bud/examples /yarn
cp -rf /bud/examples /npm

while true; do
  sleep 100
done
