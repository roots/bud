import {Framework, WebpackPlugin} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

interface Extension
  extends WebpackPlugin<EslintPlugin, Options> {
  api: (app: Framework) => {
    eslint: EslintConfig
  }
}

interface EslintConfig {
  config(userOptions: Options): Framework
}

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure eslint options
     */
    eslint: EslintConfig
  }

  namespace Framework {
    interface Extensions {
      'eslint-webpack-plugin': Extension
    }
  }
}

export type {EslintConfig}
