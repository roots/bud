#!/usr/bin/env node

import {join} from 'path'
import {Bud} from './bud/types'
import {compiler} from './compiler'

const getProjectConfig = (): string => {
  const projectDir: string = process.cwd()
  const config: string = join(projectDir, 'bud.config.js')

  return config
}

const setProcess = (bud: Bud): void => {
  process.title = 'bud-cli'
  process.env.BABEL_ENV = bud.mode
  process.env.NODE_ENV = bud.mode

  process.on('unhandledRejection', (error: any) => {
    process.exitCode = 1
    process.nextTick(() => {
      bud.hooks.call('compile_error', {bud, error})
      bud.util.terminate(bud)
    })
  })
}

const bud: Bud = require(getProjectConfig())

/** 🚀 */
export const run = () => {
  setProcess(bud)
  compiler(bud)
}
