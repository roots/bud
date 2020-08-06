import {join} from 'path'
import type {Bud, PathSetter} from './types'

const distPath: PathSetter = function (dir: string): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.distPath', dir},
    `bud.distPath called`,
  )

  const value = this.hooks.filter(
    'api.distPath.filter',
    join(this.paths.get('project'), dir),
  )

  this.paths.set('dist', value)

  return this
}

export {distPath}
