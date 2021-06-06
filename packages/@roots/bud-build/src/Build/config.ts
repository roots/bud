import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

export function config(this: Framework): void {
  this.hooks
    .link('build', [
      'bail',
      'cache',
      'context',
      'devtool',
      'entry',
      'experiments',
      'externals',
      'infrastructureLogging',
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
    .hooks.link('build/output', [
      'path',
      'pathinfo',
      'publicPath',
      'filename',
    ])

  this.hooks
    .on('build/bail', true)
    .hooks.on('build/experiments', () => ({
      lazyCompilation: this.hooks.filter(
        'build/experiments/lazyCompilation',
      ),
    }))
    .hooks.on('build/experiments/lazyCompilation', () => false)

    /**
     * cache
     * @see @roots/bud-cache
     */
    .hooks.on('build/cache', () => ({
      name: this.hooks.filter('build/cache/name'),
      version: this.hooks.filter('build/cache/version'),
      type: this.hooks.filter('build/cache/type'),
      cacheDirectory: this.hooks.filter(
        'build/cache/cacheDirectory',
      ),
      cacheLocation: this.hooks.filter(
        'build/cache/cacheLocation',
      ),
      buildDependencies: this.hooks.filter(
        'build/cache/buildDependencies',
      ),
      managedPaths: this.hooks.filter(
        'build/cache/managedPaths',
      ),
    }))

    .hooks.on('build/infrastructureLogging', () => ({}))

    .hooks.on('build/node', false)

    .hooks.on('build/context', () => this.path('project'))

    .hooks.on('build/devtool', false)

    .hooks.on('build/mode', () => this.mode)

    .hooks.on('build/module/rules', () => [
      {
        parser: {requireEnsure: false},
        oneOf: this.hooks.filter('build/module/rules/oneOf'),
      },
    ])
    .hooks.on('build/module/rules/oneOf', () =>
      Object.values(this.build.rules).map(rule =>
        rule.make(this),
      ),
    )

    .hooks.on('build/name', () => this.name)

    .hooks.on(
      'build/optimization/emitOnErrors',
      this.store.get('build.optimization.emitOnErrors'),
    )
    .hooks.on(
      'build/optimization/minimize',
      () => this.isProduction,
    )
    .hooks.on('build/optimization/minimizer', () => ['...'])
    .hooks.on(
      'build/optimization/moduleIds',
      () => 'deterministic',
    )
    .hooks.on('build/optimization/removeEmptyChunks', () => true)
    .hooks.on(
      'build/output/filename',
      () =>
        `${
          this.store.get('hash')
            ? this.store.get('hashFormat')
            : this.store.get('fileFormat')
        }.js`,
    )
    .hooks.on('build/output/path', () => this.path('dist'))
    .hooks.on('build/output/pathinfo', () => false)
    .hooks.on('build/output/publicPath', () =>
      this.store.get('location.publicPath'),
    )
    .hooks.on('build/parallelism', () =>
      this.store.get('build.parallelism'),
    )
    .hooks.on('build/performance', () => ({}))
    .hooks.on('build/plugins', () => this.extensions.make())
    .hooks.on('build/profile', () => true)
    .hooks.on('build/recordsPath', () =>
      this.path('storage', 'records.json'),
    )
    .hooks.on('build/resolve/alias', {})
    .hooks.on(
      'build/resolve/extensions',
      this.store.get('build.resolve.extensions'),
    )
    .hooks.on('build/resolve/modules', () => [
      this.hooks.filter('location/src'),
      this.hooks.filter('location/modules'),
      ...this.discovery.resolveFrom,
    ])
    .hooks.on('build/stats', (): Configuration['stats'] => ({}))
    .hooks.on('build/target', () => 'web')
    .hooks.on('build/watch', false)
}
