const client = require('webpack-hot-middleware/client?quiet=true')
import {overlay} from './ErrorOverlay'
import {indicator} from './Indicator'

/**
 * Bud window
 */
window.bud = {
  client: {},
}

/**
 * Instantiate overlay
 */
client.useCustomOverlay(overlay)

/**
 * Loading indicator
 */
indicator.init()
client.subscribeAll(payload => {
  indicator.payload = payload
  indicator.update()
})
