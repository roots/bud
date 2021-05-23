#!/bin/bash

rm -rf packages/*/*/node_modules
rm -rf packages/*/*/lib
rm -rf packages/*/*/types
rm -rf packages/*/*/docs
rm -rf docs/*
rm -rf node_modules

yarn cache clean

yarn --immutable
yarn build

yarn lint
yarn pkg
yarn docs
