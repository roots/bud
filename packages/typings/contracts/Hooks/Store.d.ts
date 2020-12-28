import {Framework} from '../Framework'

/**
 * Items
 */
export interface Store
  extends Framework.ServiceContainer<Framework> {}

export namespace Store {
  /**
   * Store
   */
  export type Items = {
    filters: Filters
    actions: Actions
  }

  /**
   * Filters
   */
  export interface Filters extends Store {}

  /**
   * Actions
   */
  export interface Actions extends Store {}
}
