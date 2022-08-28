import type {Bud} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export const output = async (app: Bud): Promise<Configuration['output']> =>
  app.hooks.filter(`build.output`, {
    assetModuleFilename: app.hooks.filter(
      `build.output.assetModuleFilename`,
    ),
    chunkFilename: app.hooks.filter(`build.output.chunkFilename`),
    clean: app.hooks.filter(`build.output.clean`),
    environment: app.hooks.filter(`build.output.environment`),
    filename: app.hooks.filter(`build.output.filename`),
    module: app.hooks.filter(`build.output.module`),
    path: app.hooks.filter(`build.output.path`),
    pathinfo: app.hooks.filter(`build.output.pathinfo`),
    publicPath: app.hooks.filter(`build.output.publicPath`),
  })
