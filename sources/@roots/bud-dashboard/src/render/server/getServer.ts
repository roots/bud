import type {Bud} from '@roots/bud-framework'
import {externalNetworkInterface} from '@roots/bud-support/os'

import * as formatUrl from './formatUrl.js'
import parsePort from './parsePort.js'

/**
 * Get formatted server url
 *
 * @public
 */
const getServer = (app: Bud) => {
  const {protocol, port, hostname: internal} = app.hooks.filter(`dev.url`)

  if (!internal || !port || !protocol) return false

  return {
    internal: formatUrl.internal(internal, protocol, parsePort(port)),
    external: formatUrl.external(
      externalNetworkInterface.ipv4,
      protocol,
      parsePort(port),
    ),
  }
}

export default getServer
