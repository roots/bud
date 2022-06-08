import * as Framework from '@roots/bud-framework'

/**
 * ⚡️ Bud
 *
 * @public
 */
export default class Bud extends Framework.Bud {
  public constructor() {
    super(Bud)
    this.implementation = Bud
  }
}
