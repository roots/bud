/**
 * Close interface
 *
 * @param this - {@link @roots/bud-Bud#Bud}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export interface close {
  (done?: CallableFunction): Promise<void>
}

/**
 * Gracefully shutdown {@link Bud} and registered {@link Services}
 *
 * @example
 * ```js
 * bud.close()
 * ```
 *
 * @public
 */
export function close(callback?: any) {
  if (this.env.has('JEST_WORKER_ID')) {
    return callback && callback()
  }

  callback ? callback() : process.exit()
}
