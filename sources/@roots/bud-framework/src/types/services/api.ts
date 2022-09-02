import type {Service as Base} from '../../service'

/**
 * API service
 *
 * @public
 */
export interface Service extends Base {
  /**
   * @internal
   */
  trace: Array<[string, ...any[]]>

  /**
   * @internal
   */
  queue: Array<[string, ...any[]]>

  /**
   * @internal
   */
  call(name: string, ...args: any): Promise<void>

  /**
   * @internal
   */
  processQueue: () => Promise<void>

  /**
   * @internal
   */
  bindFacade(key: string, fn: CallableFunction): void
}
