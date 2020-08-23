import type {Bud} from './types'

type Terser = (this: Bud, options?: any) => Bud

const terser: Terser = function (options) {
  if (options) {
    this.options.set('webpack.plugins.terser', {
      ...this.options.get('webpack.plugins.terser'),
      ...options,
    })
  }

  return this
}

export {terser}
export type {Terser}
