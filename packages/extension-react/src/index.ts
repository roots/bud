import * as svgr from './@svgr'
import * as refresh from './react-refresh'

import type {Module} from '@roots/bud-typings'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

/**
 * React refresh webpack plugin tuple
 */
const reactRefresh: [string, Module] = [
  '@pmmmwh/react-refresh-webpack-plugin',
  refresh,
]

/**
 * @svgr webpack plugin tuple
 */
const svgrPlugin: [string, Module] = ['@svgr', svgr]

/**
 * @roots/bud-react extension
 */
export const boot: Module.Boot = bud => {
  /**
   * Register @babel/preset-react
   */
  bud.build.items.merge('babel.options.presets', [
    '@babel/preset-react',
  ])

  /**
   * Register @svgr-loader
   */
  bud.use([svgrPlugin])

  /**
   * The rest of the boot process only applies in dev.
   */
  if (!bud.mode.is('development')) return

  /**
   * Register @pmmmwh/react-refresh-webpack-plugin
   */
  bud.use([reactRefresh])

  bud.build.items.merge('babel.options.plugins', [
    require.resolve('react-refresh/babel'),
  ])
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
