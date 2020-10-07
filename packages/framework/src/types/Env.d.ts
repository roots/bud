/**
 * Environment utility.
 */
export declare type Env = {
  /**
   * Check the value of an env
   */
  is: (check: Env) => boolean

  /**
   * Get the env
   */
  get: () => Env
}
