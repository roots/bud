import type {Framework} from '@roots/bud-framework'

/**
 * Persist function interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param enabled - Should cache be persisted on disk
 *
 * @defaultValue enabled = true
 *
 * @hook build/cache
 * @hook build/cache/cacheDirectory
 * @hook build/cache/managedPaths
 * @hook build/cache/buildDependencies
 * @hook build/cache/version
 * @hook build/cache/type
 *
 * @public @config
 */
interface persist {
  (this: Framework, enabled?: boolean): Framework
}

/**
 * Cache webpack builds to the filesystem.
 *
 * @example
 * ```js
 * app.persist({
 *   type: 'memory',
 * })
 * ```
 *
 * @public @config
 */
const persist: persist = function (enabled = true) {
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

export {persist as default}
