import {Bud} from '@roots/bud-framework'

export interface after {
  (
    callback: ((app: Bud) => Promise<unknown>) | ((app: Bud) => unknown),
    errorHandler?: (error: Error) => unknown,
  ): Bud
}

/**
 * Execute a function after compiler has finished
 */
export const after: after = function (
  this: Bud,
  fn: ((app: Bud) => Promise<unknown>) | ((app: Bud) => unknown),
  errorHandler?: (error: Error) => unknown,
): Bud {
  this.hooks.action(`compiler.done`, async bud => {
    try {
      await Promise.resolve(fn(bud))
    } catch (error) {
      if (!errorHandler) throw error
      errorHandler(error)
    }
  })

  return this
}
