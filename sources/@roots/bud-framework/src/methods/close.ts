import isFunction from '@roots/bud-support/lodash/isFunction'

import type {Bud} from '../bud.js'

/**
 * Close interface
 *
 * @param this - {@link @roots/bud-Bud#Bud}
 * @param done - Callback function to be called before end of run
 */
export interface close {
  (done?: () => unknown): Promise<void>
}

/**
 * Gracefully shutdown {@link Bud} and registered {@link Services}
 *
 * @example
 * ```js
 * bud.close()
 * ```
 */
export function close(onComplete?: any) {
  const application = this as Bud

  try {
    if (application.compiler?.instance?.running) {
      application.compiler.instance.close(() => {
        closeDevelopmentServer(application)
      })
    } else {
      closeDevelopmentServer(application)
    }
  } catch (error) {
    throw error
  }

  if (onComplete) return onComplete()
}

const closeDevelopmentServer = (application: Bud) => {
  try {
    if (
      application.isDevelopment &&
      isFunction(application.server?.watcher?.instance?.close)
    ) {
      application.server.watcher.instance.close()
      application.success(`closed fs watch`)
    }

    if (
      application.isDevelopment &&
      isFunction(application.server?.connection?.instance?.close)
    ) {
      application.server.connection.instance.close()
      application.success(`closed development server`)
    }
  } catch (error) {
    throw error
  }
}
