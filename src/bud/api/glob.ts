import type {Bud, Bundle} from './types'
import globby from 'globby'
import {parse} from 'path'

/**
 * ## bud.glob
 *
 * Compile assets into a particular directory.
 *
 * ```js
 * bud.bundlePath(
 *  bud.dist('scripts'),
 *  [bud.src('scripts')],
 * )
 * ```
 */
const glob = function (
  this: Bud,
  output: string,
  files: string,
): Bud {
  let entry = this.state.options.entry

  globby
    .sync(files, {
      expandDirectories: true,
    })
    .forEach(match => {
      const dest = match
        .replace(this.src(), '')
        .replace(parse(match).ext, '')

      entry = {
        ...entry,
        [dest]: match,
      }
    })

  this.state.options.entry = entry

  return this
}

export {glob}
