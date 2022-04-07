import * as Framework from '@roots/bud-framework'

/**
 * ⚡️ Bud
 *
 * @public
 */
export class Bud extends Framework.Bud {
  /**
   * Constructor for producing additional Bud instances.
   *
   * @internal
   */
  public implementation = Bud
}

export namespace Bud {
  /**
   * Application context
   * @public
   */
  export type Context = Framework.Config.Context

  /**
   * Bud constructor options
   * @public
   */
  export type Options = Framework.Config.Options
}
