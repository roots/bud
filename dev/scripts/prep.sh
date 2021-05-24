#!/bin/bash

rm -rf examples/*/.budfiles
rm -rf examples/*/node_modules
rm -rf examples/*/dist

rm -rf packages/*/*/node_modules
rm -rf packages/*/*/lib
rm -rf packages/*/*/types
rm -rf packages/*/*/docs

rm -rf docs/*

rm -rf node_modules

yarn cache clean

yarn
yarn build

yarn lint
yarn pkg
yarn docs
