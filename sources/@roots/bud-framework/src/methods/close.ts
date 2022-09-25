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
  (done?: () => unknown): Promise<void>
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
export function close(onComplete?: any) {
  const application = this as Bud

  try {
    if (application.compiler?.instance?.running) {
      application.compiler.instance.close(() => {
        closeDevelopmentServer(application)
        unmountDashboard(application)
      })
    } else {
      closeDevelopmentServer(application)
      unmountDashboard(application)
    }
  } catch (error) {
    throw error
  }

  if (onComplete) return onComplete()
}

const unmountDashboard = (application: Bud) => {
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
