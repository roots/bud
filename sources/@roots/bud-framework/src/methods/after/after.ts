import type {Bud} from '../../bud'

export interface after {
  (
    callback: (app: Bud) => Promise<unknown>,
    errorHandler?: (error: Error) => unknown,
  ): Bud
}

/**
 * Execute a function after compiler has finished
 *
 * @public
 */
export const after: after = function (
  action: (app: Bud) => Promise<unknown>,
  errorHandler?: (error: Error) => unknown,
): Bud {
  const bud = this as Bud

  bud.hooks.action(`compiler.after`, async bud => {
    try {
      await action(bud)
    } catch (error) {
      if (!errorHandler) {
        throw error
      }

      errorHandler(error)
    }

    bud.success(`bud.after action executed`)
  })

  bud.success(`bud.after: registered action`)

  return bud
}
