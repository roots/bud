/* eslint-disable no-console */
/* global window __webpack_hash__ */

import type {StatsCompilation} from 'webpack'

import * as options from '../options.js'
import * as cache from './cache.js'

/**
 * Run HMR check
 * @public
 */
export const check = () => {
  module.hot
    .check(false, update)
    ?.then((modules: StatsCompilation['modules']) => update(null, modules))
    ?.catch(update)
}

/**
 * HMR apply callback
 * @public
 */
export const apply = (
  _error?: Error,
  modules?: StatsCompilation['modules'],
) => {
  if (!modules) return

  if (cache.isStale()) check()

  if (cache.failed) {
    options.get('log') && console.warn('[bud] update failed')
    options.get('reload') && window.location.reload()
    return
  }

  options.get('log') && console.log('[bud] update applied')
}

/**
 * HMR update callback
 * @public
 */
export const update = (
  _error: Error,
  modules?: StatsCompilation['modules'],
) => {
  if (!modules) return

  module.hot
    .apply(
      {
        ignoreUnaccepted: true,
        ignoreDeclined: true,
        ignoreErrored: true,
        onUnaccepted: () => {
          options.get('log') &&
            console.warn(
              '[bud] unaccepted module(s). full page reload needed',
            )

          cache.setFailed()
        },
        onDeclined: () => {
          options.get('log') &&
            console.warn(
              '[bud] declined module(s). full page reload needed',
            )

          cache.setFailed()
        },
        onErrored: () => {
          options.get('log') &&
            console.warn('[bud] hmr error. full page reload needed')

          cache.setFailed()
        },
      },
      apply,
    )
    ?.then((modules: StatsCompilation['modules']) => apply(null, modules))
    ?.catch(apply)
}
