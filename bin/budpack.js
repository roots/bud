#!/usr/bin/env node
const yargs = require('yargs').argv

yargs.preflight
  ? require('esm')(module)('./../build/budpack/preflight')
  : require('esm')(module)('./../build/budpack')
