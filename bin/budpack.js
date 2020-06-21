#!/usr/bin/env node

const {join} = require('path')
const register = require('@babel/register')
const rootPath = join(__dirname, '..')

register({
  root: rootPath,
  ignore: [/node_modules/],
  only: [rootPath],
})

module.exports = require('esm')(module)(
  './../build/budpack',
)
