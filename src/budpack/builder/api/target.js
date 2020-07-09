/**
 * Set the build target.
 * @example bud.target('web') // default
 * @typedef {function (name: string) => {bud: typeof import('./../index')}} target
 * @param   {string} dir - path of src directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
const target = function (target) {
  this.options.target = target

  return this
}

export {target}
