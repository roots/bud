import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'
import {Runner} from './Runner'
import type {Bud, BudRenderer, RunnerProps, WebpackConfig} from './types'

/**
 * Inject webpack middleware on all entrypoints.
 */
const injectHot = (webpackConfig: WebpackConfig, overlay: boolean, reload: boolean) => {
  const client =
    `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=${reload}&overlay=${overlay}`

  Object.keys(webpackConfig.entry).forEach(entry => {
    webpackConfig.entry[entry] = [client].concat(webpackConfig.entry[entry])

    this.bud.logger.info({
      name: 'compiler.injectHot',
      value: webpackConfig.entry[entry]
    }, `injecting hot middleware`)
  })

  return webpackConfig
}

/**
 * Webpack compilation dashboard renderer.
 */
const renderCompilerDashboard: BudRenderer = (
  bud: Bud,
  webpackConfig: WebpackConfig,
): void => {
  const compiler = bud.features.enabled('hot')
    ? webpack(injectHot(webpackConfig, bud.options.get('dev').overlay ?? false, bud.options.get('dev').reload ?? false))
    : webpack(webpackConfig)

  const runnerProps: RunnerProps = {
    bud,
    compiler,
  }

  const application = React.createElement(Runner, runnerProps)

  /** 🚀 */
  render(application)
}

export {renderCompilerDashboard}
