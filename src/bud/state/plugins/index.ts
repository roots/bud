import {browserSync} from './adapters/browserSync'
import {cleanWebpack} from './adapters/cleanWebpack'
import {copy} from './adapters/copy'
import {define} from './adapters/define'
import {dependencyExtraction} from './adapters/dependencyExtraction'
import {fixStyleOnlyEntries} from './adapters/fixStyleOnlyEntries'
import {hotModuleReplacement} from './adapters/hotModuleReplacement'
import {limitChunkCount} from './adapters/limitChunkCount'
import {miniCssExtract} from './adapters/miniCssExtract'
import {manifest} from './adapters/manifest'
import {provide} from './adapters/provide'
import {stylelint} from './adapters/stylelint'
import {terser} from './adapters/terser'
import {vue} from './adapters/vue'
import {writeFile} from './adapters/writeFile'

import type {PluginsRepo} from './types'

const pluginsRepository: PluginsRepo = []
const adaptersRepository: PluginsRepo = [
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

export {
  pluginsRepository,
  adaptersRepository,
}
