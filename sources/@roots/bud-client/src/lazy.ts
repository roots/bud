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
    module: Promise<T>,
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
  module: Promise<T>,
  onImport: (module: T) => Promise<unknown> | unknown,
  onError?: (error: unknown) => unknown,
) {
  try {
    const request = await module
    if (!request) throw new Error(`module not found: ${module}`)
    const result = await onImport(request)
    return result
  } catch (error: unknown) {
    const errorFn = onError ? onError : defaultErrorHandler
    errorFn(error)
  }
}

export default lazy
