#!/bin/bash

set -e
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT

echo "Yarn version"
yarn set version from sources

echo "Installing"
yarn install

echo "Building cjs"
yarn build:ci:cjs

echo "Building esm"
yarn build:ci:esm

echo "Linting packages"
yarn lint

echo "Linting shrinkwrap"
yarn pkg

echo "Test"
yarn test

echo "Done"

exit
