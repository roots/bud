import {Constructor, Framework} from '@roots/bud-framework'

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @public @core
 */
export class Bud extends Framework {
  /**
   * @public
   */
  public implementation: Constructor = Bud
}
