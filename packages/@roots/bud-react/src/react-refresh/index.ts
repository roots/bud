import Plugin from '@pmmmwh/react-refresh-webpack-plugin'
import type {Module} from '@roots/bud-typings'
import {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/types'

/**
 * Name
 */
export const name = '@pmmmwh/react-refresh-webpack-plugin'

/**
 * Adds bud.reactRefresh() config handler.
 */
export * as api from './api'

/**
 * @pmmmwh/react-refresh-webpack-plugin implementation
 */
export const make: Module.Make<Plugin, Options> = options =>
  new Plugin(options.all())

/**
 * @pmmmwh/react-refresh-webpack-plugin conditions
 * (development only)
 */
export const when: Module.When = ({isDevelopment}) =>
  isDevelopment

/**
 * @pmmmwh/react-refresh-webpack-plugin options
 */
export const options = () => ({
  overlay: false,
})
