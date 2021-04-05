import './interface'

import {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'
import * as ReactRefreshWebpackPlugin from './react-refresh'

/**
 * @const DEFAULT_PRESETS
 */
const DEFAULT_PRESETS = ['@babel/preset-react']

/**
 * @module @roots/bud-react
 * @description Wrapper for react and react-refresh
 */

const extension: Framework.Module = {
  /**
   * @property name
   */
  name: '@roots/bud-react',

  /**
   * @property {Array} devDependencies
   */
  devDependencies: ['@babel/preset-react', 'react-refresh'],

  /**
   * @property {Array} dependencies
   */
  dependencies: ['react', 'react-dom'],

  /**
   * @function boot
   */
  boot({babel, isDevelopment, when}: Framework): void {
    babel.setPresets([
      ...Object.values(babel.presets),
      ...DEFAULT_PRESETS,
    ])

    when(isDevelopment, (app: Framework) =>
      app
        .use(ReactRefreshWebpackPlugin)
        .store.mutate(
          'options.entry',
          (entry: Configuration['entry']) =>
            Object.entries(entry).reduce(
              (a, [name, assets]: [string, string[]]) => ({
                ...a,
                [name]: ['react-refresh/runtime', ...assets],
              }),
              {},
            ),
        ),
    )
  },
}

const {name, boot, devDependencies, dependencies} = extension

/**
 * @exports
 */
export {extension as default}
export {name, boot, devDependencies, dependencies}
