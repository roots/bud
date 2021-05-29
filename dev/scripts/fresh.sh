#!/bin/bash

source './handler.sh'

echo "Cleaning examples"
git clean -dfx

echo "Installing"
yarn install

echo "Building cjs"
yarn build:cjs

echo "Building esm"
yarn build:esm

echo "Linting packages"
yarn lint

echo "Done"

exit
