import {isFunction} from 'lodash'

import type {Framework} from './'

/**
 * Check if object is a callable function
 *
 * @param obj - Some unknown object
 * @returns boolean showing if object exists and is callable
 *
 * @internal
 */
const existsAndIsCallable = (obj: unknown): boolean =>
  obj && isFunction(obj)

/**
 * Close interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export interface close {
  (this: Framework, done?: CallableFunction): void
}

/**
 * Exit the program
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export function close(this: Framework, done = process.exit) {
  if (existsAndIsCallable(this.dashboard?.instance?.unmount)) {
    this.dashboard.instance.unmount()
  }

  setTimeout(() => {
    if (existsAndIsCallable(this.compiler.instance?.close)) {
      this.compiler.instance.close(() => {
        if (existsAndIsCallable(this.server?.instance?.close)) {
          this.server.instance.close(() => {
            if (
              existsAndIsCallable(this.server?.watcher?.close)
            ) {
              this.server.watcher.close()
            }
          })
        }
      })
    }

    done()
  }, 10)
}
