import {join} from 'path'
import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'

import {makeWebpackConfig} from './builder/webpack'
import {Runner} from './compiler'

/**
 * Get the project config export.
 */
const config = require(join(process.cwd(), 'bud.config.js'))

/**
 * Fashion config into a proper webpack config object
 */
const webpackConfig = makeWebpackConfig(config)

/**
 * Set babel env
 */
process.env.BABEL_ENV = config.options.mode
/**
 * Set node env
 */
process.env.NODE_ENV = config.options.mode

/**
 * Runner props
 *
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
render(React.createElement(Runner, runnerProps))

/**
 * Kill the application on unhandled rejections.
 */
process.on('unhandledRejection', () => {
  process.exit()
})
