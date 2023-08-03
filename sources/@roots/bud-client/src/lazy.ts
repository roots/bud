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
    handler: (module: T) => Promise<unknown> | unknown,
    errorHandler?: (error: unknown) => unknown,
  ): Promise<unknown>
}

/**
 * Default error handler
 *
 * @throws Error
 */
const defaultErrorHandler = (error: unknown) => {
  throw error
}

const lazy: lazy = async function lazy<T = any>(
  module: Promise<{default: T}>,
  handler: (module: T) => Promise<unknown> | unknown,
  errorHandler?: (error: unknown) => unknown,
) {
  try {
    const {default: request} = await module
    return await handler(request)
  } catch (error: unknown) {
    const handle = errorHandler ? errorHandler : defaultErrorHandler
    handle(error)
  }
}

export default lazy
