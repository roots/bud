/**
 * Dump generated webpack config for debugging
 *
 * @example bud.dump(true) // dumps the generated webpack config and stops the build from running.
 * @param   {boolean} enabled - true to dump config
 * @return    {typeof import('./../index')} bud
 */
const dump = function (enabled = true) {
  this.features.dump = enabled

  return this
}

export {dump}
