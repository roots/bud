import {isEqual} from 'lodash'
import {overlay} from './ErrorOverlay'
import {indicator} from './Indicator'
import {
  subscribeAll,
  useCustomOverlay,
} from 'webpack-hot-middleware/client'

const parsePayload = payload => {
  return {
    complete: payload?.action == 'built',
    pending: payload?.action == 'building',
    hasWarnings: payload?.warnings?.length > 0,
    hasErrors: payload?.errors?.length > 0,
  }
}

const getServerData = async () => {
  const res = await fetch('/__roots/config.json')
  const server = await res.json()

  return server
}

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

    isEqual(payload.action, 'reload') && window.location.reload()
  })
}

dev()
