import type {Framework} from '@roots/bud-framework'
import {globby} from '@roots/bud-support'
import {dirname} from 'path'

import type {method} from './assets.interface'

export const assets: method = async function assets(
  paths: string[],
): Promise<Framework> {
  this as Framework
  paths = await globby(paths)

  paths.map((src: string) => {
    const dirName = dirname(src).replace(
      this.path('src'),
      this.path('dist'),
    )

    const fileName =
      this.store.is('features.hash', true) && this.isProduction
        ? `${dirName}/${this.store.get('hashFormat')}[ext]`
        : `${dirName}/${this.store.get('fileFormat')}[ext]`

    this.extensions.get('copy-webpack-plugin').mergeOption('patterns', [
      {
        from: src,
        to: fileName,
        noErrorOnMissing: true,
      },
    ])
  })

  return this
}
