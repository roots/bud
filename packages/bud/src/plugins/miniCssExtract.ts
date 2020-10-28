import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const options: (
  bud: Framework.Bud,
) => MiniCssExtractPlugin.PluginOptions = ({features}) => ({
  filename: features.enabled('hash')
    ? '[name].[hash].css'
    : '[name].css',
})

export const make: Framework.Extension.Make = (
  opts: MiniCssExtractPlugin.PluginOptions,
) => new MiniCssExtractPlugin(opts)

export const when: Framework.Extension.When = ({mode}) =>
  mode.is('production')
