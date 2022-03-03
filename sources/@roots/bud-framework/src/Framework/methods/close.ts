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
export async function close(done = process.exit) {
  const ctx = this as Framework
  await ctx.hooks.fire('event.app.close')
  done()
}
