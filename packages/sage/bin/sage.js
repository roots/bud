#!/usr/bin/env node

const {
  isStatic,
  json,
  api,
  preflight,
} = require('./../lib/cjs/source')

preflight()

isStatic() ? json() : api()
