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

import {PluginRepositoryDefinition} from '@roots/bud-typings'

const plugins: PluginRepositoryDefinition = {
  name: 'plugins',
  register: {
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
  },
}

export {plugins as default}
