#!/bin/bash

cd /bud

yarn install
yarn @bud proxy start
yarn @bud proxy publish

source /npm/init.sh
source /yarn/init.sh

while true; do
  sleep 100
done
