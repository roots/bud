import {join} from 'path'

/**
 * ## bud.srcPath
 *
 * Set the project's src directory.
 *
 *  ```js
 * bud.srcPath('src') // default unless specified
 * ```
 */
const srcPath = function (src: string): bud {
  this.paths.src = join(this.paths.project, src)

  return this
}

export {srcPath}
import type {bud} from '..'
