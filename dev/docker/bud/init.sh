#!/bin/bash

cd /bud

yarn install

yarn @bud proxy start

yarn @bud proxy publish

source /tests/npm/init.sh
source /tests/yarn/init.sh

while true; do
  sleep 100
done
