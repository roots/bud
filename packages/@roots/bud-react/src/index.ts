import './interfaces'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import * as ReactRefreshWebpackPlugin from './react-refresh'

/**
 * Extension name
 */
export const name: Module['name'] = '@roots/bud-react'

/**
 * Extension register
 */
export const boot: Module['boot'] = (app: Framework) => {
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
