import {Service} from '@roots/bud-framework'

import type {Repository} from './repository'
import * as repository from './repository'

/**
 * Provides macros/facades for assisting with common config tasks.
 */
class Api extends Service<Repository> {
  public name = 'api'

  public repository = repository

  public bootstrap() {
    this.bindMacro<Repository>(this.all())
  }
}

export {Api}
