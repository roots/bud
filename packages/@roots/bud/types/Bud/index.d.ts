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
declare class Bud extends Framework {
  implementation: Framework.Constructor
  /**
   * Class constructor
   */
  constructor(options: Framework.Options)
}
export {Bud, Framework}
//# sourceMappingURL=index.d.ts.map
