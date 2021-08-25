import {
  Framework,
  Logger as Contract,
  Service,
} from '@roots/bud-framework'
import {Signale} from 'signale'
/**
 * @sealed
 */
declare class Logger extends Service implements Contract {
  /**
   * Logger instance
   */
  instance: Signale
  /**
   * Class constructor
   */
  constructor(app: Framework)
}
export {Logger}
//# sourceMappingURL=index.d.ts.map
