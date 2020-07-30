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
import {writeFile} from './writeFile'

import type {PluginRepoEntry, PluginsRepo} from '../types'

const adapters: PluginsRepo = [
  ['browser_sync', browserSync],
  ['clean_webpack_plugin', cleanWebpack],
  ['copy', copy],
  ['define', define],
  ['dependency_extraction', dependencyExtraction],
  ['fix_style_only_entries', fixStyleOnlyEntries],
  ['hot_module_replacement', hotModuleReplacement],
  ['manifest', manifest],
  ['mini_css_extract', miniCssExtract],
  ['provide', provide],
  ['limit_chunks', limitChunkCount],
  ['stylelint', stylelint],
  ['terser', terser],
  ['write_file', writeFile],
]

export {adapters}
