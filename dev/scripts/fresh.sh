#!/bin/bash

# YOINK! https://stackoverflow.com/a/4774063
SCRIPTS_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"
source "${SCRIPTS_DIR}/handler.sh"

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

exit
