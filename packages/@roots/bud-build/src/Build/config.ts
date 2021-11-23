import type {Framework} from '@roots/bud-framework'
import {pkgUp} from '@roots/bud-support'
import {posix} from 'path'
import type {Configuration} from 'webpack'

const {dirname} = posix

/**
 * Filters framework values and returns a webpack configuration
 *
 * @param app - the Framework instance
 *
 * @public
 */
export async function config(app: Framework): Promise<void> {
  app.hooks
    .on('build', async () => {
      const entry = await app.hooks.promised('build.entry')
      const plugins = await app.hooks.promised('build.plugins')
      const resolve = await app.hooks.promised('build.resolve')

      return {
        bail: app.hooks.filter('build.bail'),
        cache: app.hooks.filter('build.cache'),
        context: app.hooks.filter('build.context'),
        devtool: app.hooks.filter('build.devtool'),
        entry,
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
        plugins,
        profile: app.hooks.filter('build.profile'),
        recordsPath: app.hooks.filter('build.recordsPath'),
        resolve,
        stats: app.hooks.filter('build.stats'),
        target: app.hooks.filter('build.target'),
        watch: app.hooks.filter('build.watch'),
        watchOptions: app.hooks.filter('build.watchOptions'),
      }
    })

    .hooks.on('build.bail', () => app.store.get('build.bail'))

    /**
     * Context
     */
    .hooks.on('build.context', () => app.path('project'))

    /**
     * Devtool
     */
    .hooks.on('build.devtool', () =>
      app.store.get('build.devtool'),
    )

    /**
     * InfrastructureLogging
     */
    .hooks.on(
      'build.infrastructureLogging',
      (): Configuration['infrastructureLogging'] => ({
        ...app.store.get('build.infrastructureLogging'),
      }),
    )

    /**
     * Mode
     */
    .hooks.on('build.mode', () => app.mode)

    /**
     * Module
     */
    .hooks.on('build.module', () => ({
      rules: app.hooks.filter('build.module.rules'),
    }))
    .hooks.on('build.module.rules', () => [
      ...app.hooks.filter('build.module.rules.before'),
      {
        oneOf: app.hooks.filter('build.module.rules.oneOf'),
      },
      ...app.hooks.filter('build.module.rules.after'),
    ])
    .hooks.on('build.module.rules.oneOf', () =>
      Object.values(app.build.rules).map(rule => rule.make(app)),
    )
    .hooks.on('build.module.rules.before', () => [
      {
        test: /\.[cm]?(jsx?|tsx?)$/,
        parser: {requireEnsure: false},
      },
    ])
    .hooks.on('build.module.rules.after', () => [])

    /**
     * Name
     */
    .hooks.on('build.name', () => app.name)

    /**
     * Node
     */
    .hooks.on('build.node', false)

    /**
     * Output
     */
    .hooks.on('build.output', () => ({
      path: app.hooks.filter('build.output.path'),
      publicPath: app.hooks.filter('build.output.publicPath'),
      filename: app.hooks.filter('build.output.filename'),
    }))
    .hooks.on(
      'build.output.filename',
      () =>
        `${
          app.store.get('features.hash')
            ? app.store.get('hashFormat')
            : app.store.get('fileFormat')
        }.js`,
    )
    .hooks.on('build.output.path', () => app.path('dist'))
    .hooks.on('build.output.pathinfo', () =>
      app.store.get('build.output.pathinfo'),
    )
    .hooks.on('build.output.publicPath', () =>
      app.store.get('location.publicPath'),
    )

    /**
     * Optimization
     */
    .hooks.on('build.optimization', () => ({
      emitOnErrors: app.hooks.filter(
        'build.optimization.emitOnErrors',
      ),
      minimize: app.hooks.filter('build.optimization.minimize'),
      minimizer: app.hooks.filter(
        'build.optimization.minimizer',
      ),
      moduleIds: app.hooks.filter(
        'build.optimization.moduleIds',
      ),
      runtimeChunk: app.hooks.filter(
        'build.optimization.runtimeChunk',
      ),
      splitChunks: app.hooks.filter(
        'build.optimization.splitChunks',
      ),
    }))
    .hooks.on('build.optimization.emitOnErrors', () =>
      app.store.get('build.optimization.emitOnErrors'),
    )
    .hooks.on('build.optimization.minimize', () => false)
    .hooks.on('build.optimization.minimizer', () => ['...'])
    .hooks.on('build.optimization.moduleIds', () =>
      app.store.get('build.optimization.moduleIds'),
    )
    .hooks.on('build.optimization.removeEmptyChunks', () =>
      app.store.get('build.optimization.removeEmptyChunks'),
    )
    .hooks.on('build.optimization.runtimeChunk', () => undefined)
    .hooks.on('build.optimization.splitChunks', () =>
      app.store.is('features.splitChunks', true)
        ? app.store.get('build.optimization.splitChunks')
        : false,
    )

    /**
     * Parallelism
     */
    .hooks.on('build.parallelism', () =>
      app.store.get('build.parallelism'),
    )

    /**
     * Performance
     */
    .hooks.on('build.performance', () =>
      app.store.get('build.performance'),
    )

    /**
     * Plugins
     */
    .hooks.on(
      'build.plugins',
      async () => await app.extensions.make(),
    )

    /**
     * Profile
     */
    .hooks.on('build.profile', () =>
      app.store.get('build.profile'),
    )

    /**
     * RecordsPath
     */
    .hooks.on('build.recordsPath', () =>
      app.path('storage', app.name, `modules.json`),
    )
    /**
     * Resolve
     */
    .hooks.on('build.resolve', async () => {
      const modules = await app.hooks.promised(
        'build.resolve.modules',
      )
      const alias = await app.hooks.filter('build.resolve.alias')
      const extensions = app.hooks.filter(
        'build.resolve.extensions',
        app.store.get('build.resolve.extensions'),
      )

      return {modules, alias, extensions}
    })
    .hooks.on('build.resolve.alias', {})
    .hooks.on(
      'build.resolve.modules',
      async (value?: any): Promise<any> => {
        const budPkg = await pkgUp({
          cwd: require.resolve('@roots/bud'),
        })

        const bud = dirname(budPkg)

        const roots = bud
          .split('/')
          .splice(0, bud.split('/').length - 1)
          .join('/')

        const peers = roots
          .split('/')
          .splice(0, roots.split('/').length - 1)
          .join('/')

        return [
          ...new Set([
            ...(value ?? []),
            app.hooks.filter('location.src'),
            app.hooks.filter('location.modules'),
            peers,
            ...(app.project?.get('resolve') ?? []),
            ...(app.root?.project.get('resolve') ?? []),
          ]),
        ]
      },
    )

    /**
     * Stats
     */
    .hooks.on('build.stats', (): Configuration['stats'] =>
      app.store.get('build.stats'),
    )

    /**
     * Target
     */
    .hooks.on(
      'build.target',
      (): Configuration['target'] =>
        `browserslist:${app.path('project', 'package.json')}`,
    )

    /**
     * Watch
     */
    .hooks.on('build.watch', () => app.store.get('build.watch'))
    .hooks.on('build.watchOptions', () =>
      app.store.get('build.watchOptions'),
    )
}
