import {Bud} from '@roots/bud-typings'

export const gzip: Gzip = function (options?) {
  this.features.set('gzip', true)

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-gzip')
    .setOptions(options)

  return this
}

export type Gzip<T = Bud.Contract> = (
  this: T,
  options?: any,
) => T
