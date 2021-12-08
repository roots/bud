#!/bin/bash

registry=http://verdaccio:4873
user=test
password=test

echo "Installing yarn"
  npm install yarn --global

cd /bud

echo "verdaccio auth"
  npm config set registry $registry
  npm config set user $user
  npm config set password $password

echo "bud make"
cd /bud

yarn @bud make

while true; do
  sleep 100
done
