import type {ClientRequest, IncomingMessage} from 'node:http'

import type {Bud} from '@roots/bud-framework'

import type {ApplicationURL} from '../url.js'

/**
 * Request interceptor factory
 *
 * @public
 */
const factory =
  (app: Bud, url: ApplicationURL) =>
  async (proxy: ClientRequest, request: IncomingMessage) => {
    if (proxy.headersSent) return

    try {
      /**
       * Acorn compat
       * Ideally, we use the headers included after this
       */
      proxy
        .setHeader(
          `x-bud-dev-pathname`,
          new URL(request.url, `http://${request.headers.host}`).pathname,
        )
        .setHeader(`x-bud-dev-origin`, url.dev.origin)
        .setHeader(`x-bud-dev-protocol`, url.dev.protocol)
        .setHeader(`x-bud-dev-hostname`, url.dev.hostname)
        .setHeader(
          `x-bud-request`,
          new URL(
            request.url,
            `${url.dev.protocol ?? `http:`}//${request.headers.host}`,
          ).toJSON(),
        )
    } catch (error) {
      app.error(error)
    }
  }

export {factory}
