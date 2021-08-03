import {Framework} from '@roots/bud-framework'

/**
 * Bud
 *
 * @sealed
 */
class Bud extends Framework {
  public implementation: Framework.Constructor

  public constructor(options: Framework.Options) {
    super(options)

    this.implementation = Bud
  }
}

export {Bud, Framework}
