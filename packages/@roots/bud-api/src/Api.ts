/**
 * @module @roots/bud-api
 */

import {Service} from '@roots/bud-framework'

import type {Repository} from './repository'
import * as repository from './repository'

/**
 * @class Api
 *
 * Provides macros/facades for assisting with common config tasks.
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
