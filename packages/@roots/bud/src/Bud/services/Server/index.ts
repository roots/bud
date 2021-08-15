import {
  Framework,
  Server as Contract,
} from '@roots/bud-framework'
import {Server as Base} from '@roots/bud-server'
import {Express} from '@roots/bud-support'

export class Server extends Base implements Contract {
  public register({container, store}: Framework): void {
    this.application = Express()
    this.config = container(store.get('server'))
  }
}
