import {join} from 'path'

/**
 * Set directory containing source assets.
 *
 * @typedef {func.<makeSrcPath>}
 * @param   {Object.<Bud>}
 * @return  {void}
 */
const makeSrcPath = bud => {
  /**
   * Construct an absolute path from a path segment that is relative to dist.
   *
   * @typedef {func.<srcPath>}
   * @param   {string} src - path of asset relative to src path.
   * @return  {Object.<Bud>}
   */
  const srcPath = src => {
    bud.paths.src = join(bud.paths.project, src)

    return bud
  }

  return srcPath
}

export {makeSrcPath}
