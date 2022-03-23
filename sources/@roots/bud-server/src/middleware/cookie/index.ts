import {Framework} from '@roots/bud-framework/src'
import cookieParserMiddleware from 'cookie-parser'

/**
 * cookie middleware factory
 *
 * @public
 */
export interface cookie {
  (app: Framework): any
}

export const cookie = (app: Framework) => cookieParserMiddleware()
