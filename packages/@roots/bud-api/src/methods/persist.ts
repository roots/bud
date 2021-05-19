import {Api} from '@roots/bud-framework'
import {isEqual} from 'lodash'
import {resolve} from 'path'

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
    (() => {
      /**
       * Cache override
       */
      this.hooks
        .on('build/cache', () => ({
          name: this.hooks.filter('build/cache/name'),
          type: this.hooks.filter('build/cache/type'),
          version: this.hooks.filter('build/cache/version'),
          cacheDirectory: this.hooks.filter(
            'build/cache/cacheDirectory',
          ),
          cacheLocation: this.hooks.filter(
            'build/cache/cacheLocation',
          ),
          managedPaths: this.hooks.filter(
            'build/cache/managedPaths',
          ),
        }))

        /**
         * Individual settings
         */
        .hooks.on('build/cache/name', () => `${this.name}`)
        .hooks.on(
          'build/cache/version',
          () => this.cache.version,
        )
        .hooks.on('build/cache/type', () => 'filesystem')
        .hooks.on('build/cache/cacheDirectory', () =>
          this.path('storage'),
        )
        .hooks.on('build/cache/cacheLocation', () =>
          resolve(this.path('storage'), 'pack'),
        )
        .hooks.on(
          'build/cache/buildDependencies',
          () => this.cache.buildDependencies,
        )
        .hooks.on('build/cache/managedPaths', () => {
          return [this.path('modules')]
        })
    })()

  return this
}

export {persist}
