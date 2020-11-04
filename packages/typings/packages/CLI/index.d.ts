import Framework from '..'
import * as Ink from 'ink'
import * as hooks from './hooks'
import {FunctionComponent} from 'react'

/**
 * Framework CLI
 */
export namespace CLI {
  /**
   * The CLI instance
   */
  export type Build = Ink.Instance

  /**
   * Error display component.
   */
  export type Error = Ink.Instance

  /**
   * Controller interface used to start and stop
   * Ink application from within Bud context.
   */
  export interface Controller {
    bud: Framework.Bud
    instance?: Build
    run: () => void
    kill: () => void
  }

  /**
   * Serve container.
   */
  export type Serve = FunctionComponent<{bud: Framework.Bud}>

  /**
   * React hooks.
   */
  export {hooks}
}
