import {Api} from '@roots/bud-types'
import {join} from 'path'

const copy: Api.Copy = function (from, to = '') {
  this.options.set('webpack.plugins.copy.patterns', [
    ...this.options.get('webpack.plugins.copy.patterns'),
    {
      from,
      to,
    },
  ])

  return this
}

export {copy}
