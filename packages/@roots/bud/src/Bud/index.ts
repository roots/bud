import {
  Constructor,
  Framework,
  Options,
} from '@roots/bud-framework'

/**
 * Implements {@link @roots/bud-framework#Framework | the Framework abstract class}
 *
 * @public @core
 */
interface Contract extends Framework {
  /**
   * {@inheritDoc @roots/bud-framework#implementation}
   *
   * @public
   */
  implementation: Constructor
}

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * @public @core
 */
class Bud extends Framework implements Contract {
  /**
   * {@link Bud} class definition
   *
   * @remarks
   * Used internally when creating child Bud instances
   *
   * @public
   */
  public implementation: Constructor

  /**
   * Class constructor
   *
   * @param options - {@link @roots/bud-framework#Options}
   */
  public constructor(options: Options) {
    super(options)

    this.implementation = Bud
  }
}

export {Bud as default}
