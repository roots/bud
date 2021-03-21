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
  app.babel.setPresets([
    '@babel/preset-env',
    '@babel/preset-react',
  ])

  /**
   * The rest only pertains to dev
   * (exit early if not applicable)
   */
  if (!app.isDevelopment) return

  app.extensions.add(ReactRefreshWebpackPlugin)

  app.store.mutate('options.entry', entry =>
    Object.entries(entry).reduce(
      (a, [name, assets]: [string, string[]]) => ({
        ...a,
        [name]: ['react-refresh/runtime', ...assets],
      }),
      {},
    ),
  )
}
