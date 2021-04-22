#!/usr/bin/env node

const {CLI} = require('@roots/bud-cli')
const {sage} = require('../lib/cjs')

new CLI(sage, config).boot()
