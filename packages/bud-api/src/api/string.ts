import {Bud} from '@roots/bud-typings'

export const string: Stringify = function (string) {
  return JSON.stringify(string)
}

export type Stringify<T = Bud> = (
  this: T,
  string: unknown,
) => string
