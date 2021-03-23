#!/usr/bin/env node

const {bud} = require('@roots/bud')
const {CLI} = require('@roots/bud-cli')
const {sage} = require('../lib/cjs')

new CLI(sage(Object.assign(bud, {name: 'sage'}))).boot()
