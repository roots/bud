import type {Extension} from '@roots/bud-typings'

export const terser = function (options) {
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
