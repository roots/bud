import {Application, Base} from './server.dependencies'

/**
 * Server service
 *
 * @public
 */
export class Server extends Base {
  /**
   * Service ident
   *
   * @public
   */
  public ident = 'bud.server'

  /**
   * Service register callback
   *
   * @public
   */
  public async bootstrap(): Promise<void> {
    this.application = Application()
  }
}
