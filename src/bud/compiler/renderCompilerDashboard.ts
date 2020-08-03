import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'
import {Runner} from './Runner'
import type {Bud, BudRenderer, RunnerProps, WebpackConfig} from './types'

/**
 * Inject webpack middleware on all entrypoints.
 */
const injectHot = ({
  webpackConfig,
  overlay,
  reload,
  logger,
}) => {
  const client = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=${reload}&overlay=${overlay}`

  Object.keys(webpackConfig.entry).forEach(entry => {
    webpackConfig.entry[entry] = [client].concat(webpackConfig.entry[entry])

    logger.info(
      {
        name: 'bud.compiler',
        value: webpackConfig.entry[entry],
      },
      `injecting hot middleware`,
    )
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
    ? webpack(
        injectHot({
          webpackConfig,
          overlay: bud.options.get('dev').overlay ? true : true,
          reload: bud.options.get('dev').reload ? true : true,
          logger: bud.logger,
        }),
      )
    : webpack(webpackConfig)

  bud.compiler = compiler

  bud.logger.info(
    {
      name: 'bud.compiler',
    },
    `compiler attached to bud`,
  )

  const props: RunnerProps = {bud}
  const application = React.createElement(Runner, props)

  /** 🚀 */
  render(application)
}

export {renderCompilerDashboard}
