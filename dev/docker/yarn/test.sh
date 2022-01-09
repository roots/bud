#!/bin/bash

set -e

cd /yarn/examples/basic
yarn add bud@0.0.0-dev
yarn bud build
