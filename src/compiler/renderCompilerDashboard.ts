import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'
import {Runner} from './Runner'
import type {
  Bud,
  BudRenderer,
  RunnerProps,
  WebpackConfig,
} from './types'

/**
 * Webpack compilation dashboard renderer.
 */
const renderCompilerDashboard: BudRenderer = (
  bud: Bud,
  webpackConfig: WebpackConfig,
): void => {
  /**
   * Runner props
   */
  const runnerProps: RunnerProps = {
    config: bud,
    webpackConfig,
    compiler: webpack(webpackConfig),
  }

  const application = React.createElement(
    Runner,
    runnerProps,
  )

  /** 🚀 */
  render(application)
}

export {renderCompilerDashboard}
