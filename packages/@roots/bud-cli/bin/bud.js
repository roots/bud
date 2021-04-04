#!/usr/bin/env node

const {bud} = require('@roots/bud')
const {CLI} = require('@roots/bud-cli')

new CLI(bud).boot()
