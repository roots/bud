import type {Framework} from '@roots/bud-framework'
import {globby} from '@roots/bud-support'

import type {method} from './assets.interface'

export const assets: method = async function assets(
  paths: string[],
): Promise<Framework> {
  this as Framework
  paths = await globby(paths)

  paths.map((from: string) => {
    const dirName = from.split('/')[from.split('/').length - 2]

    const format = this.store.is('features.hash', true)
      ? this.store.get('hashFormat')
      : this.store.get('fileFormat')

    const plugin = this.extensions.get('copy-webpack-plugin')

    plugin.options.merge('patterns', [
      {
        from,
        to: `${dirName}/${format}[ext]`,
        noErrorOnMissing: true,
      },
    ])
  })

  return this
}
