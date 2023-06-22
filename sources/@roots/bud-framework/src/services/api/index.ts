import type {Bud} from '@roots/bud-framework'
import type {ServiceContainer} from '@roots/bud-framework/service'

/**
 * API service
 *
 * @remarks
 * Binds facade methods to the framework and provides a way to list them,
 * call them, and otherwise manipulate them.
 */
export interface Api extends ServiceContainer {
  /**
   */
  bindFacade(key: string, fn: CallableFunction): void

  /**
   */
  call(name: string, ...args: Array<any>): Promise<Bud>

  /**
   * Logger
   */
  logger: ServiceContainer['logger']

  /**
   */
  processQueue(): Promise<void>

  /**
   * Queued method calls
   */
  queue: Array<[string, ...any[]] | undefined>

  /**
   * Trace of all method calls
   */
  trace: Array<[string, ...any[]]>
}
