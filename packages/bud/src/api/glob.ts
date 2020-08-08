import type {Bud, Glob} from './types'
import {parse} from 'path'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const globby = require('globby')

const glob: Glob = function (this: Bud, files: string): Bud {
  this.logger.info({name: 'bud.api', files}, `bud.glob called`)

  let entry = this.options.get('entry')

  /**
   * Glob matching files.
   */
  const included = globby.sync(this.src(files), {
    expandDirectories: true,
  })

  /**
   * Enable support for matching extensions
   */
  this.util.usedExt(included, this)

  /**
   * Add matching files as indviduated entrypoints.
   */
  included.forEach(match => {
    const dest = match.replace(this.src('/'), '').replace(parse(match).ext, '')

    entry = {
      ...entry,
      [dest]: match,
    }
  })

  this.options.set('entry', entry)

  return this
}

export {glob}
