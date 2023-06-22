import type {Factory} from '../index.js'

import {isMjs} from '../../helpers/isMjs.js'
import {assetModuleFilename} from './assetModuleFilename.js'
import {filename} from './filename.js'

export const output: Factory<`output`> = async ({
  hooks: {filter},
  isProduction,
  path,
  relPath,
}) =>
  filter(`build.output`, {
    assetModuleFilename: assetModuleFilename({filter, relPath}),
    /**
     * This should be kept undefined as documented here:
     * {@see https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegroupfilename}
     */
    // chunkFilename: chunkFilename({filter, relPath}),
    clean: filter(`build.output.clean`, isProduction),
    environment: filter(`build.output.environment`, undefined),
    filename: filename({filter, relPath}),
    hashFunction: filter(`build.output.hashFunction`, `xxhash64`),
    iife: filter(`build.output.iife`, undefined),
    module: filter(`build.output.module`, false),
    path: filter(`build.output.path`, path(`@dist`)),
    pathinfo: filter(`build.output.pathinfo`, false),
    publicPath: filter(`build.output.publicPath`, `auto`),
    scriptType: filter(
      `build.output.scriptType`,
      isMjs(filter) ? `module` : `text/javascript`,
    ),
    uniqueName: filter(`build.output.uniqueName`, `@roots/bud`),
  })
