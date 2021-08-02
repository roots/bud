/**
 * @module @roots/bud
 */

import {
  Dashboard as Base,
  Error,
  Progress,
  Screen,
} from '@roots/bud-dashboard'
import {Service} from '@roots/bud-framework'

/**
 * Service: Dashboard
 */
class Dashboard extends Base implements Service<null> {}

export {Dashboard}

/**
 * @hidden
 */
export {Screen, Error, Progress}
