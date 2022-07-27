/* eslint-disable no-console */

/**
 * Typescript window interface declaration
 */

import * as eventSource from './eventsource.js'
import type {Options, Payload} from './index.js'
import update from './update.js'

let handler: (payload: Payload) => unknown

export const setHandler = (fn: (payload: Payload) => unknown) =>
  (handler = fn)

export const connect = (options: Options) => {
  eventSource.get(options).addMessageListener((event: MessageEvent) => {
    if (event.data == '\uD83D\uDC93') return

    try {
      const payload = JSON.parse(event.data)
      if (!payload) return

      update(payload.hash, payload.modules, options)
      handler(payload)
    } catch (e) {
      console.error(e)
    }
  })
}
