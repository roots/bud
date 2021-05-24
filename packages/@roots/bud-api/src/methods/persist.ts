import {Api} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## persist  [💁 Fluent]
     *
     * Cache webpack builds to the filesystem.
     *
     * ### Usage
     *
     * ```js
     * app.persist({
     *   type: 'memory',
     * })
     * ```
     */
    persist: Api.Persist
  }

  namespace Api {
    type Persist = (enabled?: boolean) => Framework
  }
}

const persist: Api.Persist = function (enabled = true) {
  this.hooks
    .on('build/cache', () => ({
      type: this.hooks.filter('build/cache/type'),
      version: this.hooks.filter('build/cache/version'),
      cacheDirectory: this.hooks.filter(
        'build/cache/cacheDirectory',
      ),
      managedPaths: this.hooks.filter(
        'build/cache/managedPaths',
      ),
      buildDependencies: this.hooks.filter(
        'build/cache/buildDependencies',
      ),
    }))

    .hooks.on(
      'build/cache/version',
      enabled ? this.cache.version : undefined,
    )
    .hooks.on('build/cache/type', () =>
      enabled ? 'filesystem' : 'memory',
    )
    .hooks.on(
      'build/cache/cacheDirectory',
      enabled ? this.cache.directory : undefined,
    )
    .hooks.on('build/cache/buildDependencies', () =>
      enabled
        ? {
            bud: this.cache.buildDependencies(),
          }
        : undefined,
    )
    .hooks.on('build/cache/managedPaths', () =>
      enabled ? [this.path('modules')] : undefined,
    )

  return this
}

export {persist}
