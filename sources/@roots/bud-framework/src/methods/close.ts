import type {Bud} from '@roots/bud-framework'

import isFunction from '@roots/bud-support/lodash/isFunction'

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
export function close(onComplete?: () => unknown) {
  try {
    if (this.compiler?.instance?.running) {
      this.compiler.instance.close(() => {
        closeDevelopmentServer(this)
      })
    } else {
      closeDevelopmentServer(this)
    }
  } catch (error) {
    throw error
  }

  if (onComplete) return onComplete()
}

const closeDevelopmentServer = (bud: Bud) => {
  if (!bud.server) return

  try {
    if (
      bud.isDevelopment &&
      isFunction(bud.server.watcher?.instance?.close)
    ) {
      bud.server.watcher.instance.close()
    }

    if (
      bud.isDevelopment &&
      isFunction(bud.server.connection?.instance?.close)
    ) {
      bud.server.connection.instance.close()
    }
  } catch (error) {
    throw error
  }
}
