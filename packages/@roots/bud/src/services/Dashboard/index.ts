import {
  Dashboard as Base,
  Error,
  Progress,
  Screen,
} from '@roots/bud-dashboard'
import {Service} from '@roots/bud-framework'

/**
 * Displays build progress, stats & errors in the terminal
 *
 * @public
 * @sealed
 */
class Dashboard extends Base implements Service {}

export {Dashboard}

/**
 * @hidden
 */
export {Screen}
/**
 * @hidden
 */
export {Error}
/**
 * @hidden
 */
export {Progress}
