#!/bin/bash

registry=http://localhost:4873
user=test
password=test

echo "Installing yarn"
  npm install yarn --global

cd /bud

echo "verdaccio auth"
  npm config set registry $registry
  npm config set user $user
  npm config set password $password

echo "bud make"
cd /bud

echo Install
yarn install --immutable

echo Build
yarn repo build

echo Lint
yarn repo lint --eslint --skypack

echo Tests
yarn repo test
