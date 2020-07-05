import {join} from 'path'

/**
 * Set directory containing compiled assets.
 *
 * @typedef {func.<makeProjectPath>} makeProjectPath
 * @param   {Object.<Bud>} bud - Builder instance
 * @return  {func.<projectPath>}
 */
const makeProjectPath = bud => {
  /**
   * Set the project base path.
   *
   * @typedef {func.<projectPath>}
   * @param   {string} dir - absolute path of project
   * @return  {Object.<Bud>}
   */
  const projectPath = dir => {
    bud.paths.project = dir

    return bud
  }

  return projectPath
}

export {makeProjectPath}
