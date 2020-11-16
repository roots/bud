import type {Bud, Extension} from '@roots/bud-typings'
import {TerserPluginOptions} from 'terser-webpack-plugin'

export const terser: Terser = function (options) {
  if (options) {
    const terserOptions = this.extensions.get(
      'terser.options',
    ) as Extension.Options

    Object.entries(options).map(([opt, val]) => {
      terserOptions.merge(opt, val)
    })
  }

  return this
}

export type Terser<T = Bud.Contract> = (
  this: T,
  options: TerserPluginOptions,
) => T
