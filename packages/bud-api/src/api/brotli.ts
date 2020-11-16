import {Bud} from '@roots/bud-typings'

export const brotli: Brotli = function(options) {
  this.features.set('brotli', true)

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin[brotli]')
    .setStore(options)

  return this
}

export type Brotli = (
  this: Bud.Contract,
  options: any,
) => Bud.Contract
