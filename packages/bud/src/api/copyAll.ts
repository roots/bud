import {join} from 'path'
import {Api} from '@roots/bud-types'

const copyAll: Api.Copy = function (from, to?) {
  this.options.set('webpack.plugins.copy.patterns', [
    ...this.options.get('webpack.plugins.copy.patterns'),
    this.hooks.filter('bud.copyAll.filter', {
      from: '**/*',
      context: from,
      to: to ? to : join(this.paths.get('dist'), from),
      globOptions: {
        ignore: '.*',
      },
      noErrorOnMissing: true,
    }),
  ])

  return this
}

export {copyAll}
