/**
 * Set the project base path.
 *
 * @param   {string} dir - absolute path of project
 * @return  {typeof import('./../index')} bud
 */
const projectPath = dir => {
  this.paths.project = dir

  return this
}

export {projectPath}
