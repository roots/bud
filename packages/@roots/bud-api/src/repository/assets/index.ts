/**
 * @module @roots/bud-api
 */

import {CopyPluginOptions} from 'copy-webpack-plugin'
import {sync as globbySync} from 'globby'

import {Repository} from '..'

/**
 * @function assets
 */
const assets: Repository.Assets = function (paths) {
  globbySync(paths).map((from: string) => {
    const dirName = from.split('/')[from.split('/').length - 2]

    const format = this.store.isTrue('hash')
      ? this.store.get('hashFormat')
      : this.store.get('fileFormat')

    const pattern = {
      from,
      to: `${dirName}/${format}[ext]`,
      noErrorOnMissing: true,
    }

    this.extensions
      .get('copy-webpack-plugin')
      .set('options', (options: CopyPluginOptions) => ({
        ...options,
        patterns: [...(options.patterns ?? []), pattern],
      }))
  })

  return this
}

/**
 * @exports assets
 */
export {assets}
