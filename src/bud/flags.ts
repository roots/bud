import {argv} from 'yargs'
import {env} from './state/env'
import type {Mode, Production} from './types'

/**
 * --env
 */
const envFallback: string = 'none'
const envArgument: any = argv?.env
const envProject: string = env?.APP_ENV

const mode: Mode = envProject ?? envArgument ?? envFallback
const inDevelopment: Production = mode == 'development'
const inProduction: Production = mode == 'production'

/**
 * --hot
 */
const hotFallback: boolean = false
const hotArgument: any = argv?.hot
const hot = hotArgument ?? hotFallback

/**
 * --watch
 */
const watchFallback: boolean = false
const watchArgument: any = argv?.watch
const watch = watchArgument ? watchArgument : watchFallback

/**
 * --host
 */
const hostFallback: string = null
const hostArgument: any = argv?.watch
const host = hostArgument ?? hostFallback

/**
 * --port
 */
const portFallback: number = null
const portArgument: any = argv?.watch
const port = portArgument ?? portFallback

/**
 * --src
 */
const srcFallback: string = null
const srcArgument: any = argv?.watch
const src = srcArgument ?? srcFallback

/**
 * --dist
 */
const distFallback: string = null
const distArgument: any = argv?.watch
const dist = distArgument ?? distFallback

/**
 * --feature
 */
const featureFallback: string = null
const featureArgument: any = argv?.watch
const feature = featureArgument ?? featureFallback

export {
  argv as arguments,
  inDevelopment,
  inProduction,
  mode,
  hot,
  host,
  port,
  src,
  dist,
  feature,
  watch,
}
