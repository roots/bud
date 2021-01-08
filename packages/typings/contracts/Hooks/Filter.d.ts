/**
 * Filter a value
 *
 * Pass a key and the source value. This value is passed through
 * registered filter functions. The mutated value is returned
 * in place of the original.
 */
export declare type Filter = <T = any>(
  name: string,
  value: T,
) => T

export declare namespace Filter {
  /**
   * Reduce the original value through registered filters.
   */
  export type Reducer = <T = any>(val: T, hook: Fn<T>) => T

  /**
   * Filter function definition
   */
  export type Fn<T = any> = (val: T) => T

  /**
   * Registered filter
   */
  export type On = <T = any>(name: string, hook: Fn<T>) => void
}
