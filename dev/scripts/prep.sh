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

echo "Cleaning modules"
rm -rf node_modules
rm -rf packages/*/*/node_modules

echo "Cleaning lib"
rm -rf packages/*/*/lib

echo "Cleaning types"
rm -rf packages/@roots/*/types

echo "Cleaning docs"
rm -rf docs
rm -rf packages/*/*/docs

echo "Clearing yarn cache"
yarn cache clean > /dev/null

echo "Installing"
yarn install

echo "Building cjs"
yarn build:cjs

echo "Building esm"
yarn build:esm

echo "Running tests"
yarn test

echo "Generating docs"
yarn docs

echo "Linting"
yarn lint

echo "Lint pkg shrinkwrap"
yarn pkg

exit
