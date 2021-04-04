import {express} from '@roots/bud-support'
import {Server as Base} from '@roots/bud-server'
import {options} from '../../bootstrap/options'

export class Server extends Base {
  /**
   * Service registration
   */
  public register(): void {
    this.instance = express()

    this.config = this.app.container({
      ...options.server,
    })
  }
}
