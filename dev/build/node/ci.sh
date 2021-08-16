#!/bin/bash

set -e

WORKFLOW_FILE=./.github/workflows/main.yml
WORKFLOW_CHECKSUM=0a5957adcd769dd87e29d6d6e4bc8978

md5sum --status --strict -c <(echo $WORKFLOW_CHECKSUM  $WORKFLOW_FILE)

echo Install
yarn install --immutable

echo Build
yarn kjo build

echo Lint
yarn kjo lint --eslint --skypack

echo Unit Tests
yarn kjo test --unit

echo Integration Tests
yarn kjo test --integration
