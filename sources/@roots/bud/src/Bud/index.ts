import * as Framework from '@roots/bud-framework'

/**
 * ⚡️ Bud
 *
 * @public
 */
export class Bud extends Framework.Framework {
  /**
   * Constructor for producing additional Bud instances.
   *
   * @internal
   */
  public implementation: Framework.Constructor = Bud
}

/**
 * ⚡️ Bud
 *
 * @public
 */
export namespace Bud {
  /**
   * Application context
   * @see {@link }
   */
  export type Context = Framework.Context

  /**
   * Bud constructor options
   *
   * @public
   */
  export type Options = Framework.Options
}
