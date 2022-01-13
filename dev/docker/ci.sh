#!/bin/bash

set -e

WORKFLOW_FILE=./.github/workflows/main.yml
WORKFLOW_CHECKSUM=e4b17a9ebd2ab631a69f4f6e3185f6ae

# md5sum --status --strict -c <(echo $WORKFLOW_CHECKSUM  $WORKFLOW_FILE)

echo start containers
docker compose up -d

echo initialize
yarn @bud $ sh /bud/dev/docker/setup.sh

echo Lint packages
yarn @bud : lint --skypack

echo Publish packages
yarn @bud : release proxy --tag latest

echo babel integration: yarn install
yarn @bud : example install babel --with yarn

echo babel integration: yarn build
yarn @bud : example build babel --with yarn

echo babel integration: npm install
yarn @bud : example install babel --with npm

echo babel integration: npm build
yarn @bud : example build babel --with npm

echo Test
yarn @bud : test --coverage --verbose --maxWorkers=50%
