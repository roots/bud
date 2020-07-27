import {argv} from 'yargs'
import {env} from './state/env'
import type {Mode, Production} from './types'

/**
 * Env
 */
const envFallback: string = "none"
const envArgument: any = argv?.env
const envProject: string = env?.APP_ENV

/**
 * Mode
 */
const mode: Mode = envProject ?? envArgument ?? envFallback
const inProduction: Production = mode === "production"

export {argv as arguments, inProduction, mode}
