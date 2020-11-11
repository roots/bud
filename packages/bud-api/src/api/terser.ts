import type {Extension} from '@roots/bud-extensions'

export const terser: Framework.API.Terser = function (options) {
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
