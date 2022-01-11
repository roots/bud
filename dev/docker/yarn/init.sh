#!/bin/sh

set -e

registry="http://bud:4873"

yarn add jest --global

cp -rf /yarn/examples /yarn/.tmp/yarn

cd /yarn/.tmp/yarn/basic
yarn install --registry=$registry
yarn bud build
