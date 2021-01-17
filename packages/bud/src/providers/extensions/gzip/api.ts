import {Bud} from '../../../Bud'
import {CompressionPlugin} from '@roots/bud-typings'

export function gzip(
  this: Bud,
  options?: CompressionPlugin.Options,
): Bud {
  this.options.enable('gzip')

  if (!options) return

  this.extensions.set(
    'compression-webpack-plugin-gzip.options',
    options,
  )

  return this
}
