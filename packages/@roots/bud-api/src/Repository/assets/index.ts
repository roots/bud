import type {Framework} from '@roots/bud-framework'
import type {CopyPluginOptions} from 'copy-webpack-plugin'

import {globby} from './assets.dependencies'

/**
 * @public @config
 */
interface assets {
  (this: Framework, from: string[]): Framework
}

/**
 * Copy static assets during compilation.
 *
 * @remarks
 * You may specify paths with a string literal or glob pattern.
 *
 * @example
 * Copy **src/images** to **dist/images**
 *
 * ```js
 * app.assets(['src/images'])
 * ```
 *
 * @public @config
 */
function assets(this: Framework, paths: string[]): Framework {
  globby.globbySync(paths).map((from: string) => {
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

export {assets as default}
