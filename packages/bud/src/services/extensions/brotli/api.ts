import type {Framework} from '@roots/bud-typings'

export const brotli: Config = function (options) {
  this.store.set('features.brotli', true)

  if (!options) return

  this.extensions.set(
    'compression-webpack-plugin-brotli.options',
    options,
  )

  return this
}

export type Config = (
  this: Framework,
  options?: Framework.Module.Options,
) => Framework
