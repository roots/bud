import {join} from 'path'

/**
 * makeDist
 * @param   {object.<bud>}
 * @return  {void}
 */
const makeDist = bud => {
  /**
   * Construct an absolute path from a dist relative path.
   * @param   {string} relativePath - relative path
   * @return  {string} absolute path
   */
  const dist = relativePath => join(bud.paths.dist, relativePath)

  return dist
}

export {makeDist}
