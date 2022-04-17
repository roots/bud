import * as Framework from '@roots/bud-framework'
import type CopyWebpackPlugin from 'copy-webpack-plugin'
import type {PluginOptions} from 'copy-webpack-plugin'

export type Extension = Framework.Extension.Plugin<
  CopyWebpackPlugin,
  PluginOptions
>
