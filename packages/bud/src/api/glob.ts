import {Api} from '@roots/bud-typings'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const globby = require('globby')

const glob: Api.Glob = function (name, files) {
  this.options.merge(
    'webpack.entry',
    globby
      .sync(files, {
        expandDirectories: true,
      })
      .map(file => ({
        ...this.options.get('webpack.entry'),
        [`${name}/`]: file,
      })),
  )

  return this
}

export {glob}
