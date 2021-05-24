#!/usr/bin/env node

require('ts-node').register({
  project: require.resolve('../../../tsconfig.dev.json'),
})

require('./')
