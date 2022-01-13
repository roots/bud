import {Framework} from '../../Framework'
import Abstract from './Abstract'
import Interface from './Interface'

export {Interface}
export {Abstract}

/**
 * Loader factory interface
 *
 * @public
 */
export interface Factory {
  (app: Framework): Interface
}
