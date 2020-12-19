import type {Bud, Webpack} from '@roots/bud-typings'

export const addPlugin: AddPlugin = function (name, make) {
  this.extensions.set(name, {make})
  return this
}

export type AddPlugin<T = Bud> = (
  this: T,
  name: string,
  make: Webpack.Plugin | CallableFunction,
) => T
