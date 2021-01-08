import * as svgr from './@svgr'
import * as refresh from './react-refresh'

import type {Framework, Module} from '@roots/bud-typings'
import {isArray} from '@roots/bud-support'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

export const setLoaders: Framework.Module['setLoaders'] = [
  'react-hot-loader',
  'react-hot-loader',
]

export const setItems: Framework.Module['setItems'] = [
  'react-hot',
  {
    ident: 'react-hot',
    loader: 'react-hot-loader',
  },
]

/**
 * @roots/bud-react extension
 */
export const boot: Module.Boot = bud => {
  // @babel/preset-react
  bud.build.items.merge('babel.options.presets', [
    '@babel/preset-react',
  ])

  // @svgr
  bud.use(['@svgr', svgr])

  /**
   * The rest of the boot process only applies in dev.
   */
  if (!bud.mode.is('development')) return

  //  @pmmmwh/react-refresh-webpack-plugin
  bud.use(['@pmmmwh/react-refresh-webpack-plugin', refresh])

  bud.build.rules.mutate('js', js => ({
    ...js,
    use: [
      bud.build.items.get('react-hot'),
      bud.build.items.get('babel'),
    ].filter(Boolean),
  }))

  bud.build.items.merge('babel.options.plugins', [
    require.resolve('react-refresh/babel'),
  ])

  bud.store.mutate(
    'webpack.entry',
    (entry: Framework.Webpack.Configuration['entry']) => ({
      client: `webpack-dev-server/client?${bud.server.config.get(
        'ssl' ? 'https' : 'http',
      )}://${bud.server.config.get(
        'host',
      )}:${bud.server.config.get('port')}`,

      ...Object.fromEntries(
        Object.entries(
          entry,
        ).map(([name, value]: [string, string | string[]]) => [
          name,
          [
            ...(isArray(value) ? value : [value]),
            'webpack/hot/dev-server',
          ],
        ]),
      ),
    }),
  )
}

declare module '@roots/bud-typings' {
  export namespace Framework {
    export namespace Api {
      export type ReactRefresh = (
        this: Framework,
        options: ReactRefreshPluginOptions,
      ) => Framework
    }
  }
}
