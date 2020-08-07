import {join} from 'path'
import type {Bud, Copy} from './types'

const copyAll: Copy = function (this: Bud, from: string, to: any): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.copyAll', from, to},
    `bud.copyAll called`,
  )

  this.options.set('copy', {
    patterns: [
      ...this.options.get('copy').patterns,
      this.hooks.filter('bud.copyAll.filter', {
        from: '**/*',
        context: from,
        to: to ? to : join(this.paths.get('dist'), from),
        globOptions: {
          ignore: '.*',
        },
        noErrorOnMissing: true,
      }),
    ],
  })

  return this
}

export {copyAll}
