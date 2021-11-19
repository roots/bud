import type {Framework} from '@roots/bud-framework'

import {globby} from './assets.dependencies'

/**
 * @public @config
 */
export interface assets {
  (this: Framework, from: string[]): Promise<Framework>
}

export interface facade {
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
export const assets = async function assets(
  this: Framework,
  paths: string[],
): Promise<Framework> {
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
export const copy = assets
