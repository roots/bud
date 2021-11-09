import {Application, Base} from './server.dependencies'

/**
 * Server service
 *
 * @public
 */
export class Server extends Base {
  /**
   * Service register callback
   *
   * @public
   */
  public async register({container, store}): Promise<void> {
    this.application = Application()
  }
}
