import type {Bud} from './types'

type Terser = (this: Bud, options?: any) => Bud

const terser: Terser = function (options) {
  if (options) {
    this.options.set('terser', {
      ...this.options.get('terser'),
      ...options,
    })
  }

  return this
}

export {terser}
export type {Terser}
