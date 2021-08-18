import {Framework} from '@roots/bud-framework'

/**
 * Bud is a frontend build framework combining the best parts of Symfony Encore and Laravel Mix
 *
 * @sealed
 */
interface Bud extends Framework {
  /**
   * Concrete implementation of the {@link Framework Framework interface}
   */
  implementation: Framework.Constructor
}

class Bud extends Framework {
  public implementation: Framework.Constructor

  /**
   * Class constructor
   */
  public constructor(options: Framework.Options) {
    super(options)

    this.implementation = Bud
  }
}

export {Bud, Framework}
