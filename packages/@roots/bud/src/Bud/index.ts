import {Framework} from '@roots/bud-framework'

/**
 * Implements {@link @roots/bud-framework#Framework | the Framework abstract class}
 *
 * @public @core
 */
interface Contract extends Framework {
  /**
   * {@inheritDoc @roots/bud-framework#Framework.implementation}
   *
   * @public
   */
  implementation: Framework.Constructor
}

/**
 * ⚡️ Bud - Frontend build tools combining the best parts of Symfony Encore and Laravel Mix
 *
 * Documentation:
 *
 * - [Bud usage guide](https://bud.js.org/guides/getting-started)
 *
 * - [Bud API documentation](https://bud.js.org/api/bud.bud)
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
  public implementation: Framework.Constructor

  /**
   * Class constructor
   *
   * @param options - {@link @roots/bud-framework#Framework.Options}
   */
  public constructor(options: Framework.Options) {
    super(options)

    this.implementation = Bud
  }
}

export {Bud as default}
