/**
 * ## bud.vendor
 *
 * Enable vendor bundling.
 *
 * ```js
 * bud.vendor('vendor')
 * ```
 *
 * @typedef {function (name?: string) => {bud: typeof import('./../index')} vendor
 * @param   {string} name - name of vendor output file
 * @return  {bud: typeof import('./../index')} bud
 */
const vendor = function (name = 'vendor') {
  this.features.vendor = true
  this.options.vendor.name = name

  return this
}

export {vendor}
