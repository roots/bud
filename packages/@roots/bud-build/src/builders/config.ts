import type {Framework} from '@roots/bud-framework'

export function config(this: Framework): void {
  this.hooks
    .link('build', [
      'bail',
      'cache',
      'context',
      'devServer',
      'devtool',
      'entry',
      'externals',
      'mode',
      'module',
      'name',
      'node',
      'output',
      'optimization',
      'parallelism',
      'performance',
      'plugins',
      'profile',
      'recordsPath',
      'resolve',
      'stats',
      'target',
      'watch',
      'watchOptions',
    ])
    .hooks.link('build/optimization', [
      'emitOnErrors',
      'minimize',
      'minimizer',
      'moduleIds',
      'runtimeChunk',
      'splitChunks',
    ])
    .hooks.link('build/resolve', [
      'alias',
      'extensions',
      'modules',
    ])
    .hooks.link('build/module', ['rules'])
    .hooks.link('build/cache', [
      'name',
      'type',
      'directory',
      'cacheLocation',
      'buildDependencies',
      'version',
      'type',
    ])
    .hooks.link('build/output', [
      'path',
      'publicPath',
      'filename',
    ])

  this.hooks
    .on('build/bail', true)
    .hooks.on(
      'build/cache/name',
      () => `${this.name}-${this.cache.version}`,
    )
    .hooks.on('build/cache/type', 'filesystem')
    .hooks.on('build/cache/version', () => this.cache.version)
    .hooks.on('build/cache/cacheLocation', () =>
      this.path('storage'),
    )
    .hooks.on('build/cache/directory', () =>
      this.path('storage'),
    )
    .hooks.on('build/cache/buildDependencies', () => ({
      project: [
        this.path('project', `${this.name}.config.js`),
        this.path('project', 'package.json'),
      ],
    }))
    .hooks.on('build/node', false)
    .hooks.on('build/context', () => this.path('project'))
    .hooks.on('build/devServer', undefined)
    .hooks.on('build/devtool', false)
    // .hooks.on('build/entry', {})
    // .hooks.on('build/externals', {})
    .hooks.on('build/mode', () => this.mode)
    .hooks.on('build/module/rules', () => [
      {
        parser: this.hooks.filter('build/module/rules/parser'),
        oneOf: this.hooks.filter('build/module/rules/oneOf'),
      },
    ])

  this.publish({
    'build/module/rules/parser': {
      requireEnsure: false,
    },
    'build/module/rules/oneOf': () =>
      Object.values(this.hooks.filter('rule')),

    'build/name': () => this.name,
    'build/optimization/emitOnErrors': this.store.get(
      'build.optimization.emitOnErrors',
    ),
    'build/optimization/minimize': () => this.isProduction,
    'build/optimization/minimizer': ['...'],
    'build/optimization/moduleIds': 'deterministic',
    'build/optimization/removeEmptyChunks': true,
    'build/output/filename': () =>
      `${
        this.store.get('hash')
          ? this.store.get('hashFormat')
          : this.store.get('fileFormat')
      }.js`,
    'build/output/path': () => this.path('dist'),
    'build/output/publicPath': () => this.publicPath(),
    'build/parallelism': () =>
      this.store.get('build.parallelism'),
    'build/performance': () => ({}),
    'build/plugins': () => this.extensions.make(),
    'build/profile': false,
    'build/recordsPath': () =>
      this.path('storage', 'records.json'),
    'build/resolve/alias': {},
    'build/resolve/extensions': this.store.get(
      'build.resolve.extensions',
    ),
    'build/resolve/modules': () => [
      this.hooks.filter('location/src'),
      this.hooks.filter('location/modules'),
      ...this.discovery
        .getValues()
        .map(({modulePath}) => modulePath),
    ],
    'build/stats': false,
    'build/target': 'web',
    'build/watch': false,
    'build/watchOptions': () => ({
      ignored: [this.store.get('patterns.modules').toString()],
      poll: 1000,
    }),
  })
}
