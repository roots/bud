import type {Bud} from '@roots/bud-typings'

/**
 * Import your plugin in the manner described
 *  by the plugin documentation.
 *
 * Now, pass an identifier for the plugin and the
 * plugin instance.
 *
 * ```js
 * bud.addPlugin('my-plugin', new myPlugin())
 * ```
 *
 * @see {{Docs: /addPlugin}}
 */
export const addPlugin: AddPlugin = function (name, make) {
  this.extensions.set(name, {make})

  return this
}

export type AddPlugin = (
  this: Bud.Contract,
  name: string,
  make: any,
) => Bud.Contract
