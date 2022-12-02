import type {ClientRequest} from 'node:http'

import type {Bud} from '@roots/bud-framework'

import type {ApplicationURL} from '../url.js'

/**
 * Request interceptor factory
 *
 * @public
 */
const factory =
  (_app: Bud, url: ApplicationURL) => async (proxy: ClientRequest) => {
    if (proxy.headersSent) return

    proxy
      .setHeader(`x-bud-origin`, url.dev.origin)
      .setHeader(`x-bud-protocol`, url.dev.protocol)
      .setHeader(`x-bud-hostname`, url.dev.hostname)
  }

export {factory}
