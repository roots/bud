/* eslint-disable react-hooks/rules-of-hooks */

/**
 * Retrieves data on running application
 *
 * @public
 */

;(async () => {
  const {overlay} = await import('./ErrorOverlay')
  const {indicator} = await import('./Indicator')

  const {
    setOptionsAndConnect,
    useCustomOverlay,
    subscribeAll,
  } = require('webpack-hot-middleware/client?autoConnect=false')

  const indicatorEl = indicator.init()
  const overlayEl = overlay.init()

  const res = await fetch('/__roots/config.json')
  const {server, ...app} = await res.json()

  const {log} = server.browser.log
    ? await import('./logger')
    : {log: () => {}}

  setOptionsAndConnect({
    name: app.name,
    overlay: true,
    overlayWarnings: true,
    quiet: true,
    reload: false,
  })

  server.browser.overlay && useCustomOverlay(overlayEl)

  subscribeAll(payload => {
    log(
      `${payload.action}${
        payload.time ? ` (${payload.time}ms)` : ``
      }`,
    )

    server.browser.indicator && indicatorEl.update(payload)

    server.browser.overlay &&
      payload?.errors?.length &&
      overlay.showProblems('errors', payload.errors)

    if (payload.action === 'reload') window.location.reload()
  })
})()
