import type {Framework} from '@roots/bud-framework'

export interface persist {
  (this: Framework, enabled?: boolean): Framework
}

export interface persist {
  (this: Framework, enabled?: string): Framework
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
export const persist: persist = function (
  enabled: string | boolean,
) {
  if (enabled === false) {
    this.hooks.on('build/cache', false)
    return this
  }

  if (enabled === 'memory') {
    this.hooks.on('build/cache', {
      type: 'memory',
    })

    return this
  }

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
    .hooks.on('build/cache/version', this.cache.version)
    .hooks.on('build/cache/type', () => 'filesystem')
    .hooks.on('build/cache/cacheDirectory', this.path('storage'))
    .hooks.on('build/cache/buildDependencies', () => ({
      bud: this.project.get('dependencies'),
    }))
    .hooks.on('build/cache/managedPaths', () => [
      this.path('modules'),
    ])

  return this
}
