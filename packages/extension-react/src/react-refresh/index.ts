import Plugin from '@pmmmwh/react-refresh-webpack-plugin'

import {Bud} from '@roots/bud'
import type {Module} from '@roots/bud-typings'
import {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

/**
 * Adds bud.reactRefresh() config handler.
 */
export * as api from './api'

/**
 * Boot
 */
export const boot: Module.Boot = ({babel, options}: Bud) =>
  options.is('mode', 'development') &&
  babel.addPlugin('@babel/preset-react')

/**
 * @pmmmwh/react-refresh-webpack-plugin implementation
 */
export const make: Module.Make<Plugin, Options> = options =>
  new Plugin(options.all())

/**
 * @pmmmwh/react-refresh-webpack-plugin conditions
 * (development only)
 */
export const when: Module.When = ({options}) =>
  options.is('mode', 'development')

/**
 * @pmmmwh/react-refresh-webpack-plugin options
 */
export const options: Options = {
  overlay: {
    sockIntegration: 'whm',
  },
}
