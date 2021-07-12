#!/bin/bash

# YOINK! https://stackoverflow.com/a/4774063
SCRIPTS_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
source "${SCRIPTS_DIR}/handler.sh"

echo "Cleaning examples"
echo "-------------------------"
rm -rf .budfiles
echo "Removed .budfiles from root"
rm -rf examples/*/.budfiles
echo "Removed .budfiles from examples"
rm -rf examples/*/node_modules
echo "Removed node_modules from examples"
rm -rf examples/*/dist
echo "Removed dist dirs from examples"
rm -rf examples/sage/public/*
rm -rf examples/sage/storage/bud/*
echo "Removed special directories for examples/sage"
echo ""

echo "Cleaning modules"
echo "-------------------------"
rm -rf node_modules
rm -rf packages/*/*/node_modules
echo "Removed all src node_modules directories"
echo ""

echo "Cleaning lib"
echo "-------------------------"
rm -rf packages/*/*/lib
echo "Removed all compiled lib directories"
echo ""

echo "Cleaning types"
echo "-------------------------"
rm -rf packages/@roots/*/types
echo "Removed all types directories"
echo ""

echo "Installing"
echo "-------------------------"
yarn cache clean > /dev/null
echo "Cleared yarn cache"
yarn install > /dev/null
echo "Installed all packages"
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

echo "Cleaning up from tests"
echo "-------------------------"
rm -rf .budfiles
echo "Removed .budfiles from root"
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
