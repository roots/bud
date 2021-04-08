import type {Framework} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

export function config(this: Framework) {
  this
    /**
     * build
     */
    .publish({
      build: (): Webpack.Configuration => ({
        bail: this.subscribe('build/bail'),
        cache: this.subscribe('build/cache'),
        context: this.subscribe('build/context'),
        devtool: this.subscribe('build/devtool'),
        entry: this.subscribe('build/entry'),
        externals: this.subscribe('build/externals'),
        mode: this.subscribe('build/mode'),
        module: this.subscribe('build/module'),
        name: this.subscribe('build/name'),
        node: this.subscribe('build/node'),
        output: this.subscribe('build/output'),
        optimization: this.subscribe('build/optimization'),
        parallelism: this.subscribe('build/parallelism'),
        performance: this.subscribe('build/performance'),
        plugins: this.subscribe('build/plugins'),
        profile: this.subscribe('build/profile'),
        recordsPath: this.subscribe('build/recordsPath'),
        resolve: this.subscribe('build/resolve'),
        stats: this.subscribe('build/stats'),
        target: this.subscribe('build/target'),
        watch: this.subscribe('build/watch'),
        watchOptions: this.subscribe('build/watchOptions'),
      }),
    })
    /**
     * build/resolve
     */
    .publish({
      'build/resolve': () => ({
        alias: this.subscribe('build/resolve/alias'),
        extensions: this.subscribe('build/resolve/extensions'),
        modules: this.subscribe('build/resolve/modules'),
      }),

      'build/resolve/alias': () =>
        this.store.get('options.resolve.alias') ?? {},

      'build/resolve/extensions': () =>
        this.store
          .get('options.resolve.extensions')
          .filter((v, i, s) => s.indexOf(v) === i),

      'build/resolve/modules': () => [
        this.subscribe('location/src'),
        this.subscribe('location/modules'),
        ...this.store.get('options.resolve.modules'),
        ...this.discovery.getEntries().map(([k, v]) => {
          return this.disk.path.posix.join(
            v.path,
            'node_modules',
          )
        }),
      ],
    })

    /**
     * build/bail
     */
    .publish({
      'build/bail': () => this.store.get('options.bail'),
    })

    /**
     * build/cache
     */
    .publish({
      'build/cache': () =>
        this.store.isFalse('options.cache')
          ? false
          : {
              name: this.subscribe('build/cache/name'),
              type: this.subscribe('build/cache/type'),
              cacheLocation: this.subscribe(
                'build/cache/cacheLocation',
              ),
              cacheDirectory: this.subscribe(
                'build/cache/directory',
              ),
              buildDependencies: this.subscribe(
                'build/cache/buildDependencies',
              ),
              version: this.subscribe('build/cache/version'),
            },

      /**
       * build/cache/name
       */
      'build/cache/name': () => this.name,
      'build/cache/type': () => 'filesystem',
      'build/cache/version': () => '',

      /**
       * build/cache/location
       */
      'build/cache/cacheLocation': () =>
        this.store.path.posix.resolve(
          this.subscribe('location/project'),
          this.subscribe('location/storage'),
        ),

      /**
       * build/cache/directory
       */
      'build/cache/directory': () =>
        this.store.path.posix.resolve(
          this.subscribe('location/project'),
          this.subscribe('location/storage'),
        ),
      'build/cache/buildDependencies': () => ({
        project: [
          this.store.path.posix.resolve(
            this.subscribe('location/project'),
            `${this.name}.config.js`,
          ),
          this.store.path.posix.resolve(
            this.subscribe('location/project'),
            'package.json',
          ),
        ],
      }),
    })

    /**
     * build/context
     */
    .publish({
      'build/context': () => this.subscribe('location/project'),
    })

    /**
     * build/devtool
     */
    .publish({
      'build/devtool': () => this.store.get('options.devtool'),
    })

    /**
     * build/entry
     */
    .publish({
      'build/entry': () => this.store.get('options.entry'),
    })

    .publish({
      /**
       * build/externals
       */
      'build/externals': () =>
        this.store.get('options.externals'),
    })

    /**
     * build/mode
     */
    .publish({
      'build/mode': () => this.mode,
    })

    /**
     * build/module
     */
    .publish({
      'build/module': () => ({
        rules: this.subscribe('build/module/rules'),
      }),
      'build/module/rules': () => [
        {
          parser: this.subscribe('build/module/rules/parser'),
          oneOf: this.subscribe('build/module/rules/oneOf'),
        },
      ],
      'build/module/rules/parser': () => ({
        requireEnsure: false,
      }),
      'build/module/rules/oneOf': () =>
        Object.values(this.subscribe('rule')),
    })

    /**
     * build/name
     */
    .publish({
      'build/name': () => this.name,
    })

    /**
     * build/node
     */
    .publish({
      'build/node': () => this.store.get('options.node'),
    })

    /**
     * build/optimization
     */
    .publish({
      'build/optimization': () => ({
        noEmitOnErrors: this.subscribe(
          'build/optimization/noEmitOnErrors',
        ),
        minimize: this.subscribe('build/optimization/minimize'),
        minimizer: this.subscribe(
          'build/optimization/minimizer',
        ),
        runtimeChunk: this.subscribe(
          'build/optimization/runtimeChunk',
        ),
        splitChunks: this.subscribe(
          'build/optimization/splitChunks',
        ),
      }),
      'build/optimization/noEmitOnErrors': () =>
        this.store.get('options.noEmitOnErrors'),
      'build/optimization/minimize': () =>
        this.store.get('options.minimize'),
      'build/optimization/minimizer': () =>
        this.store.get('options.minimizer'),
      'build/optimization/removeEmptyChunks': () =>
        this.store.get('options.removeEmptyChunks'),
      'build/optimization/runtimeChunk': () =>
        this.store.get('options.runtimeChunk'),
      'build/optimization/splitChunks': () => ({
        ...this.store.get('options.splitChunks'),
      }),
    })

    /**
     * build/output
     */
    .publish({
      'build/output': () => ({
        filename: this.subscribe('build/output/filename'),
        path: this.subscribe('build/output/path'),
        publicPath: this.subscribe('build/output/publicPath'),
      }),
      'build/output/filename': () =>
        `${
          this.store.isTrue('options.hash')
            ? this.store.get('options.hashFormat')
            : this.store.get('options.fileFormat')
        }.js`,
      'build/output/path': () => this.path('dist'),
      'build/output/publicPath': () =>
        this.subscribe('location/publicPath'),
    })

    /**
     * build/parallelism
     */
    .publish({
      'build/parallelism': () =>
        this.store.get('options.parallelism') ?? 1,

      /**
       * build/performance
       */
      'build/performance': () =>
        this.store.has('options.performance')
          ? this.store.get('options.performance')
          : false,

      /**
       * build/plugins
       */
      'build/plugins': () => this.extensions.make(),

      /**
       * build/profile
       */
      'build/profile': () =>
        this.store.has('options.profile')
          ? this.store.get('options.profile')
          : false,

      /**
       * build/recordsPath
       */
      'build/recordsPath': () =>
        this.store.path.posix.join(
          this.subscribe('location/project'),
          this.subscribe('location/storage'),
          'records.json',
        ),
    })

    /**
     * build/stats
     */
    .publish({
      'build/stats': () => this.store.get('options.stats'),

      /**
       * build/target
       */
      'build/target': () => this.store.get('options.target'),

      /**
       * build/watch
       */
      'build/watch': () => undefined,

      /**
       * build/watch-options
       */
      'build/watchOptions': () => ({
        ignored: [this.store.get('patterns.modules').toString()],
        poll: 1000,
      }),
    })
}
