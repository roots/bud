import type {Bud, Glob} from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const globby = require('globby')

const glob: Glob = function (this: Bud, name: string, files: string): Bud {
  let entry = this.options.get('entry')

  /**
   * Glob matching files.
   */
  const included = globby.sync(files, {
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
    entry = {
      ...entry,
      [`${name}/`]: match,
    }
  })

  this.options.set('entry', entry)

  return this
}

export {glob}
