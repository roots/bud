import {externalNetworkInterface} from '@roots/bud-support/os'

import {formatUrl} from './formatUrl.js'

/**
 * Get formatted server url
 *
 * @public
 */
const getServer = (
  url?: URL,
): {internal: string; external: string} | false => {
  if (!url) return false

  const external = externalNetworkInterface.ipv4Url(url.protocol)
  external.port = url.port

  return {
    internal: formatUrl(url),
    external: external.origin,
  }
}

export default getServer
