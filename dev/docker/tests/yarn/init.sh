#!/bin/sh

cp -r /bud/examples/* /tests/yarn
cp -r /bud/dev/docker/yarn/* tests/yarn

cd /yarn/basic
yarn install --registry $PROXY_REGISTRY
yarn bud build
