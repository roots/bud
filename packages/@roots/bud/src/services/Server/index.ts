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
   * @internal
   */
  public ident = 'bud.server'

  /**
   * Service register callback
   *
   * @internal
   */
  public async bootstrap(): Promise<void> {
    this.application = Application()
  }
}
