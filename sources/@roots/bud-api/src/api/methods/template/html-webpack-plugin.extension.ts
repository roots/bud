import {Extension, Framework} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'

export type BudHtmlWebpackPlugin = Extension.CompilerPlugin<
  HtmlWebpackPlugin,
  HtmlWebpackPlugin.Options
>

export const BudHtmlWebpackPlugin: BudHtmlWebpackPlugin = {
  name: 'html-webpack-plugin',

  options(app: Framework) {
    return {
      alwaysWriteToDisk: true,
      inject: true,
      template: 'auto',
    }
  },

  make: (options, app) =>
    new HtmlWebpackPlugin({
      ...options.all(),
      publicPath: app.hooks.filter('build.output.publicPath'),
    }),

  when: ({store}) => store.is('features.html', true),
}
