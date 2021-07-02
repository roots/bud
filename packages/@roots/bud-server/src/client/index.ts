const {overlay} = require('./ErrorOverlay')
const {indicator} = require('./Indicator')

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

const run = async () => {
  const server = await getServerData()

  const {
    subscribeAll,
    useCustomOverlay,
  } = require(`webpack-hot-middleware/client?quiet=false`)

  subscribeAll(({action}) => {
    if (action == 'reload') {
      window.location.reload()
    }
  })

  if (server.browser.overlay) useCustomOverlay(overlay)

  if (server.browser.indicator) {
    indicator.init()

    subscribeAll(payload => {
      const {hasWarnings, hasErrors, pending, complete} =
        parsePayload(payload)

      indicator.update({
        payload,
        complete,
        pending,
        hasWarnings,
        hasErrors,
      })
    })
  }
}

run()
