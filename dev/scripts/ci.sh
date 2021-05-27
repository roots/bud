#!/bin/bash

set -e
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT

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
