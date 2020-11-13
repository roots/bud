import {Bud} from '@roots/bud-typings'

export const brotli: brotli = function (options) {
  this.features.set('brotli', true)

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin[brotli]')
    .all(options)

  return this
}

export type brotli = (
  this: Bud.Contract,
  options: any,
) => Bud.Contract
