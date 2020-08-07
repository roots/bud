import {browserSync} from './browserSync'
import {cleanWebpack} from './cleanWebpack'
import {copy} from './copy'
import {define} from './define'
import {fixStyleOnlyEntries} from './fixStyleOnlyEntries'
import {hotModuleReplacement} from './hotModuleReplacement'
import {limitChunkCount} from './limitChunkCount'
import {miniCssExtract} from './miniCssExtract'
import {manifest} from './manifest'
import {provide} from './provide'
import {terser} from './terser'
import {writeFile} from './writeFile'

import type {PluginsRepo} from './types'

const plugins: PluginsRepo = []
const adapters: PluginsRepo = [
  browserSync,
  cleanWebpack,
  copy,
  define,
  fixStyleOnlyEntries,
  hotModuleReplacement,
  manifest,
  miniCssExtract,
  provide,
  limitChunkCount,
  terser,
  writeFile,
]

export {plugins, adapters}
