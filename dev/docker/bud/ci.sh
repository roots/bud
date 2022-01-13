#!/bin/bash

set -e

WORKFLOW_FILE=./.github/workflows/main.yml
WORKFLOW_CHECKSUM=e4b17a9ebd2ab631a69f4f6e3185f6ae

md5sum --status --strict -c <(echo $WORKFLOW_CHECKSUM  $WORKFLOW_FILE)

echo Install
yarn install --immutable

echo Build
yarn @bud build

echo Lint
yarn @bud lint --eslint --skypack

echo Test
yarn @bud test
