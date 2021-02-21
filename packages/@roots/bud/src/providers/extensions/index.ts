import {Framework} from '@roots/bud-typings'
import * as cleanWebpack from './cleanWebpack'
import * as configDump from './webpackConfigDump'
import * as copy from './copy'
import * as define from './define'
import * as hashedModuleIds from './hashedModuleIds'
import * as hotModuleReplacement from './hmr'
import * as html from './html'
import * as htmlHardDisk from './htmlHardDisk'
import * as interpolateHtml from './interpolateHtmlPlugin'
import * as manifest from './manifest'
import * as MiniCssExtractPlugin from './mini-css-extract-plugin'
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
  [interpolateHtml.name]: interpolateHtml,
  [manifest.name]: manifest,
  [MiniCssExtractPlugin.name]: MiniCssExtractPlugin,
  [writeFile.name]: writeFile,
}
