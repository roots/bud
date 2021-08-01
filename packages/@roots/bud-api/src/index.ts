/**
 * @module @roots/bud-api
 */

import {Repository} from './repository'

declare module '@roots/bud-framework' {
  interface Framework extends Repository {}
}

export {Api} from './Api'

export * as repository from './repository'

export type {Repository} from './repository'
