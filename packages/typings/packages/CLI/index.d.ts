import * as Ink from 'ink'
import * as hooks from './hooks'

/**
 * Framework CLI
 */
export namespace CLI {
  /**
   * The CLI instance
   */
  export type App = Ink.Instance

  /**
   * Constructs the CLI controller interface
   */
  export type Factory = (bud: Framework.Bud) =>
    Controller

  /**
   * Controller interface used to start and stop
   * Ink application from within Bud context.
   */
  export interface Controller {
    bud: Framework.Bud
    instance?: App
    run: () => void
    kill: () => void
  }

  /**
   * React hooks.
   */
  export {hooks}
}
