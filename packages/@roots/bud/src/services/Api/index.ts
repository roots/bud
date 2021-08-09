import type {Repository} from '@roots/bud-api'
import {Api as Base, repository} from '@roots/bud-api'
import type {Service} from '@roots/bud-framework'
import * as Container from '@roots/container'

/**
 * Provides macros/facades for assisting with common config tasks.
 *
 * @remarks
 * 📝 {@link Repository} container items are bound to `bud` during {@link Service.bootstrap}.
 *
 * @public
 * @sealed
 */
class Api extends Base implements Service<Repository> {
  public name = 'api'

  public repository: Repository & Container.Repository =
    repository

  public bootstrap() {
    this.bindMacro<Repository>(this.all())
  }
}

export {Api, repository}
