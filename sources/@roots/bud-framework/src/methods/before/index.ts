import {Bud} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Bud {
    /**
     * Execute a function before compiler has finished
     */
    before: before
  }
}

export interface before {
  (
    callback: ((app: Bud) => Promise<unknown>) | ((app: Bud) => unknown),
    onError?: (error: Error) => unknown,
  ): Bud
}

/**
 * Execute a function before compiler has finished
 */
export const before: before = function (
  this: Bud,
  fn: ((app: Bud) => any) | ((app: Bud) => Promise<any>),
  onError?: (error: Error) => unknown,
): Bud {
  this.hooks.action(`compiler.before`, async bud => {
    try {
      await bud.resolvePromises()
      await fn(bud)
    } catch (error) {
      onError ? onError(error) : bud.catch(error)
    }
  })

  return this
}
