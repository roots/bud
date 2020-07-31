import type {Bud, Glob} from './types'
import globby from 'globby'
import {parse} from 'path'

const glob: Glob = function (this: Bud, files: string): Bud {
  let entry = this.options.get('entry')

  const included = globby.sync(this.src(files), {
    expandDirectories: true,
  })

  this.util.usedExt(included, this)

  included.forEach(match => {
    const dest = match
      .replace(this.src('/'), '')
      .replace(parse(match).ext, '')

    entry = {
      ...entry,
      [dest]: match,
    }
  })

  this.options.set('entry', entry)

  return this
}

export {glob}
