import type {Framework} from '@roots/bud-framework'
import {pkgUp} from '@roots/bud-support'
import {posix} from 'path'
import {Configuration} from 'webpack'

import {filenameFormat} from './filenameFormat'

const {dirname} = posix

/**
 * Filters framework values and returns a webpack configuration
 *
 * @param app - the Framework instance
 *
 * @public
 */
export async function build(app: Framework): Promise<void> {
  app.hooks
    .async('build', async () => {
      const entry = await app.hooks.filterAsync('build.entry')
      const plugins = await app.hooks.filterAsync('build.plugins')
      const resolve = await app.hooks.filterAsync('build.resolve')

      return {
        entry,
        plugins,
        resolve,
        bail: app.hooks.filter('build.bail'),
        cache: app.hooks.filter('build.cache'),
        context: app.hooks.filter('build.context'),
        devtool: app.hooks.filter('build.devtool'),
        experiments: app.hooks.filter('build.experiments'),
        externals: app.hooks.filter('build.externals'),
        infrastructureLogging: app.hooks.filter(
          'build.infrastructureLogging',
        ),
        mode: app.hooks.filter('build.mode'),
        module: app.hooks.filter('build.module'),
        name: app.hooks.filter('build.name'),
        node: app.hooks.filter('build.node'),
        output: app.hooks.filter('build.output'),
        optimization: app.hooks.filter('build.optimization'),
        parallelism: app.hooks.filter('build.parallelism'),
        performance: app.hooks.filter('build.performance'),
        profile: app.hooks.filter('build.profile'),
        recordsPath: app.hooks.filter('build.recordsPath'),
        stats: app.hooks.filter('build.stats'),
        target: app.hooks.filter('build.target'),
        watch: app.hooks.filter('build.watch'),
        watchOptions: app.hooks.filter('build.watchOptions'),
      }
    })

    /**
     * build.bail
     */
    .hooks.on('build.bail', () => app.store.get('build.bail'))

    /**
     * build.context
     */
    .hooks.on('build.context', () => app.path('project'))

    /**
     * build.devtool
     */
    .hooks.on('build.devtool', () => app.store.get('build.devtool'))

    /**
     * build.infrastructureLogging
     */
    .hooks.on('build.infrastructureLogging', () =>
      app.store.get('build.infrastructureLogging'),
    )

    /**
     * build.mode
     */
    .hooks.on('build.mode', () => app.mode)

    /**
     * build.module
     */
    .hooks.on('build.module', (): Configuration['module'] => ({
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
      Object.values(app.build.rules).map(rule => rule.make()),
    )
    .hooks.on('build.module.rules.before', () => [
      {
        test: /\.[cm]?(jsx?|tsx?)$/,
        parser: {
          requireEnsure: false,
        },
      },
    ])
    .hooks.on('build.module.rules.after', () => [])
    .hooks.on('build.module.unsafeCache', () =>
      app.store.get('build.module.unsafeCache'),
    )

    /**
     * build.name
     */
    .hooks.on('build.name', () => app.name)

    /**
     * build.node
     */
    .hooks.on('build.node', (): Configuration['node'] => false)

    /**
     * build.optimization
     */
    .hooks.on('build.optimization', () => ({
      emitOnErrors: app.hooks.filter('build.optimization.emitOnErrors'),
      minimize: app.hooks.filter('build.optimization.minimize'),
      minimizer: app.hooks.filter('build.optimization.minimizer'),
      moduleIds: app.hooks.filter('build.optimization.moduleIds'),
      runtimeChunk: app.hooks.filter('build.optimization.runtimeChunk'),
      splitChunks: app.hooks.filter('build.optimization.splitChunks'),
    }))
    .hooks.on('build.optimization.emitOnErrors', () =>
      app.store.get('build.optimization.emitOnErrors'),
    )
    .hooks.on('build.optimization.minimize', () =>
      app.store.is('features.minimize', true),
    )
    .hooks.on(
      'build.optimization.minimizer',
      (): Configuration['optimization']['minimizer'] => ['...'],
    )
    .hooks.on('build.optimization.moduleIds', () =>
      app.store.get('build.optimization.moduleIds'),
    )
    .hooks.on('build.optimization.removeEmptyChunks', () =>
      app.store.get('build.optimization.removeEmptyChunks'),
    )
    .hooks.on('build.optimization.runtimeChunk', () =>
      app.store.is('features.runtimeChunk', true),
    )
    .hooks.on('build.optimization.splitChunks', () =>
      app.store.is('features.splitChunks', true)
        ? app.store.get('build.optimization.splitChunks')
        : undefined,
    )

    /**
     * build.output
     */
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
    .hooks.on('build.output.clean', () =>
      app.store.get('build.output.clean'),
    )
    .hooks.on('build.output.filename', () => filenameFormat(app))
    .hooks.on('build.output.path', () => app.path('dist'))
    .hooks.on('build.output.pathinfo', () =>
      app.store.get('build.output.pathinfo'),
    )
    .hooks.on('build.output.publicPath', () =>
      app.store.get('build.output.publicPath'),
    )

    /**
     * Parallelism
     */
    .hooks.on('build.parallelism', () =>
      app.store.get('build.parallelism'),
    )

    /**
     * build.performance
     */
    .hooks.on('build.performance', () =>
      app.store.get('build.performance'),
    )

    /**
     * build.plugins
     */
    .hooks.async('build.plugins', async () => await app.extensions.make())

    /**
     * build.profile
     */
    .hooks.on('build.profile', () => app.store.get('build.profile'))

    /**
     * build.recordsPath
     */
    .hooks.on('build.recordsPath', () =>
      app.path('storage', app.name, `modules.json`),
    )

    /**
     * build.resolve
     */
    .hooks.async('build.resolve', async () => {
      const alias = await app.hooks.filterAsync('build.resolve.alias')
      const extensions = app.hooks.filter('build.resolve.extensions')
      const modules = await app.hooks.filterAsync('build.resolve.modules')

      return {alias, extensions, modules}
    })
    .hooks.async('build.resolve.alias', async () => ({}))
    .hooks.async('build.resolve.modules', async (value?: any) => {
      const budPath = dirname(
        await pkgUp.pkgUp({
          cwd: require.resolve('@roots/bud'),
        }),
      )

      const peersPath = budPath
        .split('/')
        .splice(0, budPath.split('/').length - 2)
        .join('/')

      return [
        ...new Set([
          ...(value ?? []),
          app.hooks.filter('location.src'),
          app.hooks.filter('location.modules'),
          peersPath,
          ...(app.project?.get('resolve') ?? []),
          ...(app.root?.project.get('resolve') ?? []),
        ]),
      ]
    })
    .hooks.on('build.resolve.extensions', () =>
      app.store.get('build.resolve.extensions'),
    )

    /**
     * build.stats
     */
    .hooks.on('build.stats', () => app.store.get('build.stats'))

    /**
     * build.target
     */
    .hooks.on('build.target', () =>
      app.project.has('manifest.browserslist') &&
      app.project.isArray('manifest.browserslist')
        ? `browserslist:${app.path('project', 'package.json')}`
        : undefined,
    )

    /**
     * build.watch
     */
    .hooks.on('build.watch', () => app.store.get('build.watch'))

    /**
     * build.watchOptions
     */
    .hooks.on('build.watchOptions', () =>
      app.store.get('build.watchOptions'),
    )
}
