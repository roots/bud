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
 * @param   {[key: string]: {directory: string}} options
 * @return  {typeof import('./../index')} bud
 **/
const alias = function (options) {
  this.options.alias = options

  return this
}

export {alias}
