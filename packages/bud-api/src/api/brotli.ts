import {Bud} from '@roots/bud-typings'
import Plugin from 'compression-webpack-plugin'
import {BrotliOptions} from 'zlib'

export const brotli: Brotli = function (options?) {
  this.features.set('brotli', true)

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-brotli')
    .setStore(options)

  return this
}

export type Brotli<T = Bud.Contract> = (
  this: T,
  options?: Brotli.Options,
) => T

export namespace Brotli {
  export type Options = Plugin.Options<BrotliOptions>
}
