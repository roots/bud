#!/bin/bash

set -e

cd /bud

yarn install

yarn @bud proxy start

yarn @bud proxy publish

while true; do
  sleep 100
done
