import {
  Dashboard as Base,
  Error,
  Progress,
  Screen,
} from '@roots/bud-dashboard'
import {Service} from '@roots/bud-framework'

/**
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
