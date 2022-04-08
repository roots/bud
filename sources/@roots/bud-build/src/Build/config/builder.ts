import type {Bud} from '@roots/bud-framework'

import {unwrap as unwrapFn} from './builder.unwrap'
import {filenameFormat} from './filenameFormat'

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
  /**
   * App bound unwrap
   */
  const unwrap = unwrapFn.bind(app)

  app.hooks
    .on('build.cache', () => app.cache.configuration)
    .hooks.on('build.context', () => app.context.projectDir)
    .hooks.on('build.mode', app.mode)
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
    .hooks.on('build.name', app.name)
    .hooks.on('build.output', () => ({
      assetModuleFilename: app.hooks.filter(
        'build.output.assetModuleFilename',
      ),
      chunkFilename: app.hooks.filter('build.output.chunkFilename'),
      clean: app.hooks.filter('build.output.clean'),
      filename: app.hooks.filter('build.output.filename'),
      path: app.hooks.filter('build.output.path'),
      pathinfo: app.hooks.filter('build.output.pathinfo'),
      publicPath: app.hooks.filter('build.output.publicPath'),
    }))
    .hooks.on('build.output.assetModuleFilename', () =>
      filenameFormat(app, '[ext]'),
    )
    .hooks.on('build.output.chunkFilename', () => filenameFormat(app))
    .hooks.on('build.output.filename', () => filenameFormat(app))
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
      app.project.has('manifest.browserslist') &&
      app.project.isArray('manifest.browserslist')
        ? `browserslist:${app.path('package.json')}`
        : undefined,
    )
    .hooks.on('build.infrastructureLogging', () => ({
      console: app.hooks.filter('build.infrastructureLogging.console'),
    }))

  /**
   * Safe
   */
  app.hooks
    .on('build.bail', unwrap('build.bail'))
    .hooks.on('build.devtool', unwrap('build.devtool'))
    .hooks.on('build.loader', unwrap('build.loader'))
    .hooks.on(
      'build.module.rules.before',
      unwrap('build.module.rules.before'),
    )
    .hooks.on(
      'build.module.rules.after',
      unwrap('build.module.rules.after'),
    )
    .hooks.on(
      'build.module.unsafeCache',
      unwrap('build.module.unsafeCache'),
    )
    .hooks.on('build.module.noParse', unwrap('build.module.noParse'))
    .hooks.on(
      'build.infrastructureLogging.level',
      unwrap('build.infrastructureLogging.level'),
    )
    .hooks.on(
      'build.infrastructureLogging.console',
      unwrap('build.infrastructureLogging.console'),
    )
    .hooks.on('build.node', unwrap('build.node'))
    .hooks.on(
      'build.optimization.emitOnErrors',
      unwrap('build.optimization.emitOnErrors'),
    )
    .hooks.on(
      'build.optimization.minimize',
      unwrap('build.optimization.minimize'),
    )
    .hooks.on(
      'build.optimization.minimizer',
      unwrap('build.optimization.minimizer'),
    )
    .hooks.on(
      'build.optimization.moduleIds',
      unwrap('build.optimization.moduleIds'),
    )
    .hooks.on(
      'build.optimization.removeEmptyChunks',
      unwrap('build.optimization.removeEmptyChunks'),
    )
    .hooks.on(
      'build.optimization.runtimeChunk',
      unwrap('build.optimization.runtimeChunk'),
    )
    .hooks.on(
      'build.optimization.splitChunks',
      unwrap('build.optimization.splitChunks'),
    )
    .hooks.on('build.output.clean', unwrap('build.output.clean'))
    .hooks.on('build.output.pathinfo', unwrap('build.output.pathinfo'))
    .hooks.on(
      'build.output.publicPath',
      unwrap('build.output.publicPath', 'auto'),
    )
    .hooks.on('build.parallelism', unwrap('build.parallelism'))
    .hooks.on('build.performance', unwrap('build.performance'))
    .hooks.on('build.profile', unwrap('build.profile'))
    .hooks.async(
      'build.resolve.alias',
      unwrap('build.resolve.alias' as any),
    )
    .hooks.on(
      'build.resolve.extensions',
      unwrap('build.resolve.extensions'),
    )
    .hooks.on('build.stats', unwrap('build.stats'))
    .hooks.on('build.watch', unwrap('build.watch'))
    .hooks.on('build.watchOptions', unwrap('build.watchOptions'))
}
