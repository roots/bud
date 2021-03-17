import type {Framework} from '@roots/bud-framework'

const handle = 'providers/build/config'

export function config(app: Framework) {
  app.publish(
    {
      /**
       * build
       */
      build: () => {
        app.build.logger.scope('build/config').wait({
          message: 'Config build requested',
        })

        return {
          bail: app.subscribe('build/bail', handle),
          cache: app.subscribe('build/cache', handle),
          context: app.subscribe('build/context', handle),
          devtool: app.subscribe('build/devtool', handle),
          entry: app.subscribe('build/entry', handle),
          externals: app.subscribe('build/externals', handle),
          infrastructureLogging: app.subscribe(
            'build/infrastructureLogging',
            handle,
          ),
          mode: app.subscribe('build/mode', handle),
          module: app.subscribe('build/module', handle),
          name: app.subscribe('build/name', handle),
          node: app.subscribe('build/node', handle),
          output: app.subscribe('build/output', handle),
          parallelism: app.subscribe(
            'build/parallelism',
            handle,
          ),
          performance: app.subscribe(
            'build/performance',
            handle,
          ),
          plugins: app.subscribe('build/plugins', handle),
          profile: app.subscribe('build/profile', handle),
          recordsPath: app.subscribe(
            'build/recordsPath',
            handle,
          ),
          resolve: app.subscribe('build/resolve', handle),
          stats: app.subscribe('build/stats', handle),
          target: app.subscribe('build/target', handle),
          watch: app.subscribe('build/watch', handle),
          watchOptions: app.subscribe(
            'build/watchOptions',
            handle,
          ),
        }
      },

      /**
       * build/bail
       */
      'build/bail': () => app.store.get('options.bail'),

      /**
       * build/cache
       */
      'build/cache': () =>
        app.store.isFalse('options.cache')
          ? false
          : {
              type: app.subscribe('build/cache/type', handle),
              name: app.subscribe('build/cache/name', handle),
              cacheLocation: app.subscribe(
                'build/cache/location',
                handle,
              ),
              cacheDirectory: app.subscribe(
                'build/cache/directory',
                handle,
              ),
              config: app.subscribe(
                'build/cache/buildDependencies',
              ),
            },
      'build/cache/type': () => 'filesystem',
      'build/cache/name': () => 'application',
      'build/cache/location': () =>
        app.store.path.posix.resolve(
          app.subscribe('location/project', handle),
          app.subscribe('location/storage', handle),
        ),
      'build/cache/directory': () =>
        app.store.path.posix.resolve(
          app.subscribe('location/project', handle),
          app.subscribe('location/storage', handle),
        ),
      'build/cache/buildDependencies': () => [
        app.store.path.posix.resolve(
          app.subscribe('location/project', handle),
          `${app.name}.config.js`,
        ),
        app.store.path.posix.resolve(
          app.subscribe('location/project', handle),
          'package.json',
        ),
      ],

      /**
       * build/context
       */
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
      'build/externals': () =>
        app.store.get('options.externals'),

      /**
       * build/infrastructureLogging
       */
      'build/infrastructureLogging': () => ({
        level: app.subscribe(
          'build/infrastructureLogging/level',
        ),
      }),
      'build/infrastructureLogging/level': () => 'none',

      /**
       * build/mode
       */
      'build/mode': () => app.mode,

      /**
       * build/module
       */
      'build/module': () => ({
        rules: app.subscribe('build/module/rules', handle),
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
        Object.values(app.subscribe('rule', handle)),

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
          handle,
        ),
        noEmitOnErrors: app.subscribe(
          'build/optimization/noEmitOnErrors',
          handle,
        ),
        minimize: app.subscribe(
          'build/optimization/minimize',
          handle,
        ),
        minimizer: app.subscribe(
          'build/optimization/minimizer',
          handle,
        ),
        runtimeChunk: app.subscribe(
          'build/optimization/runtimeChunk',
          handle,
        ),
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
        function (
          module: any,
          _chunks: any,
          cacheGroupKey: any,
        ) {
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
        filename: app.subscribe('build/output/filename', handle),
        path: app.subscribe('build/output/path', handle),
        publicPath: app.subscribe(
          'build/output/publicPath',
          handle,
        ),
      }),
      'build/output/filename': () =>
        app.store.isTrue('options.hash')
          ? app.store.get('options.hashFormat').concat('.js')
          : app.store.get('options.fileFormat').concat('.js'),
      'build/output/path': () =>
        app.store.path.posix.join(
          app.subscribe('location/project', handle),
          app.subscribe('location/dist', handle),
        ),
      'build/output/publicPath': () =>
        app.subscribe('location/publicPath', handle),

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
          app.subscribe('location/project', handle),
          app.subscribe('location/storage', handle),
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
    },
    handle,
  )
}
