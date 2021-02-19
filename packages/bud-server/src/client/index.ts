import client from 'webpack-hot-middleware/client'
import {clientOverlay} from './overlay'

client.useCustomOverlay(clientOverlay)

client.subscribe(payload => {
  const shouldReload = payload.action == 'reload'

  console.log(payload)

  shouldReload &&
    (() => {
      console.log(payload.message)
      window.location.reload()
    })()
})
