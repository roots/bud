/* eslint-disable no-console */
/* global window __webpack_hash__ */

/**
 * Based heavily on https://github.com/webpack/webpack/blob/c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers `@sokra` (MIT license)
 */

import * as options from '../options.js'
import * as cache from './cache.js'

/**
 * Run HMR check
 * @public
 */
export const check = () => {
  module.hot
    .check(false, update)
    ?.then(modules => update(null, modules))
    ?.catch(update)
}

/**
 * HMR apply callback
 * @public
 */
export const apply = (error?: Error, modules?: Array<unknown>) => {
  if (error) {
    options.get('log') && console.error(error)
    options.get('reload') && window.location.reload()
    return
  }
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
export const update = (error: Error, modules?: Array<unknown>) => {
  if (error) {
    options.get('log') && console.error(error)
    options.get('reload') && window.location.reload()
  }
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
    ?.then(modules => apply(null, modules))
    ?.catch(apply)
}
