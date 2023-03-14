/**
 * Lazy import helper
 *
 * @remarks
 * Callback function may be async or sync
 *
 * @param onReady - callback function
 * @returns void
 */
interface lazy {
  <T = any>(
    module: Promise<{default: T}>,
    handler: (module: T) => unknown | Promise<unknown>,
    errorHandler?: (err: Error) => unknown,
  ): Promise<unknown>
}

/**
 * Default error handler
 *
 * @throws Error
 */
const defaultErrorHandler = (err: string) => {
  throw new Error(err)
}

const lazy: lazy = async function lazy<T = any>(
  module: Promise<{default: T}>,
  handler: (module: T) => unknown | Promise<unknown>,
  errorHandler?: (err: Error) => unknown,
) {
  try {
    const {default: request} = await module
    return await handler(request)
  } catch (err) {
    const handle = errorHandler ? errorHandler : defaultErrorHandler
    handle(err)
  }
}

export default lazy
