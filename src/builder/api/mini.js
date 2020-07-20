/**
 * Enable or disable minification
 *
 * @param  {boolean} enable - true to enable CSS/JS minification.
 * @return {typeof import('./../index')} bud
 */
const mini = enable => {
  this.features.minified = enable

  return this
}

export {mini}
