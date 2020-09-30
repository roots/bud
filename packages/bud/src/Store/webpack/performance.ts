import {Configuration} from 'webpack'

/**
 * Disabled. Managed in @roots/bud-cli and @roots/bud-compiler.
 */
const performance: Configuration['performance'] = false

export {performance as default}
