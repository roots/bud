import {Bud} from '@roots/bud-framework'

export interface after {
  (
    callback: ((app: Bud) => Promise<unknown>) | ((app: Bud) => unknown),
    onError?: (error: Error) => unknown,
  ): Bud
}

/**
 * Execute a function after compiler has finished
 */
export const after: after = function (
  this: Bud,
  fn: ((app: Bud) => any) | ((app: Bud) => Promise<any>),
  onError?: (error: Error) => unknown,
): Bud {
  this.hooks.action(`compiler.done`, async bud => {
    try {
      await bud.resolvePromises()
      await fn(bud)
    } catch (error) {
      onError ? onError(error) : bud.catch(error)
    }
  })

  return this
}
