import {Framework} from '@roots/bud-typings'
import * as cleanWebpack from './cleanWebpack'
import * as configDump from './webpackConfigDump'
import * as copy from './copy'
import * as define from './define'
import * as hashedModuleIds from './hashedModuleIds'
import * as hotModuleReplacement from './hmr'
import * as html from './html-webpack-plugin'
import * as htmlHardDisk from './htmlHardDisk'
import * as interpolateHtml from './interpolate-html-plugin'
import * as ignoreEmitWebpackPlugin from './ignore-emit-webpack-plugin'
import * as manifest from './manifest'
import * as MiniCssExtractPlugin from './mini-css-extract-plugin'
import * as OptimizeCssAssetsWebpackPlugin from './optimize-css-assets-webpack-plugin'
import * as provide from './provide'
import * as writeFile from './writeFile'

export const extensions: Framework.Index<Framework.Module> = {
  [provide.name]: provide,
  [cleanWebpack.name]: cleanWebpack,
  [hashedModuleIds.name]: hashedModuleIds,
  [configDump.name]: configDump,
  [copy.name]: copy,
  [define.name]: define,
  [hotModuleReplacement.name]: hotModuleReplacement,
  [html.name]: html,
  [htmlHardDisk.name]: htmlHardDisk,
  [ignoreEmitWebpackPlugin.name]: ignoreEmitWebpackPlugin,
  [interpolateHtml.name]: interpolateHtml,
  [manifest.name]: manifest,
  [MiniCssExtractPlugin.name]: MiniCssExtractPlugin,
  [OptimizeCssAssetsWebpackPlugin.name]: OptimizeCssAssetsWebpackPlugin,
  [writeFile.name]: writeFile,
}
