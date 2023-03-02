import {isMjs} from '../../helpers/isMjs.js'
import type {Factory} from '../index.js'
import {assetModuleFilename} from './assetModuleFilename.js'
import {chunkFilename} from './chunkFilename.js'
import {filename} from './filename.js'

export const output: Factory<`output`> = async ({
  hooks: {filter},
  isProduction,
  path,
  relPath,
}) =>
  filter(`build.output`, {
    assetModuleFilename: assetModuleFilename({filter, relPath}),
    chunkFilename: chunkFilename({filter, relPath}),
    clean: filter(`build.output.clean`, isProduction),
    environment: filter(`build.output.environment`, undefined),
    filename: filename({filter, relPath}),
    module: filter(`build.output.module`, false),
    path: filter(`build.output.path`, path(`@dist`)),
    pathinfo: filter(`build.output.pathinfo`),
    publicPath: filter(`build.output.publicPath`, `auto`),
    scriptType: filter(
      `build.output.scriptType`,
      isMjs(filter) ? `module` : false,
    ),
    uniqueName: filter(`build.output.uniqueName`, `@roots/bud`),
  })
