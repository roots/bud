import {Bud, Copy} from './types'
import {join} from 'path'

const copy: Copy = function (
  this: Bud,
  from: string,
  to: string,
): Bud {
  this.options.set('copy', {
    patterns: [
      ...this.options.get('copy').patterns,
      {
        from,
        to: to ? to : join(this.state.paths.dist, from),
      },
    ],
  })

  return this
}

export {copy}
