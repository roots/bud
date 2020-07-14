import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'

import {Runner} from './compiler'

/**
 * Compile
 */
const compile = (config, webpackConfig) => {
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
}

export {compile}
