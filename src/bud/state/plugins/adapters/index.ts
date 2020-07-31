import {browserSync} from './browserSync'
import {cleanWebpack} from './cleanWebpack'
import {copy} from './copy'
import {define} from './define'
import {dependencyExtraction} from './dependencyExtraction'
import {fixStyleOnlyEntries} from './fixStyleOnlyEntries'
import {hotModuleReplacement} from './hotModuleReplacement'
import {limitChunkCount} from './limitChunkCount'
import {miniCssExtract} from './miniCssExtract'
import {manifest} from './manifest'
import {provide} from './provide'
import {stylelint} from './stylelint'
import {terser} from './terser'
import {vue} from './vue'
import {writeFile} from './writeFile'

import type {PluginRepoEntry, PluginsRepo} from '../types'

const adapters: PluginsRepo = [
  {
    name: 'browser_sync',
    extension: browserSync,
  },
  {
    name: 'clean_webpack_plugin',
    extension: cleanWebpack,
  },
  {
    name: 'copy',
    extension: copy,
  },
  {
    name: 'define',
    extension: define,
  },
  {
    name: 'dependency_extraction',
    extension: dependencyExtraction,
  },
  {
    name: 'fix_style_only_entries',
    extension: fixStyleOnlyEntries,
  },
  {
    name: 'hot_module_replacement',
    extension: hotModuleReplacement,
  },
  {
    name: 'manifest',
    extension: manifest,
  },
  {
    name: 'mini_css_extract',
    extension: miniCssExtract,
  },
  {
    name: 'provide',
    extension: provide,
  },
  {
    name: 'limit_chunks',
    extension: limitChunkCount,
  },
  {
    name: 'stylelint',
    extension: stylelint,
  },
  {
    name: 'terser',
    extension: terser,
  },
  {
    name: 'vue',
    extension: vue,
  },
  {
    name: 'write_file',
    extension: writeFile,
  },
]

export {adapters}
