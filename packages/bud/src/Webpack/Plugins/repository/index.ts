import cleanWebpack from './cleanWebpack'
import copy from './copy'
import define from './define'
import ignoreEmit from './ignoreEmit'
import {brotli, gzip} from './compression'
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
