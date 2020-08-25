import {Bud} from '@roots/bud'

/**
 * ## bud.scss
 *
 * Enable/disable scss support
 *
 * ```js
 * bud.scss(true)
 * ```
 *
 * ```js
 * bud.scss(false)
 * ```
 */
type SassConfig = (this: Bud, options?: any) => Bud

const config: SassConfig = function (options) {
  if (options) {
    this.options.set('sass', {
      ...(this.options.get('sass') ?? []),
      ...options,
    })
  }

  return this
}

export {config}
