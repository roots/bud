/* eslint-disable react-hooks/rules-of-hooks */

/**
 * Retrieves data on running application
 *
 * @public
 */

;(async () => {
  const {overlay} = await import('./overlay')
  const {indicator} = await import('./Indicator')

  const {
    setOptionsAndConnect,
    useCustomOverlay,
    subscribeAll,
  } = require('webpack-hot-middleware/client?path=/__bud/hmr')

  const indicatorEl = indicator.init()
  const overlayEl = overlay.init()

  const res = await fetch('/__bud/config.json')
  const config = await res.json()
  const {log} = await import('./logger')

  setOptionsAndConnect({
    quiet: false,
    reload: false,
    path: config.hmr,
  })

  useCustomOverlay(overlayEl)

  subscribeAll(payload => {
    log(
      `${payload.action}${
        payload.time ? ` (${payload.time}ms)` : ``
      }`,
    )

    indicatorEl.update(payload)

    payload?.errors?.length &&
      overlay.showProblems('errors', payload.errors)

    if (payload.action === 'reload') window.location.reload()
  })
})()
