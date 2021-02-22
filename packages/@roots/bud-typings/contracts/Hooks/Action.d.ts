import {Framework} from '../Framework'

/**
 * Perform an action.
 *
 * Any functions registered to an action will be performed when called.
 */
declare type Action = (name: string, action: Action.When) => void

declare namespace Action {
  /**
   * An action.
   *
   * Passed `bud` and whatever other values are passed.
   */
  export type Fn<T = any> = (bud: Framework, value?: T) => T

  /**
   * Register an action.
   */
  export type When<T = any> = (
    name: string,
    action: Action.Fn<T>,
  ) => Framework
}

export {Action}
