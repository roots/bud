#!/usr/bin/env node
const {join} = require('path')
const {compiler} = require('../build/compiler')

/** Get Bud container exported from project config. */
const projectDir = process.cwd()
const config = join(projectDir, 'bud.config.js')
const bud = require(config)

process.title = 'bud-cli'
process.env.BABEL_ENV = bud.mode
process.env.NODE_ENV = bud.mode

process.on('unhandledRejection', error => {
  process.exitCode = 1
  process.nextTick(() => {
    bud.hooks.call('compile_error', {bud, error})
    bud.util.terminate(bud)
  })
})

/** 🚀 */
compiler(bud)
