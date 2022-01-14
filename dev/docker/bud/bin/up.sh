#!/bin/bash

cd /bud

echo login
npx npm-cli-login -u test -p test -e test@test.com -r http://verdaccio:4873

while true; do
  sleep 100
done
