/* eslint-disable no-console */
/* global window __webpack_hash__ */

/**
 * Based heavily on https://github.com/webpack/webpack/blob/c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers `@sokra` (MIT license)
 */

import * as cache from './cache'
import {options} from './options'

export default (hash: Payload['hash'], _moduleMap: unknown) =>
  cache.isStale(hash) && module.hot.status() === 'idle' && check()

const callback = (error: Error, modules?: Array<unknown>) => {
  if (error) {
    options?.log && console.error(error)
    options?.reload && window.location.reload()
  }
  if (!modules) return

  const apply = (error?: Error, modules?: Array<unknown>) => {
    if (error) {
      options?.log && console.error(error)
      options?.reload && window.location.reload()
      return
    }
    if (!modules) return

    if (cache.isStale()) check()

    if (cache.failed) {
      options?.log && console.warn('[bud] update failed')
      options?.reload && window.location.reload()
      return
    }
  }

  module.hot
    .apply(
      {
        ignoreUnaccepted: true,
        ignoreDeclined: true,
        ignoreErrored: true,
        onUnaccepted: () => {
          options?.log &&
            console.warn(
              '[bud] unaccepted module(s). full page reload needed',
            )
          cache.flagAsFailed()
        },
        onDeclined: () => {
          options?.log &&
            console.warn(
              '[bud] declined module(s). full page reload needed',
            )
          cache.flagAsFailed()
        },
        onErrored: () => {
          options?.log &&
            console.warn('[bud] hmr error. full page reload needed')
          cache.flagAsFailed()
        },
      },
      apply,
    )
    ?.then(modules => apply(null, modules))
    ?.catch(apply)
}

const check = () => {
  module.hot
    .check(false, callback)
    ?.then(modules => callback(null, modules))
    ?.catch(callback)
}
