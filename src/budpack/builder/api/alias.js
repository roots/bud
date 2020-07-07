/**
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 * @example
 *  bud.alias({'scripts': bud.src('scripts')})
 *  ↪️ import 'scripts/myScript'
 * @typedef {function ({[key: string]: {directory: string}[]}) => {bud: import('./../index')}} alias
 * @param   {{[key: string]: {directory: string}}} options
 * @return  {import('./../index')}
 */
const alias = function (options) {
  this.options.alias = options

  return this
}

export {alias}
