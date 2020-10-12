import {MiniCssExtractPlugin} from './externals'

export const options: (
  bud: Framework.Bud,
) => MiniCssExtractPlugin.PluginOptions = ({store}) => ({
  filename: store['features'].enabled('hash')
    ? '[name].[hash].css'
    : '[name].css',
})

export const make: Adapter.make = (
  opts: MiniCssExtractPlugin.PluginOptions,
) => new MiniCssExtractPlugin(opts)

export const when: Adapter.when = ({mode}) =>
  mode.is('development')
