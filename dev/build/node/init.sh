#!/bin/bash

yarn clean
yarn
yarn build
cd examples/react
yarn bud build production --ci
