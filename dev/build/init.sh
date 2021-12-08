#!/bin/bash

# arm64 compatibility fix
# implicating optipng
# @see https://git.io/JDU41

export CPPFLAGS=-DPNG_ARM_NEON_OPT=0

registry=http://verdaccio:4873
user=test
password=test

echo "Installing yarn"
  npm install yarn --global

cd /bud

echo "bud make"
cd /bud

yarn @bud make

while true; do
  sleep 100
done
