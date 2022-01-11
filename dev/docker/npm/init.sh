#!/bin/sh

registry="http://localhost:4873"

cp -rf /bud/examples /npm

cd /npm/examples/basic
npm install --registry $registry
npx bud build
