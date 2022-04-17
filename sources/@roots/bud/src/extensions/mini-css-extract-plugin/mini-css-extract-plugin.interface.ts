import type {Extensions} from '@roots/bud-framework'
import type MiniCssExtractPlugin from 'mini-css-extract-plugin'

export type Plugin = Extensions.Plugin<
  MiniCssExtractPlugin,
  MiniCssExtractPlugin.PluginOptions
>
