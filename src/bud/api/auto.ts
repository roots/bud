/**
 * ## bud.auto
 *
 * Automatically load modules instead of needing to import them.
 *
 * ```js
 * bud.auto({jquery: ['$', 'window.jQuery']})
 * ```
 */
const auto: Auto = function (
  options: {[key: string]: string[]}
): Bud {
  Object.entries(options).forEach(([key, modules]) => {
    modules.forEach(handle => {
      this.state.options.auto = {
        ...this.state.options.auto,
        [handle]: key,
      }
    })
  })

  return this
}

export {auto}
import {Bud, Auto} from '.'