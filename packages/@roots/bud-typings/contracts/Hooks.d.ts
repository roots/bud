import {Framework, Service} from '.'

/**
 * ## hooks
 *
 * Bud provides a system of 'hooks' to expose values
 * for easier modification.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-hooks)
 * [🔗 Documentation](#)
 *
 * ### Usage
 *
 * ####  Add a new entry to the `webpack.externals` configuration:
 *
 * ```js
 * hooks.on(
 *   'webpack.externals',
 *   externals => ({
 *     ...externals,
 *     $: 'jquery',
 *   }),
 * )
 * ```
 *
 * #### Change the `webpack.output.filename` format:
 *
 * ```js
 * hooks.on(
 *   'webpack.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * #### Replace the regular expression used for CSS modules:
 *
 * ```js
 * hooks.on(
 *   'webpack.module.rules.oneOf.css.test',
 *   () => /\.css$/,
 * )
 * ```
 */
export declare interface Hooks extends Service {
  /**
   * ## hooks.on
   *
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * ### Usage
   *
   * ```js
   * hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   */
  on<T = any>(
    name: string | string[],
    hook: Hooks.Filter.Fn<T>,
  ): Framework

  on<T = any>(name: string | string[], hook: T): Framework

  /**
   * ## hooks.filter
   *
   * Make a value filterable by hooks.
   *
   * Provide the name of the hook and the initial value. If any
   * `bud.hooks.on` functions are "hooked" to the provided name, the
   * value will be passed through them before being returned to your
   * calling code.
   *
   * ### Usage
   *
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   */
  filter<T = any>(id: string | string[]): T
}
