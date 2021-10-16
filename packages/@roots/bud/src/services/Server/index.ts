import * as Framework from '@roots/bud-framework'
import {Server as Base} from '@roots/bud-server'
import {Express} from '@roots/bud-support'

/**
 * Server service container class
 *
 * @public @core @container
 */
export class Server
  extends Base
  implements Framework.Server.Interface
{
  /**
   * Service register callback
   *
   * @public
   */
  public register({container, store}): void {
    this.application = Express()
    this.config = container(store.get('server'))
  }
}
