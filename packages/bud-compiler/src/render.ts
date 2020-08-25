import webpack from 'webpack'
import React from 'react'
import {render as renderEl} from 'ink'
import {Dashboard} from './dashboard'
import {injectHot} from './injectHot'

import type {BudRenderer} from './types'

const render: BudRenderer = (bud, config): void => {
  bud.compiler = bud.features.enabled('hot')
    ? webpack(
        injectHot({
          config,
          overlay:
            bud.options.has('webpack.devServer.overlay') &&
            bud.options.get('webpack.devServer.overlay')
              ? true
              : true,
          reload:
            bud.options.has('webpack.devServer.reload') &&
            bud.options.get('webpack.devServer.reload')
              ? true
              : true,
        }),
      )
    : webpack(config)

  const props = {bud}
  const application = React.createElement(Dashboard, props)

  /** 🚀 */
  renderEl(application)
}

export {render}
