import {join} from 'path'

/**
 * makeSrc
 * @param   {object.<bud>}
 * @return  {void}
 */
const makeSrc = bud => {
  /**
   * Construct an absolute path from a src relative path.
   * @param   {string} relativePath - relative path
   * @return  {string} absolute path
   */
  const src = relativePath => join(bud.paths.src, relativePath)

  return src
}

export {makeSrc}
