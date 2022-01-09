#!/bin/bash

set -e

cd /npm/examples/basic
npm install bud@^0.0.0-dev
npx bud build
