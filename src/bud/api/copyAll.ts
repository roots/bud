import {join} from 'path'
import type {Bud, Copy} from './types'

/**
 * ## bud.copyAll
 *
 * Copy all files from a specified source to a specified destination.
 *
 * ```js
 * bud.copyAll(bud.src('images'), bud.dist('images'))
 * ```
 */
const copyAll: Copy = function (
  this: Bud,
  from: string,
  to: any,
): Bud {
  this.state.options.copy.patterns.push({
    from: '**/*',
    context: from,
    to: to ? to : join(this.state.paths.dist, from),
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
  })

  return this
}

export {copyAll}
