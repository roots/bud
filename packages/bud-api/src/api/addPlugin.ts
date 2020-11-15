import type {Bud, Webpack} from '@roots/bud-typings'

/**
 * ### bud.addPlugin  [💁 _Fluent_]
 *
 * Import your plugin in the manner described by
 * the plugin documentation. Then, pass an identifier
 * for the plugin and the plugin instance.
 *
 * [🔗 Docs](https://git.io/JTNGA)
 *
 * ### Usage
 *
 * **Add a plugin to the webpack configuration**
 *
 * ```js
 * bud.addPlugin('my-plugin', new myPlugin())
 * ```
 *
 */
export const addPlugin: AddPlugin = function (name, make) {
  this.extensions.set(name, {make})

  return this
}

export type AddPlugin = (
  this: Bud.Contract,
  name: string,
  make: Webpack.Plugin | CallableFunction,
) => Bud.Contract
