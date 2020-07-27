#!/usr/bin/env node

const {compiler} = require('./../dist/compiler')
const {join} = require('path')

const getProjectConfig = () => {
  const projectDir = process.cwd()
  const config = join(projectDir, 'bud.config.js')

  return config
}

const setProcess = (bud) => {
  process.title = 'bud-cli'
  process.env.BABEL_ENV = bud.mode
  process.env.NODE_ENV = bud.mode

  process.on('unhandledRejection', (error) => {
    process.exitCode = 1
    process.nextTick(() => {
      bud.hooks.call('compile_error', {bud, error})
      bud.util.terminate(bud)
    })
  })
}

const bud = require(getProjectConfig())
setProcess(bud)
compiler(bud)
