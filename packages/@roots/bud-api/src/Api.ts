/**
 * @module @roots/bud-api
 */

import {Service} from '@roots/bud-framework'

import type {Repository} from './repository'
import * as repository from './repository'

/**
 * Api
 *
 * Provides macros/facades for assisting with common config tasks.
 */
class Api extends Service<Repository> {
  public name = 'api'

  public bootstrap() {
    this.bindMacro<Repository>(repository)
  }
}

export {Api}
