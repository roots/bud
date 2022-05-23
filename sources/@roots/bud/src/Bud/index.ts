import {Bud as Base} from '@roots/bud-framework'

/**
 * ⚡️ Bud
 *
 * @public
 */
export class Bud extends Base {
  public constructor() {
    super(Bud)
    this.implementation = Bud
  }
}
