#!/bin/bash

source './handler.sh'

echo "Installing"
yarn install

echo "Building cjs"
yarn build:cjs:ci

echo "Building esm"
yarn build:esm:ci

echo "Linting packages"
yarn lint

echo "Linting shrinkwrap"
yarn pkg

echo "Test"
yarn test

echo "Done"

exit
