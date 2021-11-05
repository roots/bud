import type {Framework} from '@roots/bud-framework'

export interface persist {
  (enabled?: boolean): Framework
}

export interface persist {
  (enabled?: string): Framework
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
  const ctx = this as Framework

  if (enabled === false) {
    ctx.hooks.on('build.cache', false)
    return this
  }

  if (enabled === 'memory') {
    ctx.hooks.on('build.cache', {
      type: 'memory',
    })

    return this
  }

  ctx.hooks
    .on('build.cache', () => ({
      type: ctx.hooks.filter('build.cache.type'),
      version: ctx.hooks.filter('build.cache.version'),
      cacheDirectory: ctx.hooks.filter(
        'build.cache.cacheDirectory',
      ),
      managedPaths: ctx.hooks.filter('build.cache.managedPaths'),
      buildDependencies: ctx.hooks.filter(
        'build.cache.buildDependencies',
      ),
    }))
    .hooks.on('build.cache.version', ctx.cache.version)
    .hooks.on('build.cache.type', () => 'filesystem')
    .hooks.on('build.cache.cacheDirectory', ctx.path('storage'))
    .hooks.on('build.cache.buildDependencies', () => ({
      bud: ctx.project.get('dependencies'),
    }))
    .hooks.on('build.cache.managedPaths', () => [
      ctx.path('modules'),
    ])

  return this
}
