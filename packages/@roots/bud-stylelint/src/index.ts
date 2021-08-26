import type {
  Framework,
  WebpackPlugin,
} from '@roots/bud-framework'
import type {Container} from '@roots/container'
import StylelintWebpackPlugin, {
  Options,
} from 'stylelint-webpack-plugin'
import type {WebpackPluginInstance} from 'webpack'

declare module '@roots/bud-framework' {
  namespace Framework {
    interface Extensions {
      'stylelint-webpack-plugin': BudStylelintWebpackPlugin
    }
  }
}

interface BudStylelintWebpackPlugin
  extends WebpackPlugin<StylelintWebpackPlugin, Options> {
  name: 'stylelint-webpack-plugin' & WebpackPlugin['name']
  options(app: Framework): WebpackPlugin['options'] & Options
  make(
    options: Container<Options>,
  ): WebpackPluginInstance & StylelintWebpackPlugin
}

const BudStylelintWebpackPlugin: BudStylelintWebpackPlugin = {
  name: 'stylelint-webpack-plugin',

  options: app => ({
    context: app.path('src'),
  }),

  make: opts => new StylelintWebpackPlugin(opts.all()),
}

export const {name, options, make} = BudStylelintWebpackPlugin
