#!/bin/bash

custom_registry_url=http://localhost:4873

# Set registry to local registry
npm set registry "$custom_registry_url"
yarn config set registry "$custom_registry_url"
