import webpack from 'webpack'
import React from 'react'
import {render} from 'ink'
import type {
  Bud,
  BudRenderer,
  RunnerProps,
  WebpackConfig,
} from './types'
import {Runner} from './Runner'

/**
 * Inject webpack middleware on all entrypoints.
 */
const injectHot = ({webpackConfig, overlay, reload, logger}) => {
  const client = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=${reload}&overlay=${overlay}`

  Object.keys(webpackConfig.entry).forEach(entry => {
    webpackConfig.entry[entry] = [client].concat(
      webpackConfig.entry[entry],
    )

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

const renderCompilerDashboard: BudRenderer = (
  bud: Bud,
  webpackConfig: WebpackConfig,
): void => {
  bud.compiler = bud.features.enabled('hot')
    ? webpack(
        injectHot({
          webpackConfig,
          overlay:
            bud.options.has('devServer.overlay') &&
            bud.options.get('devServer.overlay')
              ? true
              : true,
          reload:
            bud.options.has('devServer.reload') &&
            bud.options.get('devServer.reload')
              ? true
              : true,
          logger: bud.logger,
        }),
      )
    : webpack(webpackConfig)

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
