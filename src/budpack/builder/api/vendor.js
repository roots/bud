/**
 * Enable or disable vendor bundles.
 *
 * @example bud.hash(true) // enable
 * @typedef {function (enabled: {boolean}) => {bud: typeof import('./../index')} vendor
 * @param   {boolean} enabled - true to enable vendor bundle.
 * @return  {bud: typeof import('./../index')} bud
 */
const vendor = enabled => {
  this.features.vendor = enabled

  return this
}

export {vendor}
