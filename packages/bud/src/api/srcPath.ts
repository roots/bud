import {join} from 'path'
import type {Bud, PathSetter} from './types'

const srcPath: PathSetter = function (dir: string): Bud {
  const setPath = join(
    this.paths.get('project'),
    dir.replace(/\/$/g, '').replace(/\/^/g, ''),
  )

  /**
   * If set, CLI arguments take precendence over config.
   */
  !this.args.get('src') && this.paths.set('src', setPath)

  return this
}

export {srcPath}
