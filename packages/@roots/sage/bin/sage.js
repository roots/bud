#!/usr/bin/env
const {sage} = require('../lib/cjs')
const {CLI} = require('@roots/bud-cli')

new CLI(Object.assign(sage, {name: 'sage'})).boot()
