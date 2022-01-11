#!/bin/bash

cd /bud

yarn @bud proxy publish

while true; do
  sleep 100
done
