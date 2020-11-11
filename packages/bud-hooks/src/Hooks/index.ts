import {Indexed} from '@roots/container'

class Hooks extends Indexed implements Hooks.Contract {
  logger: Hooks.Logger

  public constructor({logger}: Hooks.Options) {
    super()
    this.logger = logger
  }

  public on(name: string, hook: Hooks.Hook<unknown>): this {
    this.repository[name] = this.repository[name]
      ? [this.repository[name], hook]
      : [hook]

    return this
  }

  public action<T = unknown>(name: string, binding: T): void {
    this.repository[name].map(hook => hook.bind(binding))
  }

  public filter<T = unknown>(name: string, value: T): T {
    return !this.repository[name]
      ? value
      : this.repository[name].reduce(
          (val: T, hook: Hooks.Hook<T>) => hook(val),
          null,
        )
  }
}

/**
 * Callback registry opening internal values, functions and events
 * to runtime modification.
 *
 * Hooks are registered with `hooks.on`
 * Hooks are called with `hooks.filter`
 */
namespace Hooks {
  export declare class Contract
    extends Indexed
    implements Interface {
    logger: Logger
    constructor({logger}: Options)
    on<T>(name: string, hook: Hook<T>): Contract
    filter<T>(name: string, value: T): T
  }

  export interface Interface {
    logger: Logger
    on<T>(name: string, hook: Hook<T>): Contract
    filter<T>(name: string, value: T): T
  }

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
  export type Hook<T> = (data: unknown) => T
}

export {Hooks}
