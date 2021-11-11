import {Api as Base} from '@roots/bud-api'

/**
 * API service class
 *
 * @remarks
 * The API class binds all the facade functions provided by the package
 * and exposes them as a single object.
 *
 * @public
 */
export class Api extends Base {
  /**
   * Service ident
   *
   * @public
   */
  public ident = 'bud.api'
}
