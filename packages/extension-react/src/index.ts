import {Bud} from '@roots/bud'
import * as ReactRefreshWebpackPlugin from './react-refresh'

import './interfaces'

/**
 * Extension name
 */
export const name = '@roots/bud-react'

/**
 * Extension register
 */
export const boot = (app: Bud) => {
  app.hooks.on('webpack.entry', entry =>
    Object.entries(entry).reduce(
      (a, [name, assets]: [string, string[]]) => ({
        ...a,
        [name]: [...assets, 'react-refresh/runtime'],
      }),
      {},
    ),
  )

  app.babel
    .addPreset('@babel/preset-react')
    .extensions.add(
      '@pmmmwh/react-refresh-webpack-plugin',
      ReactRefreshWebpackPlugin,
    )
}
