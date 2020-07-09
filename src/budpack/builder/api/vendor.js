/**
 * Enable or disable vendor bundles.
 *
 * @example bud.vendor('vendor') // default is 'vendor'.
 * @typedef {function (name?: string, {enabled?: boolean}) => {bud: typeof import('./../index')} vendor
 * @param   {string} name - name of vendor output file
 * @return  {bud: typeof import('./../index')} bud
 */
const vendor = function (
  name = 'vendor',
  vendors = [],
) {
  this.features.vendor = true
  this.options.vendor.name = name
  this.options.vendor.vendors = [
    ...this.options.vendor.vendors,
    ...vendors,
  ]

  return this
}

export {vendor}
