#!/bin/sh

registry="http://localhost:4873"

cp -rf /bud/examples /yarn

cd /yarn/examples/basic
yarn install --registry $registry
yarn bud build
