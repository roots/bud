/* eslint-disable no-console */

/**
 * Typescript window interface declaration
 */

import * as eventSource from './eventsource.js'
import * as options from './options.js'
import update from './update.js'

let handler: (payload: any) => unknown
export const setHandler = (fn: (payload: any) => unknown) => (handler = fn)

export const connect = options => {
  eventSource.get(options).addMessageListener(event => {
    if (event.data == '\uD83D\uDC93') return

    try {
      const payload = JSON.parse(event.data)
      if (!payload) return

      update(payload.hash, payload.modules, options)
      handler(payload)
    } catch (ex) {
      console.info(ex)
    }
  })
}

export {options}
