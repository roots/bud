import {join} from 'path'
import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'

import budpackConfig from './config'
import BudpackCLI from './cli'

const CWD = process.cwd()

process.on('unhandledRejection', () => {
  process.exit()
})

/**
 * Build budpack compiler
 */
const projectConfig = join(CWD, 'bud.config.js')
const project = require(projectConfig)
const config = budpackConfig(project.options)
const compiler = webpack(config)

/**
 * Render the BudpackCLI
 */
render(
  React.createElement(BudpackCLI, {
    compiler,
    config,
    options: project.options,
  }),
)
