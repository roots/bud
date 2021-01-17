import {Bud} from '../../../Bud'

export const brotli: Config = function (options) {
  this.options.set('brotli', true)

  if (!options) return

  this.extensions.add(
    'compression-webpack-plugin-brotli.options',
    options,
  )

  return this
}

export type Config = (
  this: Bud,
  options?: Bud.Module.Options,
) => Bud
