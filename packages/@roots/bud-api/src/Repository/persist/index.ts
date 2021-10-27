import type {Framework} from '@roots/bud-framework'

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
      enabled ? this.project.get('version') : undefined,
    )
    .hooks.on('build/cache/type', () =>
      enabled ? 'filesystem' : 'memory',
    )
    .hooks.on(
      'build/cache/cacheDirectory',
      enabled ? this.project.get('directory') : undefined,
    )
    .hooks.on('build/cache/buildDependencies', () =>
      enabled
        ? {
            bud: this.project.get('dependencies'),
          }
        : undefined,
    )
    .hooks.on('build/cache/managedPaths', () =>
      enabled ? [this.path('modules')] : undefined,
    )

  return this
}

export {persist as default}
