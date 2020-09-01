import {Api} from '@roots/bud-typings'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const globby = require('globby')

const glob: Api.Glob = function (name, files) {
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
