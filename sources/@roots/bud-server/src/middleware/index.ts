import type {Bud} from '@roots/bud-framework'
import type {RequestHandler} from '@roots/bud-support/express'

export interface MiddlewareFactory {
  (app: Bud): RequestHandler
}

export * as cookie from '@roots/bud-server/middleware/cookie'
export * as dev from '@roots/bud-server/middleware/dev'
export * as hot from '@roots/bud-server/middleware/hot'
export * as proxy from '@roots/bud-server/middleware/proxy'
