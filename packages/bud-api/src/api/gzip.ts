import {Bud} from '@roots/bud-typings'

export const gzip: Gzip = function(options?) {
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

export type Gzip = (
  this: Bud.Contract,
  options?: any,
) => Bud.Contract
