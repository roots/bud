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
import {writeFile} from './writeFile'

/**
 * Webpack plugin adapters
 */
const webpackPlugins: WebpackPluginAdapters = [
  ['browser_sync_plugin', browserSync],
  ['clean_webpack_plugin', cleanWebpack],
  ['copy_plugin', copy],
  ['define_plugin', define],
  ['dependency_extraction_plugin', dependencyExtraction],
  ['fix_style_only_entries_plugin', fixStyleOnlyEntries],
  ['hot_module_replacement_plugin', hotModuleReplacement],
  ['manifest_plugin', manifest],
  ['mini_css_extract_plugin', miniCssExtract],
  ['provide_plugin', provide],
  ['write_file_plugin', writeFile],
  ['limit_chunk_count', limitChunkCount],
]

export {webpackPlugins}

export type WebpackPluginAdapter = () => WebpackPluginAdapater

export type WebpackPluginAdapters = WebpackPluginAdapterDeclaration[]

export type WebpackPluginAdapterDeclaration = [
  string,
  WebpackPluginAdapter,
]

export interface WebpackPluginAdapater {
  setOptions?: Function
  mergeOptions?: Function
  make: Function
  when?: Function
}
