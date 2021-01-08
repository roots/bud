import {Framework} from '../'

/**
 * Store
 */
export declare interface Store extends Framework.Container {
  repository: {
    actions: Framework.Container<Framework.Hooks.Action>
    filters: Framework.Container<Framework.Hooks.Filter>
  }
}
