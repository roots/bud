import type {Repository} from '@roots/bud-api'
import {Api as Base, repository} from '@roots/bud-api'
import type {Service} from '@roots/bud-framework'

/**
 * Provides macros/facades for assisting with common config tasks.
 *
 * @remarks
 * {@link Repository} container items are bound to `bud` during {@link Framework.bootstrap} sequence.
 *
 * @sealed
 * @public
 * @noInheritDoc
 */
class Api extends Base implements Service<Repository> {
  public name = 'api'

  public repository: Repository = repository
}

export {Api, repository}
