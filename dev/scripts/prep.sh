#!/bin/bash

# YOINK! https://stackoverflow.com/a/4774063
SCRIPTS_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
source "${SCRIPTS_DIR}/handler.sh"

echo "Cleaning examples"
rm -rf examples/*/.budfiles
rm -rf examples/*/node_modules
rm -rf examples/*/dist
rm -rf examples/sage/public/*
rm -rf examples/sage/storage/bud/*
echo ""

echo "Cleaning modules"
rm -rf node_modules
rm -rf packages/*/*/node_modules
echo ""

echo "Cleaning lib"
rm -rf packages/*/*/lib
echo ""

echo "Cleaning types"
rm -rf packages/@roots/*/types
echo ""

echo "Clearing yarn cache"
yarn cache clean > /dev/null
echo ""

echo "Installing"
yarn install > /dev/null
echo ""

echo "Regenerating docs"
rm -rf docs
rm -rf packages/*/*/docs
yarn docs
echo ""

echo "Building cjs"
echo "-------------------------"
yarn build:cjs
echo ""

echo "Building esm"
echo "-------------------------"
yarn build:esm
echo ""

echo "Running tests (specs)"
echo "-------------------------"
yarn test
echo ""

echo "Running tests (integration)"
echo "-------------------------"
yarn test:integration
echo ""

echo "Linting code"
echo "-------------------------"
yarn lint
echo ""

echo "Linting packaging"
echo "-------------------------"
yarn pkg
echo ""

exit
