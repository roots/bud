import type {Bud, Glob} from './types'
import globby from 'globby'
import {parse} from 'path'

const glob: Glob = function (
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
