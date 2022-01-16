#!/bin/bash

if [ BUD_PROXY_REGISTRY ]; then
	NPM_USER=test NPM_PASS=test NPM_EMAIL=test@test.com NPM_REGISTRY=$BUD_PROXY_REGISTRY npm-cli-login
fi;

while true; do
  sleep 100
done
