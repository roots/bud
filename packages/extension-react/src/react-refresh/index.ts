import type {Boot, Make, Options, When} from '../types'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

/**
 * Adds bud.reactRefresh() config handler.
 */
export * as api from './api'

/**
 * @pmmmwh/react-refresh-webpack-plugin implementation
 */
export const make: Make = opts =>
  new ReactRefreshPlugin(opts.getStore())

/**
 * @pmmmwh/react-refresh-webpack-plugin conditions
 */
export const when: When = ({mode}) => mode.is('development')

/**
 * @pmmmwh/react-refresh-webpack-plugin options
 */
export const options: Options = {
  overlay: false,
}
