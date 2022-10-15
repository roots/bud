import {externalNetworkInterface} from '@roots/bud-support/os'

import * as formatUrl from './formatUrl.js'
import parsePort from './parsePort.js'

/**
 * Get formatted server url
 *
 * @public
 */
const getServer = (
  url?: URL,
): {internal: string; external: string} | false => {
  if (!url) return false

  const {protocol, port, hostname: internal} = url

  if (!internal || !port || !protocol) return false

  return {
    internal: formatUrl.internal(protocol, internal, parsePort(port)),
    external: formatUrl.external(
      protocol,
      externalNetworkInterface.ipv4,
      parsePort(port),
    ),
  }
}

export default getServer
