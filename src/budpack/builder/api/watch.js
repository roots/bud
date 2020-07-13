/**
 * Enable or disable watch mode.
 * @typedef {function (enabled: boolean) => {bud: typeof import('./../index')} vendor
 * @param   {bool} enabled - true if enabled
 * @return  {typeof import('./../index')} bud
 */
const watch = enabled => {
  this.features.watch = enabled

  return this
}

export {watch}
