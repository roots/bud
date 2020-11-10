import type {Extension} from '@roots/bud-extensions'

import * as cleanWebpack from './cleanWebpack'
import * as gzip from './gzip'
import * as brotli from './brotli'
import * as ignoreEmit from './ignoreEmit'
import * as configDump from './webpackConfigDump'
import * as copy from './copy'
import * as define from './define'
import * as hotModuleReplacement from './hotModuleReplacement'
import * as html from './html'
import * as htmlHardDisk from './htmlHardDisk'
import * as interpolateHtml from './interpolateHtmlPlugin'
import * as manifest from './manifest'
import * as miniCssExtract from './miniCssExtract'
import * as provide from './provide'
import * as terser from './terser'
import * as watchMissingModules from './watchMissingModules'
import * as writeFile from './writeFile'

const plugins: {[key: string]: Extension.Interface} = {
  [`clean-webpack-plugin`]: cleanWebpack,
  [`compression-webpack-plugin[gzip]`]: gzip,
  [`compression-webpack-plugin[brotli]`]: brotli,
  [`ignore-emit-webpack-plugin`]: ignoreEmit,
  [`webpack-config-dump-plugin`]: configDump,
  [`copy-webpack-plugin`]: copy,
  [`webpack[define-plugin]`]: define,
  [`webpack[hotModuleReplacementPlugin]`]: hotModuleReplacement,
  [`html-webpack-plugin`]: html,
  [`html-hard-disk-plugin`]: htmlHardDisk,
  [`interpolate-html`]: interpolateHtml,
  [`webpack-manifest-plugin`]: manifest,
  [`mini-css-extract-plugin`]: miniCssExtract,
  [`webpack[provide]`]: provide,
  [`terser-webpack-plugin`]: terser,
  [`watch-missing-modules`]: watchMissingModules,
  [`write-file-webpack-plugin`]: writeFile,
}

export {plugins}
