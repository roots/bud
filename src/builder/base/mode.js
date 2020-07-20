import {argv} from 'yargs'
import {env} from './env'

/**
 * bud.mode
 *
 * Webpack mode ('development'|'production')
 *
 * Determined by the first match, in order of precedence:
 *
 *  - CLI args
 *  - env file
 *  - fallback ('production')
 */
const mode = argv?.env
  ? argv.env
  : env?.APP_ENV
  ? env.APP_ENV
  : 'production'

/**
 * inProduction
 */
const inProduction = mode == 'production'

export {argv, inProduction, mode}
