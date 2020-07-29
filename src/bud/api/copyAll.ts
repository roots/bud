import {join} from 'path'
import type {Bud, Copy} from './types'

const copyAll: Copy = function (
  this: Bud,
  from: string,
  to: any,
): Bud {
  this.options.set('copy', {
    patterns: [
      ...this.options.get('copy').patterns,
      {
        from: '**/*',
        context: from,
        to: to ? to : join(this.state.paths.dist, from),
        globOptions: {
          ignore: '.*',
        },
        noErrorOnMissing: true,
      },
    ],
  })

  return this
}

export {copyAll}
