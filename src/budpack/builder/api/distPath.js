import {join} from 'path'

/**
 * Set the project's dist directory.
 * @example bud.distPath('dist') // default unless specified
 * @param   {string} dir - path of dist directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
const distPath = function (dir) {
  this.paths.dist = join(this.paths.project, dir)

  return this
}

export {distPath}
