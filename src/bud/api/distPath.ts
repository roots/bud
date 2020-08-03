import {join} from 'path'
import type {Bud, PathSetter} from './types'

const distPath: PathSetter = function (dir: string): Bud {
  const value = join(this.paths.get('project'), dir)

  this.logger.info(
    {name: 'api', function: 'bud.distPath', value},
    'bud.distPath called',
  )
  this.paths.set('dist', value)

  return this
}

export {distPath}
