import type {Bud, Webpack} from '@roots/bud-typings'

export const addPlugin: AddPlugin = function (name, make) {
  this.extensions.set(name, {make})

  return this
}

export type AddPlugin = (
  this: Bud.Contract,
  name: string,
  make: Webpack.Plugin | CallableFunction,
) => Bud.Contract
