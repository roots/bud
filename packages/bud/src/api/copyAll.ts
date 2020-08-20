import {join} from 'path'
import type {Copy} from './copy'

const copyAll: Copy = function (from, to?) {
  this.options.set('copy.patterns', [
    ...this.options.get('copy.patterns'),
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
