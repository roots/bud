import {Hooks as Contract, Service} from '@roots/bud-framework'
import {Hooks as Base} from '@roots/bud-hooks'
/**
 * @sealed
 */
declare class Hooks extends Base implements Contract, Service {
  /**
   * Registr lifecycle hook
   *
   * @remarks
   * Register hooks for each {@link Framework.Locations} key
   */
  register({store}: {store: any}): void
}
export {Hooks}
//# sourceMappingURL=index.d.ts.map
