/* eslint-disable no-console */
/* global __resourceQuery */

import './interface'

import * as components from './components/index.js'
import * as hmr from './hmr/index.js'
import * as options from './options'

/**
 * Current runtime environment supports HMR
 *
 * @public
 */
const environmentIsSupported = async () => {
  if (typeof window === `undefined`) return false

  if (typeof window.EventSource === `undefined`) {
    console.error(`[bud] The hot middleware client requires EventSource to work. \
This browser requires a polyfill: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools \
`)
    return false
  }

  if (!module?.hot) {
    console.error(`[bud] hmr is unavailable`)
    return false
  }

  return true
}

/**
 *Initialize bud.js client tooling
 *
 * @public
 */
const initialize = async () => {
  if (!environmentIsSupported()) return

  console.log(__resourceQuery)

  /* Set client options from URL params */
  options.setFromParameters(__resourceQuery)
  console.log(options.data)

  /* Instantiate indicator, overlay */
  await components.make()

  /* Instantiate HMR event source and register client listeners */
  hmr.events
    .make(options.get())
    .addMessageListener((event: MessageEvent) => {
      if (event.data == `\uD83D\uDC93`) return // heartbeat

      const payload = JSON.parse(event.data)
      if (payload.action === `reload`) window.location.reload()

      components.controllers.map(controller => controller.update(payload))

      if (hmr.cache.initial) {
        hmr.cache.setInitial(false)
        return
      }
      hmr.cache.isStale(payload.hash) &&
        module.hot.status() === `idle` &&
        hmr.client.check()
    })
}

initialize()
