import type {Bud} from '@roots/bud-framework'

export const bail = async app =>
  app.hooks.filter(`build.bail`, app.isProduction)

export const cache = async app =>
  app.hooks.filter(`build.cache`, app.cache.configuration)

export {experiments} from './experiments.js'

export const infrastructureLogging = async app =>
  app.hooks.filter(`build.infrastructureLogging`, {
    console: app.hooks.filter(`build.infrastructureLogging.console`),
    level: app.hooks.filter(`build.infrastructureLogging.level`),
  })

export {module} from './module.js'

export const node = async app =>
  app.hooks.filter(`build.output.node`, false)

export const optimization = async app =>
  app.hooks.filter(`build.optimization`, {
    emitOnErrors: app.hooks.filter(`build.optimization.emitOnErrors`),
    minimize: app.hooks.filter(`build.optimization.minimize`),
    minimizer: app.hooks.filter(`build.optimization.minimizer`, [`...`]),
    moduleIds: app.hooks.filter(`build.optimization.moduleIds`),
    runtimeChunk: app.hooks.filter(`build.optimization.runtimeChunk`),
    splitChunks: app.hooks.filter(`build.optimization.splitChunks`),
  })

export const output = async app =>
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

export const resolve = async (app: Bud) => {
  const alias = await app.hooks.filterAsync(
    `build.resolve.alias`,
    undefined,
  )

  const extensions = Array.from(
    app.hooks.filter(`build.resolve.extensions`),
  )

  const modules = await app.hooks.filterAsync(`build.resolve.modules`)

  return await app.hooks.filterAsync(`build.resolve`, {
    alias,
    extensions,
    modules,
  })
}

export const target = async app => app.hooks.filter(`build.target`)
