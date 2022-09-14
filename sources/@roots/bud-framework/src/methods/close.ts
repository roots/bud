import {isFunction} from '@roots/bud-support/lodash-es'

import type {Bud} from '../bud'

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
  const application = this as Bud

  try {
    application.isDevelopment &&
      isFunction(
        application.server?.connection?.instance?.removeAllListeners,
      ) &&
      application.server.connection.instance.removeAllListeners().unref()
  } catch (error) {
    application.error(error)
  }

  try {
    application.dashboard?.instance?.unmount()
  } catch (error) {
    application.info(
      `Dashboard unmount error\n`,
      error,
      `\n`,
      `This might not be a problem, as the dashboard will unmount itself, so there is a race condition here.`,
    )
  }

  return callback && callback()
}
