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
  app.babel.addPreset('@babel/preset-react')

  app.store.enabled('args.react-refresh') &&
    (() => {
      app.extensions.add(
        '@pmmmwh/react-refresh-webpack-plugin',
        ReactRefreshWebpackPlugin,
      )

      app.hooks.on('webpack.entry', entry =>
        Object.entries(entry).reduce(
          (a, [name, assets]: [string, string[]]) => ({
            ...a,
            [name]: [...assets, 'react-refresh/runtime'],
          }),
          {},
        ),
      )
    })
}
