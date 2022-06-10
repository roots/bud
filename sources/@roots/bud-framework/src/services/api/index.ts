import {ContainerService} from '../../service.js'

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
  call<K extends keyof Service['repository']>(
    name: K,
    ...args: any
  ): Promise<void>

  /**
   * @internal
   */
  processQueue: () => Promise<void>

  /**
   * @internal
   */
  bindFacade<K extends `${keyof Service['repository'] & string}`>(
    key: K,
    fn: Service['repository'][K],
  ): void
}
