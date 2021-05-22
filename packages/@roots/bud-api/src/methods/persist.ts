import {Api} from '@roots/bud-framework'
import {isEqual} from 'lodash'

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
    type Persist = () => Framework
  }
}

const persist: Api.Persist = function (enabled = true) {
  isEqual(enabled, true) &&
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
      .hooks.on(
        'build/cache/cacheDirectory',
        this.cache.directory,
      )
      .hooks.on('build/cache/buildDependencies', () => ({
        bud: this.cache.buildDependencies(),
      }))
      .hooks.on('build/cache/managedPaths', () => {
        return [this.path('modules')]
      })

  return this
}

export {persist}
