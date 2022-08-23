import type {Bud} from '@roots/bud-framework'
import {cpus} from 'os'

import {filenameFormat} from './filenameFormat.js'

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
    emitOnErrors: app.hooks.filter(
      `build.optimization.emitOnErrors`,
      app.isDevelopment,
    ),
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
      filenameFormat(app, `[ext]`),
    ),
    chunkFilename: app.hooks.filter(
      `build.output.chunkFilename`,
      `js/dynamic/[id].js`,
    ),
    clean: app.hooks.filter(`build.output.clean`),
    environment: app.hooks.filter(`build.output.environment`),
    filename: app.hooks.filter(
      `build.output.filename`,
      `js/${filenameFormat(app)}`,
    ),
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
    app.hooks.filter(
      `build.resolve.extensions`,
      new Set([
        `.mjs`,
        `.cjs`,
        `.js`,
        `.jsx`,
        `.css`,
        `.json`,
        `.wasm`,
        `.yml`,
        `.toml`,
      ]),
    ),
  )

  const modules = await app.hooks.filterAsync(
    `build.resolve.modules`,
    Array.from(
      new Set([
        app.hooks.filter(`location.@src`),
        app.hooks.filter(`location.@modules`),
      ]),
    ),
  )

  return await app.hooks.filterAsync(`build.resolve`, {
    alias,
    extensions,
    modules,
  })
}

export const target = async app =>
  app.hooks.filter(
    `build.target`,
    app.project.has(`manifest.browserslist`)
      ? `browserslist:${app.root.path(`package.json`)}`
      : `web`,
  )

/**
 * Initializes configuration builder hooks
 *
 * @remarks
 * All hooks in the `build` namespace are initialized here with
 * the exception of `build.cache` which is handled in {@link Bud.cache}
 *
 * @param app - the Bud instance
 * @returns Promise
 *
 * @public
 */
export async function build(app: Bud): Promise<void> {
  app.hooks.fromMap({
    [`build.bail`]: app.isProduction,
    [`build.cache`]: () => app.cache.configuration,
    [`build.context`]: () => app.context.basedir,
    [`build.externalsType`]: `var`,
    [`build.mode`]: () => app.mode,
    [`build.module.rules.before`]: [],
    [`build.module.rules.after`]: [],
    [`build.module.rules.oneOf`]: () =>
      Object.values(app.build.rules).map(rule => rule.toWebpack()),
    [`build.name`]: () => app.label,
    [`build.output.assetModuleFilename`]: () =>
      filenameFormat(app, `[ext]`),
    [`build.infrastructureLogging.level`]: `none`,
    [`build.module.unsafeCache`]: false,
    [`build.node`]: false,
    [`build.optimization.minimize`]: false,
    [`build.optimization.removeEmptyChunks`]: true,
    [`build.parallelism`]: 10 * Math.max(cpus().length - 1, 1),
    [`build.performance`]: {hints: false},
    [`build.resolve.extensions`]: new Set([
      `.mjs`,
      `.cjs`,
      `.js`,
      `.jsx`,
      `.css`,
      `.json`,
      `.wasm`,
      `.yml`,
      `.toml`,
    ]),
  })

  app.hooks.async(`build.resolve.alias`, async () => ({
    '@src': app.path(`@src`),
    '@dist': app.path(`@dist`),
  }))

  app.hooks
    .async(`build.plugins`, async () => await app.extensions.make())

    .hooks.on(`build.output.chunkFilename`, () => `js/dynamic/[id].js`)
    .hooks.on(`build.output.filename`, () => `js/${filenameFormat(app)}`)
    .hooks.on(`build.output.path`, () => app.path(`@dist`))
    .hooks.on(`build.output.publicPath`, () => `auto`)
    .hooks.on(`build.recordsPath`, () =>
      app.path(`@storage`, app.label, `modules.json`),
    )
    .hooks.on(`build.optimization.emitOnErrors`, () => app.isDevelopment)

    .hooks.async(`build.resolve.modules`, async (value?: any) => {
      return Array.from(
        new Set([
          ...(value ?? []),
          app.hooks.filter(`location.@src`),
          app.hooks.filter(`location.@modules`),
        ]),
      )
    })

    .hooks.on(`build.target`, () =>
      app.project.has(`manifest.browserslist`)
        ? `browserslist:${app.root.path(`package.json`)}`
        : `web`,
    )
}
