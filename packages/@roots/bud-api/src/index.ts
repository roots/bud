/**
 * @module @roots/bud-api
 */

import {Repository} from './repository'

declare module '@roots/bud-framework' {
  interface Framework extends Repository {}
}

/**
 * @exports Framework.Api
 */
export {Api} from './Api'

/**
 * @exports Framework.Api['repository']
 */
export * as repository from './repository'

/**
 * @exports Repository
 */
export type {Repository} from './repository'
