/* eslint-disable react-hooks/rules-of-hooks */

const {
  subscribeAll,
  useCustomOverlay,
} = require('webpack-hot-middleware/client')

import {overlay} from './ErrorOverlay'
import {indicator} from './Indicator'

const indicatorEl = indicator.init()
const overlayEl = overlay.init()

/**
 * Retrieves data on running application
 *
 * @public
 */
;(async () => {
  const res = await fetch('/__roots/config.json')
  const server = await res.json()

  useCustomOverlay(overlayEl)

  subscribeAll(payload => {
    server.browser.indicator && indicatorEl.update(payload)

    server.browser.overlay &&
      payload?.errors?.length &&
      overlay.showProblems('errors', payload.errors)

    if (payload.action === 'reload') window.location.reload()
  })
})()
