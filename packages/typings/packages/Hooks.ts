import {Logger} from '.'

export declare class Contract {
  logger: Logger.Contract

  constructor({logger}: Options)

  public on<T = any>(name: string, hook: Hook<T>): this

  public action<T = unknown>(name: string, binding: T): void

  public filter<T = unknown>(name: string, value: T): T
}

/**
 * Requires a logger to be supplied.
 */
export declare interface Options {
  logger: Logger.Contract
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
 * @see {Waterfall}
 */
export type Register<T> = (
  name: string,
  hook: Hook<T>,
) => Contract

/**
 * Runs all the hooks registered to the given name on the given value
 * through a reducer
 *
 * @see {Waterfall}
 */
export type Filter<T> = (name: string, value: T) => T

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
export type Hook<T> = (data: T) => T
