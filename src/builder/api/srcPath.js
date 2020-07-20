import {join} from 'path'

/**
 * Set the project's src directory.
 * @example bud.srcPath('src') // default unless specified
 * @param   {string} dir - path of src directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
const srcPath = function (src) {
  this.paths.src = join(this.paths.project, src)

  return this
}

export {srcPath}
