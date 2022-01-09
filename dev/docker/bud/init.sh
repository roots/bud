#!/bin/bash

set -e

cd /bud

yarn @bud make

while true; do
  sleep 100
done
