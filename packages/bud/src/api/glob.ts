import type {Bud, Glob} from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const globby = require('globby')

const glob: Glob = function (
  this: Bud,
  name: string,
  files: string,
): Bud {
  let entry

  const included = globby.sync(files, {
    expandDirectories: true,
  })

  included.forEach(file => {
    this.addExtensions([file.split('.').pop()])

    entry = {
      ...this.options.get('webpack.entry'),
      [`${name}/`]: file,
    }
  })

  this.options.set('webpack.entry', entry)

  return this
}

export {glob}
