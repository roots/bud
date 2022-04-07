import {Bud, Plugin} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'

export type BudHtmlWebpackPlugin = Plugin<
  HtmlWebpackPlugin,
  HtmlWebpackPlugin.Options
>

export const BudHtmlWebpackPlugin: BudHtmlWebpackPlugin = {
  name: 'html-webpack-plugin',

  options(app: Bud) {
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

  when: ({store}) => store.is('features.html', true),
}
