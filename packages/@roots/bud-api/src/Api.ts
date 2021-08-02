/**
 * @module @roots/bud-api
 */

import {Service} from '@roots/bud-framework'

import type {Repository} from './repository'
import * as repository from './repository'

/**
 * Service: Api
 *
 * Provides macros/facades for assisting with common config tasks.
 *
 * @noInheritDoc
 */
class Api extends Service<Repository> {
  /**
   * Service name
   */
  public name = 'api'

  /**
   * Bootstrap
   */
  public bootstrap() {
    this.bindMacro<Repository>(repository)
  }
}

/**
 * @exports Api
 */
export {Api}
