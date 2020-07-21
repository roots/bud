/**
 * ## bud.alias
 *
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 *
 * Having defined this alias:
 *
 * ```js
 * bud.alias({'scripts': bud.src('scripts')})
 * ```
 *
 * You can now reference scripts against that alias in your import statements:
 *
 * ```js
 * import 'scripts/myScript' // replacing '../../myScript'
 * ```
 **/
const alias: Alias = function (options: object): bud {
  this.options.alias = options

  return this
}

export {alias}

import type {bud} from '..'
export type Alias = (options: object) => bud
