#!/bin/sh

set -e

registry="http://bud:4873"

npm install jest --global

cp -rf /npm/examples /npm/.tmp/npm

cd /npm/.tmp/npm/basic
npm install --registry=$registry
npx bud build
