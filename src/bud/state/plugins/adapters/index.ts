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
import {terser} from './terser'
import {writeFile} from './writeFile'

import type {PluginRepoEntry, PluginsRepo} from '../types'

const browserSyncAdapter: PluginRepoEntry = [
  'browser_sync_plugin',
  browserSync,
]

const copyAdapter: PluginRepoEntry = ['copy_plugin', copy]
const defineAdapter: PluginRepoEntry = ['define_plugin', define]
const dependencyExtractionAdapter: PluginRepoEntry = [
  'dependency_extraction_plugin',
  dependencyExtraction,
]
const fixStyleAdapter: PluginRepoEntry = [
  'fix_style_only_entries_plugin',
  fixStyleOnlyEntries,
]
const hmrAdapter: PluginRepoEntry = [
  'hot_module_replacement_plugin',
  hotModuleReplacement,
]
const manifestAdapter: PluginRepoEntry = ['manifest_plugin', manifest]
const miniCssAdapter: PluginRepoEntry = [
  'mini_css_extract_plugin',
  miniCssExtract,
]
const provideAdapter: PluginRepoEntry = ['provide_plugin', provide]
const writeFileAdapter: PluginRepoEntry = [
  'write_file_plugin',
  writeFile,
]
const limitChunkAdapter: PluginRepoEntry = [
  'limit_chunk_count',
  limitChunkCount,
]

const terserAdapter: PluginRepoEntry = ['terser', terser]

const adapters: PluginsRepo = [
  writeFileAdapter,
  browserSyncAdapter,
  ['clean_webpack_plugin', cleanWebpack],
  copyAdapter,
  defineAdapter,
  dependencyExtractionAdapter,
  fixStyleAdapter,
  hmrAdapter,
  manifestAdapter,
  miniCssAdapter,
  provideAdapter,
  terserAdapter,
  limitChunkAdapter,
]

export {adapters}
