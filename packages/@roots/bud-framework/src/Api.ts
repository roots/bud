import {Framework} from './Framework'
import {Service} from './Service'

/**
 * @internal
 */
export interface Api<
  T = Record<string, (...args: unknown[]) => Framework>,
> extends Service<T> {
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
  call: (name: string, ...args: any[]) => Promise<void>

  /**
   * @internal
   */
  processQueue: () => Promise<void>

  bindFacade: (name: string) => void
}
