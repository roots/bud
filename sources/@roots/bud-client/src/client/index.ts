/* eslint-disable no-console */

import {HMREvents} from './events.js'
import {options, parseURLParameters} from './options.js'
import hotUpdate from './update.js'

export default async (resourceQuery: typeof window.__resourceQuery) => {
  if (typeof window === 'undefined') return
  if (typeof window.EventSource === 'undefined') {
    return console.error(`\
The hot middleware client requires EventSource to work.
This browser requires a polyfill: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools,
`)
  }
  if (!module?.hot) {
    return console.error('[bud] hmr is unavailable')
  }

  parseURLParameters(resourceQuery)

  const controllers: Array<Controller> = []

  if (options.indicator) {
    await import('../indicator/index.js')
      .then(async controller => await controller.make())
      .then(controller => controllers.push(controller))
  }

  if (options.overlay) {
    await import('../overlay/index.js')
      .then(async controller => await controller.make())
      .then(controller => controllers.push(controller))
  }

  HMREvents.make(options).addMessageListener((event: MessageEvent) => {
    if (event.data == '\uD83D\uDC93') return

    const payload = JSON.parse(event.data)

    if (!payload) return
    if (payload.action === 'reload') window.location.reload()

    hotUpdate(payload.hash, payload.modules)
    controllers.map(controller => controller.update(payload))
  })
}
