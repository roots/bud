import type {Module} from '@roots/bud-typings'
import type {Framework} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const name = 'mini-css-extract-plugin'

export const make: Module.Make = (options, {store}) =>
  new MiniCssExtractPlugin({
    filename: store.enabled('options.hash')
      ? '[name].[hash].css'
      : '[name].css',
    chunkFilename: store.enabled('options.hash')
      ? '[name].[id].[hash].css'
      : '[name].[id].css',

    ...options.all(),
  })

export const options: Module.Options = {}

/**
 * @hook build.items.minicss
 * @hook build.items.minicss.loader
 * @hook build.items.minicss.options
 */
export const boot: Module.Boot = app => {
  app.build.set('items.minicss', (app: Framework) =>
    app.hooks.filter('build.items.minicss', {
      loader: app.hooks.filter(
        'build.items.minicss.loader',
        MiniCssExtractPlugin.loader,
      ),
      options: app.hooks.filter(
        'build.items.minicss.options',
        {},
      ),
    }),
  )
}

export const when: Module.When = bud => bud.isProduction
