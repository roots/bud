import {Module} from '@roots/bud-framework'
import {Options as PluginOptions} from 'eslint-webpack-plugin'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      'eslint-webpack-plugin': Module
    }
  }

  namespace Eslint {
    type Options = PluginOptions
  }
}
