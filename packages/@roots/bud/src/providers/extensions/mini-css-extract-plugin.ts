import type {Module} from '@roots/bud-typings'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const name = `mini-css-extract-plugin`

export const make: Module.Make = (options, bud) =>
  new MiniCssExtractPlugin({
    filename: bud.store.enabled('options.hash')
      ? '[name].[hash].css'
      : '[name].css',
    chunkFilename: bud.store.enabled('options.hash')
      ? '[name].[id].[hash].css'
      : '[name].[id].css',
    ...options.all(),
  })

export const options: Module.Options = {}

export const boot: Module.Boot = app => {
  app.build.set('items.minicss', {
    loader: MiniCssExtractPlugin.loader,
    options: {},
  })
}

export const when: Module.When = bud => bud.isProduction
