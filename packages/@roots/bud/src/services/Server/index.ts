import {Application, Base} from './server.dependencies'

/**
 * Server service container class
 *
 * @public
 */
export class Server extends Base {
  /**
   * Service register callback
   *
   * @public
   */
  public register({container, store}): void {
    this.application = Application()
    this.config = container(store.get('server'))
  }
}
