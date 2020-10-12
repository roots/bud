import * as cleanWebpack from './cleanWebpack'
import * as gzip from './gzip'
import * as brotli from './brotli'
import * as ignoreEmit from './ignoreEmit'
import * as copy from './copy'
import * as define from './define'
import * as dll from './dll'
import * as dllReference from './dllReference'
import {html, interpolateHtml} from './html'
import hotModuleReplacement from './hotModuleReplacement'
import miniCssExtract from './miniCssExtract'
import manifest from './manifest'
import provide from './provide'
import terser from './terser'
import watchMissingModules from './watchMissingModules'
import writeFile from './writeFile'

export default {
  brotli,
  gzip,
  cleanWebpack,
  copy,
  define,
  dll,
  dllReference,
  hotModuleReplacement,
  html,
  interpolateHtml,
  ignoreEmit,
  manifest,
  miniCssExtract,
  provide,
  terser,
  writeFile,
  watchMissingModules,
}
