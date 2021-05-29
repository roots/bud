#!/bin/bash

source './handler.sh'

echo "Cleaning examples"
rm -rf examples/*/.budfiles
rm -rf examples/*/node_modules
rm -rf examples/*/dist
rm -rf examples/sage/storage/bud/*

echo "Cleaning modules"
rm -rf node_modules
rm -rf packages/*/*/node_modules

echo "Cleaning lib"
rm -rf packages/*/*/lib

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

echo "Linting packages"
yarn lint

echo "Linting shrinkwrap"
yarn pkg

echo "Running tests"
yarn test

echo "Generating docs"
yarn docs

echo "Publish prep"

exit
