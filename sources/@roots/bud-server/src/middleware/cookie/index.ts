import {Bud} from '@roots/bud-framework/src'
import cookieParserMiddleware from 'cookie-parser'

/**
 * cookie middleware factory
 *
 * @public
 */
export interface cookie {
  (app: Bud): any
}

export const cookie = (_app: Bud) => cookieParserMiddleware()
