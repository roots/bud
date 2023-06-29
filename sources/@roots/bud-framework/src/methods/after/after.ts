import {Bud} from '@roots/bud-framework'

export interface after {
  (
    callback: (app: Bud) => Promise<unknown>,
    errorHandler?: (error: Error) => unknown,
  ): Bud
}

/**
 * Execute a function after compiler has finished
 */
export const after: after = function (
  this: Bud,
  fn: (app: Bud) => Promise<unknown>,
  errorHandler?: (error: Error) => unknown,
): Bud {
  this.hooks.action(`compiler.done`, async bud => {
    await fn(bud).catch(error => {
      if (!errorHandler) throw error
      errorHandler(error)
    })
  })

  return this
}
