import type {Extension} from '@roots/bud-typings'

import * as cleanWebpack from './cleanWebpack'
import * as gzip from './gzip'
import * as brotli from './brotli'
import * as ignoreEmit from './ignoreEmit'
import * as configDump from './webpackConfigDump'
import * as copy from './copy'
import * as define from './define'
import * as hashedModuleIds from './hashedModuleIds'
import * as hotModuleReplacement from './hmr'
import * as html from './html'
import * as htmlHardDisk from './htmlHardDisk'
import * as imagemin from './imagemin'
import * as interpolateHtml from './interpolateHtmlPlugin'
import * as manifest from './manifest'
import * as miniCssExtract from './miniCssExtract'
import * as provide from './provide'
import * as terser from './terser'
import * as watchMissingModules from './watchMissingModules'
import * as writeFile from './writeFile'

export * as Brotli from './brotli/typings'
export * as Imagemin from './imagemin/typings'

export const extensions: {
  [key: string]: Extension.Contract
} = {
  [`clean-webpack-plugin`]: cleanWebpack,
  [`compression-webpack-plugin-gzip`]: gzip,
  [`compression-webpack-plugin-brotli`]: brotli,
  [`hashed-module-ids-plugin`]: hashedModuleIds,
  [`ignore-emit-webpack-plugin`]: ignoreEmit,
  [`webpack-config-dump-plugin`]: configDump,
  [`copy-webpack-plugin`]: copy,
  [`webpack-define-plugin`]: define,
  [`webpack-hot-module-replacement-plugin]`]: hotModuleReplacement,
  [`html-webpack-plugin`]: html,
  [`html-hard-disk-plugin`]: htmlHardDisk,
  [`image-minimizer-webpack-plugin`]: imagemin,
  [`interpolate-html-plugin`]: interpolateHtml,
  [`webpack-manifest-plugin`]: manifest,
  [`mini-css-extract-plugin`]: miniCssExtract,
  [`webpack-provide-plugin`]: provide,
  [`terser-webpack-plugin`]: terser,
  [`watch-missing-modules`]: watchMissingModules,
  [`write-file-webpack-plugin`]: writeFile,
}
