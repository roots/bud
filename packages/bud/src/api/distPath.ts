import {join} from 'path'
import {Api} from '@roots/bud-typings'

const distPath: Api.DistPath = function (dir: string) {
  this.paths.set(
    'dist',
    this.hooks.filter(
      'api.distPath',
      join(
        this.paths.get('project'),
        dir.replace(/\/$/g, '').replace(/\/^/g, ''),
      ),
    ),
  )

  return this
}

export {distPath}
