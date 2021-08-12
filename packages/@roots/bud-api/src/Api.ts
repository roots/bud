import {Service} from '@roots/bud-framework'

import Repository from './repository'

/**
 * Provides macros/facades for assisting with common config tasks.
 */
class Api extends Service<Repository> {
  public name = 'api'

  public repository = Repository

  public bootstrap() {
    this.bindMacro<Repository>(this.all())
  }
}

export {Api}
