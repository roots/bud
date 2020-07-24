import {argv} from 'yargs'
import {env} from './state/env'
import type {Mode, Production} from './types'

/**
 * Fallback env
 */
const envFallback: string = 'production'

/**
 * specified via CLI arg
 */
const envArgument: any = argv.env

/**
 * specified via project .env
 */
const envProject: string = env?.APP_ENV || envFallback

/**
 * ## bud.mode
 *
 * Webpack mode ('development'|'production')
 *
 * Determined by the first match, in order of precedence:
 *
 *  - CLI args
 *  - env file
 *
 * Fallback is 'production'.
 */
const mode: Mode = envArgument ? envArgument : envProject

/**
 * ## bud.inProduction
 *
 * True if bud.mode is strictly equal to "production"
 */
const inProduction: Production = mode === 'production'

export {argv as arguments, inProduction, mode}
