import type {MiddlewareFactory} from '@roots/bud-server/middleware'

import cookieParserMiddleware from '@roots/bud-support/cookie-parser'

export const factory: MiddlewareFactory = () => cookieParserMiddleware()
