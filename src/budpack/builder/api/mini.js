/**
 * Enable or disable minification
 *
 * @typedef {function (enable: boolean) => {bud: typeof import('./../index')}} mini
 * @param  {boolean} enable - true to enable CSS/JS minification.
 * @return {typeof import('./../index')} bud
 */
const mini = enable => {
  this.features.minified = enable

  return this
}

export {mini}
