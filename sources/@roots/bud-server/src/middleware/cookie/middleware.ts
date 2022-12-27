import type {Bud} from '@roots/bud-framework'
import cookieParserMiddleware from '@roots/bud-support/cookie-parser'

export const middleware = (_app: Bud) => cookieParserMiddleware()
