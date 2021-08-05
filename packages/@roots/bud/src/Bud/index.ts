import {Framework} from '@roots/bud-framework'

/**
 * Bud
 */
class Bud extends Framework {
  /**
   * Concrete implementation of the {@link Framework Framework interface}
   *
   * @remark
   * Fulfills {@link Framework.implementation}
   */
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
