import {Extension} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'

export type BudHtmlWebpackPlugin = Extension.Module<
  HtmlWebpackPlugin.Options,
  HtmlWebpackPlugin
>

export const BudHtmlWebpackPlugin: BudHtmlWebpackPlugin = {
  label: 'html-webpack-plugin',

  options() {
    return {
      alwaysWriteToDisk: true,
      inject: true,
      template: 'auto',
    }
  },

  make: (options, app) =>
    new HtmlWebpackPlugin({
      ...options.all(),
      publicPath: app.publicPath(),
    }),

  when: ({hooks}) => hooks.filter('feature.html'),
}
