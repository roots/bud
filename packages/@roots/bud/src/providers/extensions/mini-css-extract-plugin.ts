import type {Module} from '@roots/bud-typings'
import type {Framework} from '@roots/bud-framework'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

declare type Options = Module.Options<MiniCssExtractPlugin.PluginOptions>

export const name = 'mini-css-extract-plugin'

/**
 * Make MiniCssExtractPlugin
 */
export const make: Module.Make = (options: Options) =>
  new MiniCssExtractPlugin(options.all())

/**
 * Plugin options
 *
 * @filter mini-css-extract-plugin.options
 */
export const options: Options = ({store, hooks}) =>
  hooks.filter('mini-css-extract-plugin.options', {
    filename: store.enabled('options.hash')
      ? '[name].[hash].css'
      : '[name].css',
    chunkFilename: store.enabled('options.hash')
      ? '[name].[id].[hash].css'
      : '[name].[id].css',
  })

/**
 * On boot, setup the mini-css-extract-plugin loader
 *
 * @filter build.items.minicss
 * @filter build.items.minicss.loader
 * @filter build.items.minicss.options
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

/**
 * Enable in production
 */
export const when: Module.When = app => app.isProduction
