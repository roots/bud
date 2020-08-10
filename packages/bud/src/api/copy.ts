import {Bud, Copy} from './types'
import {join} from 'path'

const copy: Copy = function (this: Bud, from: string, to?: string): Bud {
  this.options.set('copy', {
    patterns: [
      ...this.options.get('copy').patterns,
      this.hooks.filter('bud.copy.filter', {
        from,
        to: to ?? join(this.paths.get('dist'), from),
      }),
    ],
  })

  return this
}

export {copy}
