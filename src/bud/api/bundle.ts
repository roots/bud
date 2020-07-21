/**
 * ## bud.bundle
 *
 * Compile a group of assets.
 *
 * ```js
 * bud.bundle('app', [
 *   bud.src('app.js'),
 *   bud.src('app.css'),
 * ])
 * ```
 */
const bundle: Bundle = function (
  name: string,
  entries: object,
): bud {
  this.options.entry = {
    ...this.options.entry,
    [`${name}`]: entries,
  }

  return this
}

export {bundle}
import {bud} from '..'
export type Bundle = (name: string, entries: Object) => bud
