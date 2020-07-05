import {join} from 'path'
import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'
import patchConsole from 'patch-console'

import {makeWebpackConfig} from './builder/webpack'
import {Runner} from './compiler'

/**
 * Make the webpack options object from the project export.
 */
const config = require(join(process.cwd(), 'bud.config.js'))
const webpackConfig = makeWebpackConfig(config)

/**
 * Set env
 */
process.env.BABEL_ENV = config.options.mode
process.env.NODE_ENV = config.options.mode

/**
 * Runner props
 * @typedef  {object.<props>}
 * @property {object.<options>} options
 * @property {object} config - webpack config
 * @property {object} compiler - webpack compiler
 */
const runnerProps = {
  config,
  webpackConfig,
  compiler: webpack(webpackConfig),
}

/**
 * Run the compiler.
 */
const app = render(
  React.createElement(Runner, runnerProps)
)

/**
 * Kill the application on unhandled rejections.
 */
process.on('unhandledRejection', () => {
  process.exit()
})