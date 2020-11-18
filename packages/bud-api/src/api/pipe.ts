import {Bud} from '@roots/bud-typings'

export const pipe: Pipe = function(fns) {
  fns.reduce((_val, fn) => {
    return fn(this)
  }, this)

  return this
}

export type Pipe<T = Bud.Contract> = (
  this: T,
  fns: ((bud: T) => T)[],
) => T
