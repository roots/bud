import type {Extension} from '@roots/bud-framework'
import type MiniCssExtractPlugin from 'mini-css-extract-plugin'

export type Plugin = Extension.CompilerPlugin<
  MiniCssExtractPlugin,
  MiniCssExtractPlugin.PluginOptions
>
