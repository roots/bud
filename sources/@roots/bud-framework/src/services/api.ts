import type * as BaseService from '../service.js'

export interface Service extends BaseService.Service {
  /**
   * @public
   */
  bootstrap(): Promise<void>

  /**
   * @public
   */
  registered(): Promise<void>

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

  /**
   * Queued method calls
   *
   * @public
   */
  queue: Array<[string, ...any[]]>

  /**
   * Trace of all method calls
   *
   * @public
   */
  trace: Array<[string, ...any[]]>
}
