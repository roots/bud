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
    this.on<`location.project`>(`location.project`, () =>
      !store.isUndefined(`cli.flags.location.project`)
        ? store.get(`cli.flags.location.project`)
        : store.get(`location.project`),
    )
    this.on<`location.src`>(`location.src`, () =>
      !store.isUndefined(`cli.flags.location.src`)
        ? store.get(`cli.flags.location.src`)
        : store.get(`location.src`),
    )
    this.on<`location.dist`>(`location.dist`, () =>
      !store.isUndefined(`cli.flags.location.dist`)
        ? store.get(`cli.flags.location.dist`)
        : store.get(`location.dist`),
    )
    this.on<`location.modules`>(`location.modules`, () =>
      !store.isUndefined(`cli.flags.location.modules`)
        ? store.get(`cli.flags.location.modules`)
        : store.get(`location.modules`),
    )
    this.on<`location.storage`>(`location.storage`, () =>
      !store.isUndefined(`cli.flags.location.storage`)
        ? store.get(`cli.flags.location.storage`)
        : store.get(`location.storage`),
    )
  }
}
