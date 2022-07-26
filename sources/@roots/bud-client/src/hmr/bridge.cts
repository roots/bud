/* eslint-disable no-console */

/**
 * Typescript window interface declaration
 */

const {getEventSource} = require('./EventSource.cjs')
const processUpdate = require('./update.cjs')
const {options, override} = require('./options.cjs')

let handler: (payload: any) => unknown

function processMessage(obj) {
  if (!obj) {
    console.warn('empty update obj')
    return
  }

  processUpdate(obj.hash, obj.modules, options)
  handler(obj)
}

function connect(options) {
  getEventSource(options).addMessageListener(event => {
    if (event.data == '\uD83D\uDC93') {
      return
    }

    try {
      processMessage(JSON.parse(event.data))
      console.log('[bud] received update')
    } catch (ex) {
      console.info(ex)
    }
  })
}

export function setOptionsAndConnect(subscribeAll, overrides) {
  handler = subscribeAll
  override(overrides)
  connect(options)
}
