import type {Module} from '@roots/bud-typings'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import {ReactRefreshPluginOptions} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

/**
 * Adds bud.reactRefresh() config handler.
 */
export * as api from './api'

/**
 * @pmmmwh/react-refresh-webpack-plugin implementation
 */
export const make: Module.Make<
  ReactRefreshPlugin,
  ReactRefreshPluginOptions
> = opts => new ReactRefreshPlugin(opts.all())

/**
 * @pmmmwh/react-refresh-webpack-plugin conditions
 */
export const when: Module.When = ({mode}) =>
  mode.is('development')

/**
 * @pmmmwh/react-refresh-webpack-plugin options
 */
export const options: Module.Options = {
  overlay: false,
}
