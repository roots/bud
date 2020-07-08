/**
 * Set the project public path.
 *
 * @typedef {function (dir: string) => {bud: typeof import('./../index')}} publicPath
 * @param   {string} dir - public path of project
 * @return  {typeof import('./../index')} bud
 */
const publicPath = dir => {
  this.paths.public = dir

  return this
}

export {publicPath}
