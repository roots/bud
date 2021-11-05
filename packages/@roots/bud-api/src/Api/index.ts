import {Service} from '@roots/bud-framework'

import {Repository} from '../Repository'

/**
 * API service
 *
 * @remarks
 * The API class binds all the facade functions provided by the package
 * and exposes them as a single object.
 *
 * @public
 */
export class Api extends Service<Repository> {
  /**
   * Repository of high-level functions intended
   * for use through the framework and the enduser
   * config files.
   *
   * @override @internal
   */
  public repository: Repository = Repository

  /**
   * Service bootstrap event
   *
   * @public
   */
  public async bootstrap() {
    this.app.bindMethod(this.all())
  }
}
