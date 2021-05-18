import {Plugin} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

type Extension = Plugin<EslintPlugin, Options>

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      'eslint-webpack-plugin': Extension
    }
  }
}

export type {Extension}
