import type {Bud} from '@roots/bud-typings'

/**
 * Add plugin to webpack configuration.
 */
export const addPlugin: addPlugin = function (name, make) {
  this.extensions.set(name, {make})

  return this
}

/**
 * Add plugin to webpack configuration.
 */
export type addPlugin = (
  this: Bud.Contract,
  name: string,
  make: any,
) => Bud.Contract
