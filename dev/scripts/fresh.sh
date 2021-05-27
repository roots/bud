#!/bin/bash

set -e

trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
trap 'echo "\"${last_command}\" command finished exit code $?."' EXIT

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
