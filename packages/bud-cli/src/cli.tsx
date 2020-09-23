#!/usr/bin/env node

import {join} from 'path'
import {argv} from 'yargs'
import {existsSync} from 'fs-extra'

/**
 * Load conf if available.
 */
const config = argv.config ?? 'bud.config.js'

if (config) {
  const configPath = join(process.cwd(), config as string)
  const configExists = existsSync(configPath)

  if (configExists) {
    require(configPath)
  }
}
