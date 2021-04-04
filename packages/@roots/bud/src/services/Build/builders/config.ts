import type {Framework} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

export function config(app: Framework) {
  /**
   * build
   */
  app.publish({
    build: (): Webpack.Configuration => {
      app.build.logger.scope('build/config').wait({
        message: 'Config build requested',
      })

      return {
        bail: app.subscribe('build/bail'),
        cache: app.subscribe('build/cache'),
        context: app.subscribe('build/context'),
        devtool: app.subscribe('build/devtool'),
        entry: app.subscribe('build/entry'),
        externals: app.subscribe('build/externals'),
        mode: app.subscribe('build/mode'),
        module: app.subscribe('build/module'),
        name: app.subscribe('build/name'),
        node: app.subscribe('build/node'),
        output: app.subscribe('build/output'),
        optimization: app.subscribe('build/optimization'),
        parallelism: app.subscribe('build/parallelism'),
        performance: app.subscribe('build/performance'),
        plugins: app.subscribe('build/plugins'),
        profile: app.subscribe('build/profile'),
        recordsPath: app.subscribe('build/recordsPath'),
        resolve: app.subscribe('build/resolve'),
        stats: app.subscribe('build/stats'),
        target: app.subscribe('build/target'),
        watch: app.subscribe('build/watch'),
        watchOptions: app.subscribe('build/watchOptions'),
      }
    },
  })

  /**
   * build/bail
   */
  app.publish({
    'build/bail': () => app.store.get('options.bail'),
    /**
     * build/cache
     */
    'build/cache': () =>
      app.store.isFalse('options.cache')
        ? false
        : {
            name: app.subscribe('build/cache/name'),
            cacheLocation: app.subscribe('build/cache/location'),
            cacheDirectory: app.subscribe(
              'build/cache/directory',
            ),
            config: app.subscribe(
              'build/cache/buildDependencies',
            ),
            version: app.subscribe('build/cache/version'),
          },

    /**
     * build/cache/location
     */
    'build/cache/location': () =>
      app.store.path.posix.resolve(
        app.subscribe('location/project'),
        app.subscribe('location/storage'),
      ),

    /**
     * build/cache/directory
     */
    'build/cache/directory': () =>
      app.store.path.posix.resolve(
        app.subscribe('location/project'),
        app.subscribe('location/storage'),
      ),
    'build/cache/buildDependencies': () => [
      app.store.path.posix.resolve(
        app.subscribe('location/project'),
        `${app.name}.config.js`,
      ),
      app.store.path.posix.resolve(
        app.subscribe('location/project'),
        'package.json',
      ),
    ],
    'build/cache/type': () => 'filesystem',

    'build/cache/version': () => '',
  })

  /**
   * build/context
   */
  app.publish({
    'build/context': () => app.subscribe('location/project'),

    /**
     * build/devtool
     */
    'build/devtool': () => app.store.get('options.devtool'),

    /**
     * build/entry
     */
    'build/entry': () => app.store.get('options.entry'),

    /**
     * build/externals
     */
    'build/externals': () => app.store.get('options.externals'),

    /**
     * build/mode
     */
    'build/mode': () => app.mode,

    /**
     * build/module
     */
    'build/module': () => ({
      rules: app.subscribe('build/module/rules'),
    }),
    'build/module/rules': () => [
      {
        parser: app.subscribe('build/module/rules/parser'),
        oneOf: app.subscribe('build/module/rules/oneOf'),
      },
    ],
    'build/module/rules/parser': () => ({
      requireEnsure: false,
    }),
    'build/module/rules/oneOf': () =>
      Object.values(app.subscribe('rule')),

    /**
     * build/name
     */
    'build/name': () => app.name,

    /**
     * build/node
     */
    'build/node': () => app.store.get('options.node'),

    /**
     * build/optimization
     */
    'build/optimization': () => ({
      namedModules: app.subscribe(
        'build/optimization/namedModules',
      ),
      noEmitOnErrors: app.subscribe(
        'build/optimization/noEmitOnErrors',
      ),
      minimize: app.subscribe('build/optimization/minimize'),
      minimizer: app.subscribe('build/optimization/minimizer'),
      runtimeChunk: app.store.enabled(
        'options.runtimeChunkEnabled',
      )
        ? app.subscribe('build/optimization/runtimeChunk')
        : false,
      splitChunks: app.store.enabled(
        'options.splitChunks.enabled',
      )
        ? app.subscribe('build/optimization/splitChunks')
        : false,
    }),
    'build/optimization/namedModules': () =>
      app.store.get('options.namedModules'),
    'build/optimization/noEmitOnErrors': () =>
      app.store.get('options.noEmitOnErrors'),
    'build/optimization/minimize': () =>
      app.store.get('options.minimize'),
    'build/optimization/minimizer': () =>
      app.store.get('options.minimizer'),
    'build/optimization/runtimeChunk': () =>
      app.store.get('options.runtimeChunk'),
    'build/optimization/splitChunks': () => ({
      cacheGroups: app.subscribe(
        'build/optimization/splitChunks/cacheGroups',
      ),
    }),
    'build/optimization/splitChunks/cacheGroups': () => ({
      vendor: app.subscribe(
        'build/optimization/splitChunks/cacheGroups/vendor',
      ),
    }),
    'build/optimization/splitChunks/cacheGroups/vendor': () => ({
      enforce: app.subscribe(
        'build/optimization/splitChunks/cacheGroups/vendor/priority',
      ),
      priority: app.subscribe(
        'build/optimization/splitChunks/cacheGroups/vendor/priority',
      ),
      test: app.subscribe(
        'build/optimization/splitChunks/cacheGroups/vendor/test',
      ),
      chunks: app.subscribe(
        'build/optimization/splitChunks/cacheGroups/vendor/chunks',
      ),
      name: app.subscribe(
        'build/optimization/splitChunks/cacheGroups/vendor/name',
      ),
      reuseExistingChunk: app.subscribe(
        'build/optimization/splitChunks/cacheGroups/vendor/reuseExistingChunk',
      ),
    }),
    'build/optimization/splitChunks/cacheGroups/vendor/enforce': () =>
      true,
    'build/optimization/splitChunks/cacheGroups/vendor/priority': () =>
      -10,
    'build/optimization/splitChunks/cacheGroups/vendor/test': () =>
      /[\\/]node_modules[\\/]/,
    'build/optimization/splitChunks/cacheGroups/vendor/chunks': () =>
      'all',
    'build/optimization/splitChunks/cacheGroups/vendor/name': () =>
      function (module: any, _chunks: any, cacheGroupKey: any) {
        const moduleFileNameParts = module
          .identifier()
          .split('/')
          .reduceRight(item => item)
          .split('.')

        const file = moduleFileNameParts
          .slice(0, moduleFileNameParts.length - 1)
          .join('.')

        return `${cacheGroupKey}/${file}`
      },
    'build/optimization/splitChunks/cacheGroups/vendor/reuseExistingChunk': () =>
      true,

    /**
     * build/output
     */
    'build/output': () => ({
      filename: app.subscribe('build/output/filename'),
      path: app.subscribe('build/output/path'),
      publicPath: app.subscribe('build/output/publicPath'),
    }),
    'build/output/filename': () =>
      `${
        app.store.isTrue('options.hash')
          ? app.store.get('options.hashFormat')
          : app.store.get('options.fileFormat')
      }.js`,
    'build/output/path': () => app.dist(),
    'build/output/publicPath': () =>
      app.subscribe('location/publicPath'),

    /**
     * build/parallelism
     */
    'build/parallelism': () =>
      app.store.get('options.parallelism') ?? 1,

    /**
     * build/performance
     */
    'build/performance': () =>
      app.store.has('options.performance')
        ? app.store.get('options.performance')
        : false,

    /**
     * build/plugins
     */
    'build/plugins': () => app.extensions.make(),

    /**
     * build/profile
     */
    'build/profile': () =>
      app.store.has('options.profile')
        ? app.store.get('options.profile')
        : false,

    /**
     * build/recordsPath
     */
    'build/recordsPath': () =>
      app.store.path.posix.join(
        app.subscribe('location/project'),
        app.subscribe('location/storage'),
        'records.json',
      ),

    /**
     * build/resolve
     */
    'build/resolve': () => ({
      alias: app.subscribe('build/resolve/alias'),
      extensions: app.subscribe('build/resolve/extensions'),
      modules: app.subscribe('build/resolve/modules'),
    }),
    'build/resolve/alias': () =>
      app.store.get('options.resolve.alias') ?? {},
    'build/resolve/extensions': () =>
      app.store
        .get('options.resolve.extensions')
        .filter((v, i, s) => s.indexOf(v) === i),
    'build/resolve/modules': () => [
      app.subscribe('location/src'),
      app.subscribe('location/modules'),
      ...app.store.get('options.resolve.modules'),
      ...app.discovery.getEntries().map(([k, v]) => {
        return app.disk.path.posix.join(v.path, 'node_modules')
      }),
    ],

    /**
     * build/stats
     */
    'build/stats': () => app.store.get('options.stats'),

    /**
     * build/target
     */
    'build/target': () => app.store.get('options.target'),

    /**
     * build/watch
     */
    'build/watch': () => app.isDevelopment,

    /**
     * build/watch-options
     */
    'build/watchOptions': () => ({
      ignored: [app.store.get('patterns.modules')],
      poll: 1000,
    }),
  })
}
