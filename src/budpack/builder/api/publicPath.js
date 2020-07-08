import {join} from 'path'

/**
 * Set the project public path.
 *
 * @typedef {function} publicPath
 * @this    {bud}
 * @param   {string} dir - public path of project
 * @return  {bud}
 */
const publicPath = dir => {
  this.paths.public = dir

  return this
}

export {publicPath}
