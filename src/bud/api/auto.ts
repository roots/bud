/**
 * ## bud.auto
 *
 * Automatically load modules instead of needing to import them.
 *
 * ```js
 * bud.auto({jquery: ['$', 'window.jQuery']})
 * ```
 */
const auto: Auto = function (options: {
  [key: string]: [string]
}): bud {
  Object.entries(options).forEach(([key, modules]) => {
    modules.forEach(handle => {
      this.options.auto = {
        ...this.options.auto,
        [handle]: key,
      }
    })
  })

  return this
}

export {auto}

import type {bud} from '..'

export type Auto = (options: {
  [key: string]: [string]
}) => bud
