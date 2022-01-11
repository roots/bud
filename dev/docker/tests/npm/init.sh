#!/bin/sh

cp -r /bud/examples/* /tests/npm
cp -r /bud/dev/docker/npm/* /tests/npm

cd /npm/basic
cp /tests/npm/.npmrc /tests/npm/basic/.npmrc
npm install --registry $PROXY_REGISTRY
npx bud build
