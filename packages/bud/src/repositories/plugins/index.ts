import {cleanWebpack} from './cleanWebpack'
import {copy} from './copy'
import {define} from './define'
import {ignoreEmit} from './ignoreEmit'
import {brotli, gzip} from './compression'
import {hotModuleReplacement} from './hotModuleReplacement'
import {limitChunkCount} from './limitChunkCount'
import {miniCssExtract} from './miniCssExtract'
import {manifest} from './manifest'
import {provide} from './provide'
import {terser} from './terser'
import {writeFile} from './writeFile'

import {PluginRepositoryDefinition} from '@roots/bud-types'

const plugins: PluginRepositoryDefinition = {
  name: 'plugins',
  register: {
    brotli,
    gzip,
    cleanWebpack,
    copy,
    define,
    hotModuleReplacement,
    ignoreEmit,
    manifest,
    miniCssExtract,
    provide,
    limitChunkCount,
    terser,
    writeFile,
  },
}

export {plugins as default}
