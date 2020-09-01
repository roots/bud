import {Api} from '@roots/bud-typings'
import {join} from 'path'

const copy: Api.Copy = function (from, to?) {
  this.options.set('webpack.plugins.copy.patterns', [
    ...this.options.get('webpack.plugins.copy.patterns'),
    {
      from,
      to: to ?? join(this.paths.get('dist'), from),
    },
  ])

  return this
}

export {copy}
