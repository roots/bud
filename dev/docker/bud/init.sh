#!/bin/bash

cd /bud

cp -rf /bud/examples /npm
cp -rf /bud/examples /yarn

npx npm-cli-login -u test -p test -e test@test.com -r http://verdaccio:4873

yarn config set npmRegistryServer http://verdaccio:4873
yarn config set npmAuthIdent 'test:test'
yarn config set unsafeHttpWhitelist --json '["verdaccio"]'

yarn

while true; do
  sleep 100
done
