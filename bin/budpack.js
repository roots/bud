#!/usr/bin/env node
const path = require('path')
const rootPath = path.join(__dirname, '..')

require('@babel/register')({
  root: rootPath,
  ignore: [/node_modules/],
  only: [rootPath],
})

require = require('esm')(module)
module.exports = require('./../src')