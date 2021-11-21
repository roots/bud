import {Framework} from '..'

/**
 * Close interface
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export interface close {
  (done?: CallableFunction): void
}

/**
 * Exit the program
 *
 * @param this - {@link @roots/bud-framework#Framework}
 * @param done - Callback function to be called before end of run
 *
 * @public
 */
export function close(done = process.exit) {
  this as Framework

  this.hooks.filter('event.app.close')

  done()
}
