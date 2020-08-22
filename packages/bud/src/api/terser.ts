import type {Bud} from './types'

type Terser = (this: Bud, options?: any) => Bud

const terser: Terser = function (options) {
  if (options) {
    this.options.set('adapters.terser', {
      ...this.options.get('adapters.terser'),
      ...options,
    })
  }

  return this
}

export {terser}
export type {Terser}
