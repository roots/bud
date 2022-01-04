import type {Framework} from '@roots/bud-framework'
import {globby} from '@roots/bud-support'

import type {method} from './assets.interface'

export const assets: method = async function assets(
  paths: string[],
): Promise<Framework> {
  this as Framework
  paths = await globby(paths)

  paths.map((src: string) => {
    const dirName = src.split('/')[src.split('/').length - 2]

    const fileName =
      this.store.is('features.hash', true) && this.isProduction
        ? `${dirName}/${this.store.get('hashFormat')}`
        : `${dirName}/${this.store.get('fileFormat')}`

    this.extensions
      .get('copy-webpack-plugin')
      .mergeOption('patterns', [
        {
          from: src,
          to: `${fileName}[ext]`,
          noErrorOnMissing: true,
        },
      ])
  })

  return this
}
