#!/usr/bin/env node

import {resolve} from 'path'
import {argv} from 'yargs'

/**
 * Config file specified with --config
 * Fallback: bud.config.js
 */
const config: string = argv.config
  ? (argv.config as string)
  : 'bud.config.js'

/**
 * CLI runtime.
 */
;(async (config: string): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require(config)
  } catch (error) {
    console.error(error)
  }
})(resolve(process.cwd(), config))
