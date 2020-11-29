import type {Boot, Make, Options, When} from '../types'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

/**
 * Adds bud.reactRefresh() config handler.
 */
export * as api from './api'

/**
 * Register babel plugin: react-refresh/babel
 *
 * Only applied in development.
 */
export const boot: Boot = ({build, mode}) => {
  mode.is('development') &&
    build.items.merge('babel.options.plugins', [
      require.resolve('react-refresh/babel'),
    ])
}

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
  overlay: {
    sockIntegration: 'whm',
  },
}
