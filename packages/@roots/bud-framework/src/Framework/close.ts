import {Framework} from './'
import {isFunction} from './framework.dependencies'

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

  done()
}
