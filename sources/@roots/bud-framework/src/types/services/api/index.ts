import type {ServiceContainer} from '../../../service.js'

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework and provides a way to list them,
 * call them, and otherwise manipulate them.
 *
 * @public
 */
export interface Api extends ServiceContainer {
  /**
   * Queued method calls
   *
   * @public
   */
  queue: Array<[string, ...any[]] | undefined>

  /**
   * Trace of all method calls
   *
   * @public
   */
  trace: Array<[string, ...any[]]>

  /**
   * Logger
   *
   * @public
   */
  logger: ServiceContainer['logger']

  /**
   * @public
   */
  processQueue(): Promise<void>

  /**
   * @public
   */
  call(name: string, ...args: any): Promise<void>

  /**
   * @public
   */
  bindFacade(key: string, fn: CallableFunction): void
}