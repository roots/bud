import * as Framework from '@roots/bud-framework'
import type CopyWebpackPlugin from 'copy-webpack-plugin'
import type {CopyPluginOptions} from 'copy-webpack-plugin'

export type Extension = Framework.Extension.CompilerPlugin<
  CopyWebpackPlugin,
  CopyPluginOptions
>
