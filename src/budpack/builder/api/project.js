import {join} from 'path'

/**
 * @typedef {func.<makeProject>} makeProject
 * @param   {object.<bud>} bud - Builder instance
 * @return  {void}
 */
const makeProject = bud => {
  /**
   * Construct an absolute path from a project relative path.
   *
   * @typedef {func.<project>}
   * @param   {string} relativePath - relative path
   * @return  {string} absolute path
   */
  const project = relativePath => join(bud.paths.project, relativePath)

  return project
}

export {makeProject}
