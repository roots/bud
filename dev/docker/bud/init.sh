#!/bin/bash

-e

npm install yarn --global

cd /bud

yarn @bud make
yarn @bud proxy make
yarn @bud proxy publish --version 0.0.0

source /npm/test.sh
source /yarn/test.sh

while true; do
  sleep 100
done
