import * as formatUrl from './formatUrl.js'
import parsePort from './parsePort.js'

/**
 * Get formatted proxy url
 *
 * @public
 */
const getProxy = (url?: URL) => {
  if (!url) return false

  const {protocol, port, hostname} = url

  if (!hostname || !port || !protocol) return false

  return formatUrl.external(protocol, hostname, parsePort(port))
}

export default getProxy
