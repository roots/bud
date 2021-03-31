import './interface'

import {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'
import * as ReactRefreshWebpackPlugin from './react-refresh'

const DEFAULT_PRESETS = [
  '@babel/preset-env',
  '@babel/preset-react',
]

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
   * @function boot
   */
  boot({babel, isDevelopment, when}: Framework): void {
    babel.setPresets(DEFAULT_PRESETS)

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

/**
 * @exports default
 */
export {extension as default}

/**
 * @exports module
 */
const {name, boot} = extension
export {name, boot}
