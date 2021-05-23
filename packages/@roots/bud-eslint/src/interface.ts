import {Framework, Plugin} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

interface Extension extends Plugin<EslintPlugin, Options> {
  api: (app: Framework) => {eslint: EslintConfig}
}

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

export type {Extension, EslintConfig}
