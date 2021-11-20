import * as Framework from '@roots/bud-framework'

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @public
 */
export class Bud extends Framework.Framework {
  /**
   * @public
   */
  public implementation: Framework.Constructor = Bud
}

/**
 * @public
 */
export namespace Bud {
  /**
   * Bud constructor options
   *
   * @public
   */
  export type Options = Framework.Options
}
