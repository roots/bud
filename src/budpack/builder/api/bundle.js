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
 *
 * @param   {string} name - output name.
 * @param   {array}  entries - array of src assets to include in the bundle.
 * @return  {typeof import('./../index')} bud
 */
const bundle = function (name, entries) {
  this.options.entry = {
    ...this.options.entry,
    [`${name}`]: entries,
  }

  return this
}

export {bundle}
