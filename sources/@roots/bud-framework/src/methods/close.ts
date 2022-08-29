import {isFunction} from 'lodash-es'

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
  try {
    this.isDevelopment &&
      isFunction(this.server?.connection?.instance?.removeAllListeners) &&
      this.server.connection.instance.removeAllListeners().unref()
  } catch (error) {
    this.error(error)
  }

  try {
    this.dashboard?.instance?.unmount()
  } catch (error) {
    this.info(`Dashboard unmount error`, error)
    this.info(
      `This might not be a problem, as the dashboard will unmount itself, so there is a race condition here.`,
    )
  }

  callback && callback()
}
