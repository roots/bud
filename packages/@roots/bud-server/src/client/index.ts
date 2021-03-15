const client = require('webpack-hot-middleware/client?quiet=true')
import {overlay} from './ErrorOverlay'
import {indicator} from './Indicator'

console.info(`[Bud] Development mode`)
console.info(
  `[Bud] You should NOT be seeing this message in production.`,
)

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
