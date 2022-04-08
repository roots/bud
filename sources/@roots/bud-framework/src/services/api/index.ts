import {ContainerService} from '../../service'

/**
 * API service
 *
 * @public
 */
export interface Service extends ContainerService {
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

  /**
   * @internal
   */
  bindFacade: (key: `${keyof Service['repository'] & string}`) => void
}
