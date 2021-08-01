/**
 * @module @roots/bud-eslint
 */

import {Framework, Plugin} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

/**
 * @interface Extension
 */
interface Extension extends Plugin<EslintPlugin, Options> {
  api: (app: Framework) => {eslint: EslintConfig}
}

/**
 * @interface EslintConfig
 */
interface EslintConfig {
  config(userOptions: Options): Framework
}

declare module '@roots/bud-framework' {
  interface Framework {
    eslint: EslintConfig
  }

  namespace Framework {
    interface Extensions {
      'eslint-webpack-plugin': Extension
    }
  }
}

/**
 * @exports EslintConfig
 */
export type {EslintConfig}
