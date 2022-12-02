import type {Socket} from 'node:net'

import type {Bud} from '@roots/bud-framework'

import type {ApplicationURL} from '../url.js'

const factory =
  (app: Bud, url: ApplicationURL) => (_proxySocket: Socket) => {
    app.log(`Proxy socket opened`, url.proxy.href, `=>`, url.dev.href)
  }

export {factory}
