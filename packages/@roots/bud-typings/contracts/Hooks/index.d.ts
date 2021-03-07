import {Framework} from '../'
import {Filter} from './Filter'
import {Action} from './Action'
import {Store} from './Store'

/**
 * ## bud.hooks
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
 * bud.hooks.on(
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
 * bud.hooks.on(
 *   'webpack.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * #### Replace the regular expression used for CSS modules:
 *
 * ```js
 * bud.hooks.on(
 *   'webpack.module.rules.oneOf.css.test',
 *   () => /\.css$/,
 * )
 * ```
 */
export declare interface Hooks {
  /**
   * ## bud.hooks.on
   *
   * Register a function to filter a value being produced by Bud.
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
   * bud.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   */
  on<T = any>(name: string, hook: Hooks.Filter.Fn<T>): Framework

  /**
   * ## hooks.when
   *
   * Register a function to execute at a specific point in Bud's lifecycle.
   *
   * If an action calls for this name the function is run. If more than one
   * action is registered to a name, they will be called sequentially
   * in the order they were registered.
   *
   * ### Usage
   *
   * ```js
   * hooks.when(
   *   'namespace.name.event',
   *   (bud) {
   *     console.log(bud)
   *   },
   * )
   * ```
   */
  when: Action.When

  /**
   * ## hooks.action
   *
   * Register a function to be executed during a specific bud lifecycle event.
   *
   */
  action: Action

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
  filter: Filter
}

export declare namespace Hooks {
  export {Store}
  export {Action}
  export {Filter}
}
