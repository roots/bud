import {join} from 'path'

/**
 * @typedef {func.<makeDistPath>} makeDistPath
 * @param   {Object.<Bud>} bud - Builder instance
 * @return  {void}
 */
const makeDistPath = bud => {
  /**
   * Construct an absolute path from a path segment that is relative to dist.
   *
   * @typedef {func.<distPath>}
   * @param   {string} dir - path of asset relative to dist dir.
   * @return  {Object.<Bud>}
   */
  const distPath = dir => {
    bud.paths.dist = join(bud.paths.project, dir)

    return bud
  }

  return distPath
}

export {makeDistPath}
