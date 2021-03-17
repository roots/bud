import dotenv from 'dotenv'
import {Service} from '@roots/bud-framework'

/**
 * Environment variables
 */
export class Env extends Service {
  public name = 'service/env'

  public register() {
    this.setStore(
      dotenv.config({
        path: this.path.posix.join(
          this.app.subscribe('location/project'),
          '.env',
        ),
      }).parsed,
    )
  }
}
