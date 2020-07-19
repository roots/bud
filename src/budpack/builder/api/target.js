/**
 * Set the build target.
 * @example bud.target('web') // default
 * @param   {string} dir - path of src directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
const target = function (target) {
  this.options.target = target

  return this
}

export {target}
