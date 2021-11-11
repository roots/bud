import type {Framework} from '@roots/bud-framework'

export interface persist {
  (type?: 'memory' | 'filesystem' | false): Framework
}

/**
 * Cache webpack builds to the filesystem.
 *
 * @example
 * ```js
 * app.persist('memory')
 * ```
 *
 * @example
 * ```js
 * app.persist('filesystem')
 * ```
 *
 * @example
 * ```js
 * app.persist(false)
 * ```
 *
 * @public @config
 */
export const persist: persist = function (
  type?: 'memory' | 'filesystem' | false,
) {
  this as Framework

  if (type === false) {
    this.api.log('success', {
      prefix: 'cache',
      message: 'disabled',
    })
    this.hooks.on('build.cache', false)
    return this
  }

  if (type === 'memory') {
    this.api.log('success', {
      prefix: 'cache',
      message: 'memory cache enabled',
    })
    this.hooks.on('build.cache', {
      type: 'memory',
    })

    return this
  }

  this.api.log('success', {
    prefix: 'cache',
    message: 'filesystem cache enabled',
  })

  this.hooks
    .on('build.cache', () => ({
      type: this.hooks.filter('build.cache.type'),
      version: this.hooks.filter('build.cache.version'),
      cacheDirectory: this.hooks.filter(
        'build.cache.cacheDirectory',
      ),
      managedPaths: this.hooks.filter(
        'build.cache.managedPaths',
      ),
      buildDependencies: this.hooks.filter(
        'build.cache.buildDependencies',
      ),
    }))
    .hooks.on('build.cache.version', this.cache.version)
    .hooks.on('build.cache.type', 'filesystem')
    .hooks.on('build.cache.cacheDirectory', this.path('storage'))
    .hooks.on('build.cache.buildDependencies', () => ({
      bud: this.project.get('dependencies'),
    }))
    .hooks.on('build.cache.managedPaths', () => [
      this.path('modules'),
    ])

  return this
}
