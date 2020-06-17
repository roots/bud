import {join} from 'path'
import React from 'react'
import {render} from 'ink'
import webpack from 'webpack'

import config from './config'
import BudpackCLI from './cli'

/**
 * Process handling
 */
const mode = 'production'

process.env.BABEL_ENV = mode
process.env.NODE_ENV = mode
process.on('unhandledRejection', err => {
  console.error(err)
  process.exit()
})

/**
 * Build webpack compiler
 */
const projectConfig = join(process.cwd(), 'bud.config.js')
const project = require(projectConfig)
const compiler = webpack(config(project))

/**
 * Render the BudpackCLI
 */
render(
  React.createElement(BudpackCLI, {compiler, mode})
)
