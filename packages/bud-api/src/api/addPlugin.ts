import type {Framework, Webpack} from '@roots/bud-typings'

export const addPlugin: AddPlugin = function (name, make) {
  this.extensions.set(name, {make})
  return this
}

export type AddPlugin = (
  this: Framework,
  name: string,
  make: Webpack.Plugin | CallableFunction,
) => Framework
