#!/bin/bash

cd /bud

npx npm-cli-login -u test -p test -e test@test.com -r http://verdaccio:4873

yarn config set npmRegistryServer http://verdaccio:4873
yarn config set npmAuthIdent 'test:test'
yarn config set unsafeHttpWhitelist --json '["verdaccio"]'

echo Install
yarn

echo Build
yarn @bud build

echo Done!
