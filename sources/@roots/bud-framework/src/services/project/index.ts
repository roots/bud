import type {ContainerService as Base} from '../../service.js'

/**
 * Peer service interface
 *
 * @public
 */
export interface Service extends Base {
  [key: string]: any
}
