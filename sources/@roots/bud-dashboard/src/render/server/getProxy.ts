import * as formatUrl from './formatUrl.js'
import parsePort from './parsePort.js'

/**
 * Get formatted proxy url
 *
 * @public
 */
const getProxy = (url?: {
  protocol: string
  hostname: string
  port: string
}) => {
  if (!url) return false

  const port = parsePort(url.port)

  return formatUrl.external(url.protocol, url.hostname, port)
}

export default getProxy
