import {Hooks as Contract, Service} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'
import {bind} from '@roots/bud-support'

/**
 * Hooks service
 *
 * @public
 */
export class Hooks extends Base implements Contract, Service {
  /**
   * Service identifier
   *
   * @internal
   */
  public ident: string = 'hooks'

  /**
   * Registr lifecycle hook
   *
   * @remarks
   * Register hooks for each disk key
   *
   * @internal
   */
  @bind
  public async bootstrap({store}) {
    this.on(`location.project`, store.get(`location.project`))
    this.on(`location.src`, store.get(`location.src`))
    this.on(`location.dist`, store.get(`location.dist`))
    this.on(`location.storage`, store.get(`location.storage`))
    this.on(`location.modules`, store.get(`location.modules`))
  }
}
