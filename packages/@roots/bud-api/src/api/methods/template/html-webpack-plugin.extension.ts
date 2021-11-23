import {Extension, Framework} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './html-webpack-plugin.plugin'

export type BudHtmlWebpackPlugin = Extension.CompilerPlugin<
  HtmlWebpackPlugin,
  HtmlWebpackPlugin.Options
>

export const BudHtmlWebpackPlugin: BudHtmlWebpackPlugin = {
  name: 'html-webpack-plugin',

  options(app: Framework) {
    const options = {
      publicPath: app.publicPath(),
      ...(app.store.get('extension.html-webpack-plugin') ?? {}),
    }

    return options
  },

  make: (options, app) => {
    const constructorOptions = options.all()
    app.dump(constructorOptions, {
      prefix: 'html-webpack-plugin constructor args',
    })
    return new HtmlWebpackPlugin(constructorOptions)
  },

  when: ({store}) => store.is('features.html', true),
}
