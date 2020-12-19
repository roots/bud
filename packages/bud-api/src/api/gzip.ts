import {Bud} from '@roots/bud-typings'
import {zlib} from '@roots/bud-support'
import Plugin from 'compression-webpack-plugin'

export const gzip: Gzip = function (options?) {
  this.features.enable('gzip')

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-gzip')
    .setOptions(options)

  return this
}

export type Gzip = (this: Bud, options?: Gzip.Options) => Bud

export namespace Gzip {
  export type Options = Plugin.Options<zlib.ZlibOptions>
}
