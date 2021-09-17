/* eslint-disable react-hooks/rules-of-hooks */

import {
  subscribeAll,
  useCustomOverlay,
} from 'webpack-hot-middleware/client'

import {overlay} from './ErrorOverlay'
import {indicator} from './Indicator'

/**
 * parse payloads from webpack-hot-middleware/client
 *
 * @param payload - raw whm payload
 * @returns parsed payload
 *
 * @public
 */
const parsePayload = payload => {
  return {
    complete: payload?.action == 'built',
    pending: payload?.action == 'building',
    hasWarnings: payload?.warnings?.length > 0,
    hasErrors: payload?.errors?.length > 0,
  }
}

/**
 * Retrieves data on running application
 *
 * @public
 */
const getServerData = async () => {
  const res = await fetch('/__roots/config.json')
  const server = await res.json()

  return server
}

/**
 * Client runtime
 *
 * @public
 */
const dev = async () => {
  const server = await getServerData()

  server.browser.overlay && useCustomOverlay(overlay)
  server.browser.indicator && indicator.init()

  subscribeAll(payload => {
    const {hasWarnings, hasErrors, pending, complete} =
      parsePayload(payload)

    server.browser.indicator &&
      indicator.update({
        payload,
        complete,
        pending,
        hasWarnings,
        hasErrors,
      })

    if (payload.action === 'reload') window.location.reload()
  })
}

dev()
