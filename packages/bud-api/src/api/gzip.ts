import {Bud} from '@roots/bud-typings'

export const gzip = function (
  this: Bud.Contract,
  options?: any,
): Bud.Contract {
  this.features.set('gzip', true)

  options &&
    (() => {
      const opts = this.extensions
        .get('compression-webpack-plugin-gzip')
        .getStore()

      this.extensions
        .get('compression-webpack-plugin-gzip')
        .setOptions({
          ...opts,
          ...options,
        })
    })()
  return this
}
