import type {Bud} from '../bud'

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
  const app = this as Bud

  app.hooks.action(`compiler.after`, async app => {
    try {
      await action(app)
    } catch (error) {
      if (!errorHandler) {
        throw error
      }

      errorHandler(error)
    }

    app.success(`bud.after action executed`)
  })

  app.success(`bud.after: registered action`)
  return app
}
