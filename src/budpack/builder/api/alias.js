/**
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 * @example
 *  bud.alias({'scripts': bud.src('scripts')})
 *  ↪️ import 'scripts/myScript'
 * @memberof {typeof import('./../index')} Bud
 * @typedef {function ({[key: string]: directory: string[]}) => {bud: typeof import('./../index')}} alias
 * @param   {{[key: string]: {directory: string}}} options
 * @return  {typeof import('./../index')} Bud
 */
const alias = function (options) {
  this.options.alias = options

  return this
}

export {alias}
