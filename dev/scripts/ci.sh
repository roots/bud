#!/bin/bash

# YOINK! https://stackoverflow.com/a/4774063
SCRIPTS_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
source "${SCRIPTS_DIR}/handler.sh"

echo "Installing"
echo "-------------------------"
yarn install
echo ""

echo "Building CJS"
echo "-------------------------"
yarn build:cjs
echo ""

echo "Building ESM"
echo "-------------------------"
yarn build:esm
echo ""

echo "Linting code"
echo "-------------------------"
yarn lint
echo ""

echo "Linting packaging"
echo "-------------------------"
yarn pkg
echo ""

echo "Running tests"
echo "-------------------------"
yarn test
echo ""

exit
