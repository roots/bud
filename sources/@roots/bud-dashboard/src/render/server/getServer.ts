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

  return {
    internal: formatUrl(url),
    external: externalNetworkInterface.ipv4Url(url.protocol).origin,
  }
}

export default getServer
