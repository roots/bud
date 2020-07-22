import {join} from 'path'

/**
 * ## bud.copyAll
 *
 * Copy all files from a specified source to a specified destination.
 *
 * ```js
 * bud.copyAll(bud.src('images'), bud.dist('images'))
 * ```
 */
const copyAll: CopyAll = function (from: string, to: any): Bud {
  this.state.options.copy.patterns.push({
    from: '**/*',
    context: from,
    to: to ? to : join(this.state.options.dist, from),
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
  })

  return this
}

export {copyAll}

import type {Bud} from '..'
import type {CopyAll} from '.'
