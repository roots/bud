import type {Extension} from '@roots/bud-extensions'
import MiniCssExtractPlugin, {
  PluginOptions,
} from 'mini-css-extract-plugin'

export const options: Extension.RawOptions<PluginOptions> = ({
  features,
}) => ({
  filename: features.enabled('hash')
    ? '[name].[hash].css'
    : '[name].css',
})

export const make: Extension.Make = (options: PluginOptions) =>
  new MiniCssExtractPlugin(options)

export const when: Extension.When = ({mode}) =>
  mode.is('production')
