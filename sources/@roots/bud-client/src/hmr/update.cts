/* eslint-disable no-console */
/* global window __webpack_hash__ */

/**
 * Based heavily on https://github.com/webpack/webpack/blob/c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers `@sokra` (MIT license)
 */

// @ts-ignore
if (!module.hot) {
  throw new Error('[bud] hmr is unavailable')
}

let lastHash: string

function upToDate(hash?: string) {
  if (hash) lastHash = hash
  // @ts-ignore
  return lastHash == __webpack_hash__
}

module.exports = function (hash, moduleMap, options) {
  // @ts-ignore
  if (!upToDate(hash) && module.hot.status() == 'idle') {
    check()
  }

  function check() {
    var callback = function (err, updatedModules) {
      if (!updatedModules) return null

      const applyCallback = function (applyErr, renewedModules) {
        if (applyErr) return

        if (!upToDate()) check()
      }

      const applyOptions = {
        ignoreUnaccepted: true,
        ignoreDeclined: true,
        ignoreErrored: true,
        onUnaccepted: function (data) {
          // reload window
          console.info(data)
          window.location.reload()
        },
        onDeclined: function (data) {
          console.info(data)
        },
        onErrored: function (data) {
          console.error(data.error)
        },
      }

      // @ts-ignore
      const applyResult = module.hot.apply(applyOptions, applyCallback)
      if (applyResult && applyResult.then) {
        applyResult.then(outdatedModules => {
          applyCallback(null, outdatedModules)
        })

        applyResult.catch(applyCallback)
      }
    }

    // @ts-ignore
    const result = module.hot.check(false, callback)
    if (result && result.then) {
      result.then(function (updatedModules) {
        callback(null, updatedModules)
      })
      result.catch(callback)
    }
  }
}
