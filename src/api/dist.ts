import {join} from 'path'
import type {Dist} from './types'

const dist: Dist = function (path?: string): string {
  this.logger.info({name: 'bud.api', function: 'bud.dist', path}, `bud.dist called`)

  return path ? join(this.paths.get('dist'), path) : this.paths.get('dist')
}

export {dist}
