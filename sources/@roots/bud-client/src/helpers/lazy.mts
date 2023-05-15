/**
 * Lazy import helper
 *
 * @remarks
 * Callback function may be async or sync
 *
 * @param module - a promise that resolves to the module to be imported
 * @param handler - a function that gets executed once the module has been successfully imported.
 *                  The imported module is passed as an argument to this function.
 *                  This function can return a value or a promise that resolves to a value.
 * @param errorHandler - an optional function that gets executed if there's an error during the
 *                       module import or the handler execution.
 *                       This function receives the error as an argument.
 * @returns a promise that resolves to the result of the handler function, or void if there was an error
 *          and the errorHandler handled it.
 */
interface Lazy {
  <T = unknown>(
    module: Promise<T>,
    handler: (module: T) => unknown | Promise<unknown>,
    errorHandler?: (err: Error | string) => unknown,
  ): Promise<unknown | void>
}

/**
 * Default error handler
 *
 * @remarks
 * This function gets called if there's an error during the module import or the handler execution,
 * and no custom errorHandler has been provided.
 *
 * @param err - the error that occurred
 * @throws Error
 */
const defaultErrorHandler = (err: Error | string) => {
  throw err instanceof Error ? err : new Error(err)
}

const lazy: Lazy = async function lazy<T = unknown>(
  module: Promise<T>,
  handler: (module: T) => unknown | Promise<unknown>,
  handleError = defaultErrorHandler,
) {
  try {
    return await handler(await Promise.resolve(module))
  } catch (err) {
    handleError(err)
  }
}

export default lazy
