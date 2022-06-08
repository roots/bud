import type {Bud} from '@roots/bud-framework'

import {filenameFormat} from './filenameFormat.js'

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
  app.hooks
    .on('build.bail', () => app.isProduction)
    .hooks.on('build.cache', () => app.cache.configuration)
    .hooks.on('build.context', () => app.context.projectDir)
    .hooks.on('build.externalsType', 'var')
    .hooks.on('build.experiments', () => ({
      asyncWebAssembly: app.hooks.filter(
        'build.experiments.asyncWebAssembly',
      ),
      backCompat: app.hooks.filter('build.experiments.backCompat'),
      buildHttp: app.hooks.filter('build.experiments.buildHttp'),
      cacheUnaffected: app.hooks.filter(
        'build.experiments.cacheUnaffected',
      ),
      css: app.hooks.filter('build.experiments.css'),
      futureDefaults: app.hooks.filter('build.experiments.futureDefaults'),
      layers: app.hooks.filter('build.experiments.layers'),
      lazyCompilation: app.hooks.filter(
        'build.experiments.lazyCompilation',
      ),
      topLevelAwait: app.hooks.filter('build.experiments.topLevelAwait'),
      outputModule: app.hooks.filter('build.experiments.outputModule'),
      syncWebAssembly: app.hooks.filter(
        'build.experiments.syncWebAssembly',
      ),
    }))
    .hooks.on('build.infrastructureLogging', () => ({
      console: app.hooks.filter('build.infrastructureLogging.console'),
      level: app.hooks.filter('build.infrastructureLogging.level'),
    }))
    .hooks.on('build.mode', () => app.mode)
    .hooks.on('build.module', () => ({
      noParse: app.hooks.filter('build.module.noParse'),
      rules: app.hooks.filter('build.module.rules'),
      unsafeCache: app.hooks.filter('build.module.unsafeCache'),
    }))
    .hooks.on('build.module.rules', () => [
      ...app.hooks.filter('build.module.rules.before'),
      {
        oneOf: app.hooks.filter('build.module.rules.oneOf'),
      },
      ...app.hooks.filter('build.module.rules.after'),
    ])
    .hooks.on('build.module.rules.oneOf', () =>
      Object.values(app.build.rules).map(rule => rule.toWebpack()),
    )
    .hooks.on('build.name', () => app.name)
    .hooks.on('build.output', () => ({
      assetModuleFilename: app.hooks.filter(
        'build.output.assetModuleFilename',
      ),
      chunkFilename: app.hooks.filter('build.output.chunkFilename'),
      clean: app.hooks.filter('build.output.clean'),
      environment: app.hooks.filter('build.output.environment'),
      filename: app.hooks.filter('build.output.filename'),
      module: app.hooks.filter('build.output.module'),
      path: app.hooks.filter('build.output.path'),
      pathinfo: app.hooks.filter('build.output.pathinfo'),
      publicPath: app.hooks.filter('build.output.publicPath'),
    }))
    .hooks.async('build.resolve.alias', async () => ({
      '@src': app.path('@src'),
      '@dist': app.path('@dist'),
    }))
    .hooks.on('build.output.assetModuleFilename', () =>
      filenameFormat(app, '[ext]'),
    )
    .hooks.on('build.output.chunkFilename', () => filenameFormat(app))
    .hooks.on('build.output.chunkLoading', () => 'jsonp')
    .hooks.on('build.output.filename', () => filenameFormat(app))
    .hooks.on('build.output.chunkFormat', () => 'array-push')
    .hooks.on('build.output.path', () => app.path('@dist'))
    .hooks.on('build.optimization', () => ({
      emitOnErrors: app.hooks.filter('build.optimization.emitOnErrors'),
      minimize: app.hooks.filter('build.optimization.minimize'),
      minimizer: app.hooks.filter('build.optimization.minimizer'),
      moduleIds: app.hooks.filter('build.optimization.moduleIds'),
      runtimeChunk: app.hooks.filter('build.optimization.runtimeChunk'),
      splitChunks: app.hooks.filter('build.optimization.splitChunks'),
    }))
    .hooks.async('build.plugins', async () => await app.extensions.make())
    .hooks.on('build.recordsPath', () =>
      app.path(`@storage/${app.name}/modules.json`),
    )
    .hooks.async('build.resolve', async () => {
      const alias = await app.hooks.filterAsync('build.resolve.alias')
      const extensions = Array.from(
        app.hooks.filter('build.resolve.extensions'),
      )
      const modules = await app.hooks.filterAsync('build.resolve.modules')

      return {alias, extensions, modules}
    })

    .hooks.async('build.resolve.modules', async (value?: any) => {
      return Array.from(
        new Set([
          ...(value ?? []),
          app.hooks.filter('location.@src'),
          app.hooks.filter('location.@modules'),
        ]),
      )
    })
    .hooks.on('build.target', () =>
      app.project.has('manifest.browserslist')
        ? `browserslist:${app.path('./package.json')}`
        : undefined,
    )
}
