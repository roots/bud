import type {Terser} from './typings'

export const terser: Terser = function (options) {
  const terserOptions = this.extensions.get('terser').getStore()

  Object.entries(options).map(([opt, val]) => {
    terserOptions.merge(opt, val)
  })

  return this
}
