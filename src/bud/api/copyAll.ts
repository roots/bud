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
const copyAll = function (from: string, to: any): bud {
  this.options.copy.patterns.push({
    from: '**/*',
    context: from,
    to: to ? to : join(this.options.dist, from),
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
  })

  return this
}

export {copyAll}

import {bud} from '..'
export type CopyAll = (from: string, to: string) => bud
