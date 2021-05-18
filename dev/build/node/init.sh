#!/bin/bash

yarn clean
yarn
yarn build
cd examples/sage
yarn bud build:production --ci --debug --log
