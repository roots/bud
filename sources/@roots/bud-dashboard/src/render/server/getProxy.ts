import type {Bud} from '@roots/bud-framework'

import * as formatUrl from './formatUrl.js'
import parsePort from './parsePort.js'

/**
 * Get formatted proxy url
 *
 * @public
 */
const getProxy = (app: Bud) => {
  const proxy = app.hooks.filter(`dev.middleware.proxy.target`)

  if (!proxy) return false

  return formatUrl.external(
    proxy.hostname,
    proxy.protocol,
    parsePort(proxy.port),
  )
}

export default getProxy
