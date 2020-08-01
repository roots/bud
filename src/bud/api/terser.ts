import type {Bud, Terser} from './types'

const terser: Terser = function (options: {enable?: boolean; terser?: object}): Bud {
  this.features.set('terser', options?.enable ?? true)

  options?.terser && this.options.set('terser', options.terser)

  return this
}

export {terser}
