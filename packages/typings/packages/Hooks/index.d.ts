/**
 * Callback registry opening internal values, functions and events
 * to runtime modification.
 *
 * Hooks are registered with `hooks.on`
 * Hooks are called with `hooks.filter`
 */
export interface Hooks {
  logger: Hooks.Logger
  on: Hooks.Register
  filter: Hooks.Filter
  waterfall: Hooks.Waterfall
}

export namespace Hooks {
  /**
   * Requires a logger to be supplied.
   */
  export interface Options {
    logger: Logger
  }

  /**
   * Simple logger, just needs an info and error interface.
   */
  export type Logger = {
    info: (message: string) => void
    error: (message: string) => void
  }

  /**
   * Register a callback to a name.
   *
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * @see {Hooks.Waterfall}
   */
  export type Register = (name: string, hook: Hook) => Hooks

  /**
   * Runs all the hooks registered to the given name on the given value
   * through a reducer
   *
   * @see {Hooks.Waterfall}
   */
  export type Filter = (name: string, value: unknown) => unknown

  /**
   * Accumulator passing each hook value on to the next.
   */
  export type Waterfall = (
    data: unknown,
  ) => [(_res: unknown, hook: Hook) => unknown, null]

  /**
   * Hook
   *
   * Function to mutate a runtime value.
   *
   * Receives a value from a filter reducer and does something
   * with it (or based on it). The returned
   * value is either returned to the filter or passed to the next
   * registered hook (if more than one hook has been registered).
   */
  export type Hook = (data: unknown) => unknown
}
