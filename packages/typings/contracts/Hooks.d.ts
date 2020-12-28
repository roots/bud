import {Framework} from './'

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
export interface Hooks extends Framework.Service<Framework> {
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
  on: Hooks.Filter.On

  /**
   * ## bud.hooks.when
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
   * bud.hooks.action(
   *   'namespace.name.event',
   *   (bud, value) {
   *     console.log(value)
   *   },
   * )
   * ```
   */
  when: Hooks.Action.When

  /**
   * ## bud.hooks.action
   *
   * Register a function to be executed during a specific bud lifecycle event.
   *
   */
  action: Hooks.Action

  /**
   * ## bud.hooks.filter
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
  filter: Hooks.Filter

  /**
   * ## bud.hooks.reduceFilters
   *
   * For an array of filters, process value with each filter sequentially,
   * passing the result on to the next filter.
   */
  reduceFilters: Hooks.Filter.Reducer
}

export namespace Hooks {
  /**
   * Filter
   */
  export type Filter<T = unknown> = (name: string, value: T) => T

  export namespace Filter {
    export type Reducer<T = any> = (
      val: T,
      hook: Filter.Fn<T>,
    ) => T
    export type Fn<T = any> = (val: T) => T
    export type On<T = any> = (
      name: string,
      hook: Filter.Fn<T>,
    ) => void
  }

  /**
   * Action
   */
  export type Action = (
    name: string,
    action: Action.When,
  ) => void
  export namespace Action {
    export type Fn<T = any> = (bud: Framework, value: T) => T
    export type When<T = any> = (
      name: string,
      action: Action.Fn<T>,
    ) => void
  }

  /**
   * Items
   */
  export interface Store
    extends Framework.ServiceContainer<Framework> {}

  export namespace Store {
    /**
     * Store
     */
    export type Items = {
      [key: string]: Filters | Actions
    }

    /**
     * Filters
     */
    export interface Filters extends Store {}

    /**
     * Actions
     */
    export interface Actions extends Store {}
  }
}
