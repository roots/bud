/**
 * Enable or disable filename hashing of built assets. Unless specified, filename hashes will be created when running production builds.
 * @example bud.hash(true) // enable
 * @param   {boolean} enabled - true to enable filename hashing.
 * @return  {typeof import('../index')} bud
 */
const hash = function (enabled = true) {
  this.state.features.hash = enabled

  return this
}

export {hash}
