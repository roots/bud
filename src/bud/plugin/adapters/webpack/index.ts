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

import type {RegisteredPlugin, WebpackAdapters} from './types'

const browserSyncAdapter: RegisteredPlugin = [
  'browser_sync_plugin',
  browserSync,
]
const cleanAdapter: RegisteredPlugin = [
  'clean_webpack_plugin',
  cleanWebpack,
]
const copyAdapter: RegisteredPlugin = ['copy_plugin', copy]
const defineAdapter: RegisteredPlugin = ['define_plugin', define]
const dependencyExtractionAdapter: RegisteredPlugin = [
  'dependency_extraction_plugin',
  dependencyExtraction,
]
const fixStyleAdapter: RegisteredPlugin = [
  'fix_style_only_entries_plugin',
  fixStyleOnlyEntries,
]
const hmrAdapter: RegisteredPlugin = [
  'hot_module_replacement_plugin',
  hotModuleReplacement,
]
const manifestAdapter: RegisteredPlugin = [
  'manifest_plugin',
  manifest,
]
const miniCssAdapter: RegisteredPlugin = [
  'mini_css_extract_plugin',
  miniCssExtract,
]
const provideAdapter: RegisteredPlugin = ['provide_plugin', provide]
const writeFileAdapter: RegisteredPlugin = [
  'write_file_plugin',
  writeFile,
]
const limitChunkAdapter: RegisteredPlugin = [
  'limit_chunk_count',
  limitChunkCount,
]

const terserAdapter: RegisteredPlugin = ['terser', terser]

const webpackAdapters: WebpackAdapters = [
  writeFileAdapter,
  browserSyncAdapter,
  cleanAdapter,
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

export {webpackAdapters}
