import type {Framework} from '@roots/bud-framework'
import {pkgUp} from '@roots/bud-support'
import {posix} from 'path'

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
    .async<'build'>('build', async () => {
      const entry = await app.hooks.filterAsync<'build.entry'>(
        'build.entry',
      )
      const plugins = await app.hooks.filterAsync<'build.plugins'>(
        'build.plugins',
      )
      const resolve = await app.hooks.filterAsync<'build.resolve'>(
        'build.resolve',
      )

      return {
        entry,
        plugins,
        resolve,
        bail: app.hooks.filter<'build.bail'>('build.bail'),
        cache: app.hooks.filter<'build.cache'>('build.cache'),
        context: app.hooks.filter<'build.context'>('build.context'),
        devtool: app.hooks.filter<'build.devtool'>('build.devtool'),
        experiments: app.hooks.filter<'build.experiments'>(
          'build.experiments',
        ),
        externals: app.hooks.filter<'build.externals'>('build.externals'),
        infrastructureLogging:
          app.hooks.filter<'build.infrastructureLogging'>(
            'build.infrastructureLogging',
          ),
        mode: app.hooks.filter<'build.mode'>('build.mode'),
        module: app.hooks.filter<'build.module'>('build.module'),
        name: app.hooks.filter<'build.name'>('build.name'),
        node: app.hooks.filter<'build.node'>('build.node'),
        output: app.hooks.filter<'build.output'>('build.output'),
        optimization: app.hooks.filter<'build.optimization'>(
          'build.optimization',
        ),
        parallelism: app.hooks.filter<'build.parallelism'>(
          'build.parallelism',
        ),
        performance: app.hooks.filter<'build.performance'>(
          'build.performance',
        ),
        profile: app.hooks.filter<'build.profile'>('build.profile'),
        recordsPath: app.hooks.filter<'build.recordsPath'>(
          'build.recordsPath',
        ),
        stats: app.hooks.filter<'build.stats'>('build.stats'),
        target: app.hooks.filter<'build.target'>('build.target'),
        watch: app.hooks.filter<'build.watch'>('build.watch'),
        watchOptions: app.hooks.filter<'build.watchOptions'>(
          'build.watchOptions',
        ),
      }
    })

    /**
     * build.bail
     */
    .hooks.on<'build.bail'>('build.bail', () =>
      app.store.get('build.bail'),
    )

    /**
     * build.context
     */
    .hooks.on<'build.context'>('build.context', () => app.path('project'))

    /**
     * build.devtool
     */
    .hooks.on<'build.devtool'>('build.devtool', () =>
      app.store.get('build.devtool'),
    )

    /**
     * build.infrastructureLogging
     */
    .hooks.on<'build.infrastructureLogging'>(
      'build.infrastructureLogging',
      () => app.store.get('build.infrastructureLogging'),
    )

    /**
     * build.mode
     */
    .hooks.on<'build.mode'>('build.mode', () => app.mode)

    /**
     * build.module
     */
    .hooks.on<'build.module'>('build.module', () => ({
      rules: app.hooks.filter<'build.module.rules'>('build.module.rules'),
    }))

    /**
     * build.module.rules
     */
    .hooks.on<'build.module.rules'>('build.module.rules', () => [
      ...app.hooks.filter<'build.module.rules.before'>(
        'build.module.rules.before',
      ),
      {
        oneOf: app.hooks.filter<'build.module.rules.oneOf'>(
          'build.module.rules.oneOf',
        ),
      },
      ...app.hooks.filter<'build.module.rules.after'>(
        'build.module.rules.after',
      ),
    ])

    /**
     * build.module.rules[1].oneOf
     */
    .hooks.on<'build.module.rules.oneOf'>('build.module.rules.oneOf', () =>
      Object.values(app.build.rules).map(rule => rule.make()),
    )

    /**
     * build.module.rules[0]
     */
    .hooks.on<'build.module.rules.before'>(
      'build.module.rules.before',
      () => [
        {
          test: /\.[cm]?(jsx?|tsx?)$/,
          parser: {requireEnsure: false},
        },
      ],
    )

    /**
     * build.module.rules[2]
     */
    .hooks.on<'build.module.rules.after'>(
      'build.module.rules.after',
      () => [],
    )

    /**
     * build.name
     */
    .hooks.on(<'build.name'>'build.name', () => app.name)

    /**
     * build.node
     */
    .hooks.on<'build.node'>('build.node', () => false)

    /**
     * build.optimization
     */
    .hooks.on<'build.optimization'>('build.optimization', () => ({
      emitOnErrors: app.hooks.filter<'build.optimization.emitOnErrors'>(
        'build.optimization.emitOnErrors',
      ),

      minimize: app.hooks.filter<'build.optimization.minimize'>(
        'build.optimization.minimize',
      ),

      minimizer: app.hooks.filter<'build.optimization.minimizer'>(
        'build.optimization.minimizer',
      ),

      moduleIds: app.hooks.filter<'build.optimization.moduleIds'>(
        'build.optimization.moduleIds',
      ),

      runtimeChunk: app.hooks.filter<'build.optimization.runtimeChunk'>(
        'build.optimization.runtimeChunk',
      ),

      splitChunks: app.hooks.filter<'build.optimization.splitChunks'>(
        'build.optimization.splitChunks',
      ),
    }))

    /**
     * build.optimization.emitOnErrors
     */
    .hooks.on<'build.optimization.emitOnErrors'>(
      'build.optimization.emitOnErrors',
      () => app.store.get('build.optimization.emitOnErrors'),
    )

    /**
     * build.optimization.minimize
     */
    .hooks.on<'build.optimization.minimize'>(
      'build.optimization.minimize',
      () => app.store.is('features.minimize', true),
    )

    /**
     * build.optimization.minimizer
     */
    .hooks.on<'build.optimization.minimizer'>(
      'build.optimization.minimizer',
      () => ['...'],
    )

    /**
     * build.optimization.moduleIds
     */
    .hooks.on<'build.optimization.moduleIds'>(
      'build.optimization.moduleIds',
      () => app.store.get('build.optimization.moduleIds'),
    )

    /**
     * build.optimization.removeEmptyChunks
     */
    .hooks.on<'build.optimization.removeEmptyChunks'>(
      'build.optimization.removeEmptyChunks',
      () => app.store.get('build.optimization.removeEmptyChunks'),
    )

    /**
     * build.optimization.runtimeChunk
     */
    .hooks.on('build.optimization.runtimeChunk', () =>
      app.store.is('features.runtimeChunk', true),
    )
    /**
     * build.optimization.splitChunks
     */
    .hooks.on(
      'build.optimization.splitChunks',
      () => app.store.is('features.splitChunks', true) as any,
    )

    /**
     * build.output
     */
    .hooks.on<'build.output'>('build.output', () => ({
      assetModuleFilename:
        app.hooks.filter<'build.output.assetModuleFilename'>(
          'build.output.assetModuleFilename',
        ),
      chunkFilename: app.hooks.filter('build.output.chunkFilename'),
      clean: app.hooks.filter<'build.output.clean'>('build.output.clean'),
      filename: app.hooks.filter<'build.output.filename'>(
        'build.output.filename',
      ),
      path: app.hooks.filter<'build.output.path'>('build.output.path'),
      pathinfo: app.hooks.filter<'build.output.pathinfo'>(
        'build.output.pathinfo',
      ),
      publicPath: app.hooks.filter<'build.output.publicPath'>(
        'build.output.publicPath',
      ),
    }))

    /**
     * build.output.assetModuleFilename
     */
    .hooks.on('build.output.assetModuleFilename', () =>
      app.isProduction && app.store.is('features.hash', true)
        ? `assets/${app.store.get('hashFormat')}[ext]`
        : app.store.get('fileFormat'),
    )

    .hooks.on('build.output.clean', () =>
      app.store.get('build.output.clean'),
    )

    /**
     * build.output.filename
     */
    .hooks.on(
      'build.output.filename',
      () =>
        `${
          app.store.is('features.hash', true) && app.isProduction
            ? app.store.get('hashFormat')
            : app.store.get('fileFormat')
        }.js`,
    )

    /**
     * build.output.path
     */
    .hooks.on('build.output.path', () => app.path('dist'))

    /**
     * build.output.pathinfo
     */
    .hooks.on('build.output.pathinfo', () =>
      app.store.get('build.output.pathinfo'),
    )

    /**
     * build.output.publicPath
     */
    .hooks.on('build.output.publicPath', () =>
      app.store.get('location.publicPath'),
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
    .hooks.on<'build.performance'>('build.performance', () =>
      app.store.get('build.performance'),
    )

    .hooks.async<'build.plugins'>('build.plugins', async () => {
      const newExtensions = await app.extensions.make()
      return newExtensions
    })

    /**
     * build.profile
     */
    .hooks.on('build.profile', () => app.store.get('build.profile'))

    /**
     * build.recordsPath
     */
    .hooks.on<'build.recordsPath'>('build.recordsPath', () =>
      app.path('storage', app.name, `modules.json`),
    )

    .hooks.async<'build.resolve'>('build.resolve', async () => {
      const modules = await app.hooks.filterAsync<'build.resolve.modules'>(
        'build.resolve.modules',
      )

      const alias = await app.hooks.filter<'build.resolve.alias'>(
        'build.resolve.alias',
      )

      const extensions = app.hooks.filter<'build.resolve.extensions'>(
        'build.resolve.extensions',
      )

      return {modules, alias, extensions}
    })

    /**
     * build.resolve.alias
     */
    .hooks.on<'build.resolve.alias'>('build.resolve.alias', () => ({}))

    /**
     * build.resolve.modules
     */
    .hooks.async<'build.resolve.modules'>(
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
     * build.resolve.extensions
     */
    .hooks.on<'build.resolve.extensions'>('build.resolve.extensions', () =>
      app.store.get('build.resolve.extensions'),
    )

    /**
     * build.stats
     */
    .hooks.on<'build.stats'>('build.stats', () =>
      app.store.get('build.stats'),
    )

    /**
     * build.target
     */
    .hooks.on<'build.target'>(
      'build.target',
      () => `browserslist:${app.path('project', 'package.json')}`,
    )

    /**
     * build.watch
     */
    .hooks.on<'build.watch'>('build.watch', () =>
      app.store.get('build.watch'),
    )

    /**
     * build.watchOptions
     */
    .hooks.on<'build.watchOptions'>('build.watchOptions', () =>
      app.store.get('build.watchOptions'),
    )
}
