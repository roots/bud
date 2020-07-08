import {join} from 'path'

/**
 * Set the project's dist directory.
 * @example bud.distPath('dist') // default unless specified
 * @typedef {function (dir: {string}) => {bud: typeof import('./../index')}} distPath
 * @param   {string} dir - path of dist directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
const distPath = dir => {
  this.paths.dist = join(this.paths.project, dir)

  return this
}

export {distPath}
