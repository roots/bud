import {join} from 'path'

/**
 * Set project public dir.
 *
 * @typedef {func.<makePublicPath>}
 * @param   {object.<bud>}
 * @return  {void}
 */
const makePublicPath = bud => {
  /**
   * Set the project public path.
   *
   * @typedef {func.<publicPath>}
   * @param   {string} dir - public path of project
   * @return  {object.<bud>}
   */
  const publicPath = dir => {
    bud.paths.public = dir

    return bud
  }

  return publicPath
}

export {makePublicPath}
