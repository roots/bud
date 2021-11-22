#!/bin/bash

set -e

WORKFLOW_FILE=./.github/workflows/main.yml
WORKFLOW_CHECKSUM=db14cd3e816a63f23cdb9011f3e83210

md5sum --status --strict -c <(echo $WORKFLOW_CHECKSUM  $WORKFLOW_FILE)

echo Install
yarn install --immutable

echo Build
yarn kjo build

echo Lint
yarn kjo lint --eslint --skypack

echo Test
yarn kjo test
