/**
 * ## bud.watch
 *
 * Enable or disable watch mode.
 *
 * ```js
 * bud.watch(true)
 * ```
 *
 * @param   {bool} enabled - true if enabled
 * @return  {typeof import('./../index')} bud
 */
const watch = enabled => {
  this.features.watch = enabled

  return this
}

export {watch}
