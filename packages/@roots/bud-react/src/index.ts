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
  app.babel?.addPreset &&
    app.babel.addPreset('@babel/preset-react')

  // The rest of the boot method pertains only to dev
  // Exit early if not applicable
  if (!app.isDevelopment) {
    return
  }

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
}
