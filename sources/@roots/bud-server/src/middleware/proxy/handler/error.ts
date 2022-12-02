import type {Bud} from '@roots/bud-framework'
import type {IncomingMessage, ServerResponse} from 'webpack-dev-middleware'

import type {ApplicationURL} from '../url.js'

const factory =
  (app: Bud, url: ApplicationURL) =>
  (
    error: TypeError,
    req: IncomingMessage,
    res: ServerResponse,
    target?: string | URL,
  ) => {
    app.warn(req.url, error)
  }

export {factory}
