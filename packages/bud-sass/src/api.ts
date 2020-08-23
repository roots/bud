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
const config = function (this: any, enabled: boolean, options?: any) {
  if (options) {
    this.options.set('sass', {
      ...(this.options.get('sass') ?? []),
      ...options,
    })
  }

  return this
}

export {config}
