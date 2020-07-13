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
 *
 * @typedef {mode: string} mode - 'production'|'development'
 */
const mode = argv?.env
  ? argv.env
  : env?.APP_ENV
  ? env.APP_ENV
  : 'production'

/**
 * inProduction
 * @typedef {inProduction: boolean} inProduction - true if build is running in production mode
 */
const inProduction = mode == 'production'

export {argv, inProduction, mode}
