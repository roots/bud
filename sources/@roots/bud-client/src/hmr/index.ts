/* eslint-disable no-console */
/* global __resourceQuery */

declare global {
  const __resourceQuery: string

  interface Window {
    __webpack_hash__: string
    __whmEventSourceWrapper: any
    __webpack_public_path__: string
  }
}

export interface Payload {
  action: 'reload' | 'sync' | 'building' | 'built'
  hash?: string
  time?: number
  errors?: Array<string>
  warnings?: Array<string>
  message?: string
}

export interface Controller {
  update: (payload: Payload) => void
}

export interface Options {
  timeout: number
  reload: boolean
  name: string
  path: string
  indicator: boolean
  overlay: boolean
}

import * as bridge from './bridge.js'
import * as options from './options.js'

const run = async (query: string) => {
  if (typeof window === 'undefined') {
    return
  } else if (typeof window.EventSource === 'undefined') {
    return console.error(`\
The hot middleware client requires EventSource to work.
This browser requires a polyfill: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools,
`)
  }

  const controllers: Array<Controller> = []

  options.parseQuery(query)

  if (options.get().indicator) {
    const controllerModule = await import(
      '../components/indicator/index.js'
    )
    const controller = await controllerModule.make()
    controller?.update && controllers.push(controller)
  }

  if (options.get().overlay) {
    const controllerModule = await import(
      '../components/overlay/index.cjs'
    )
    const controller = await controllerModule.make()
    controller?.update && controllers.push(controller)
  }

  bridge.setHandler((payload: Payload) => {
    if (!payload) return
    if (payload.action === 'reload') window.location.reload()
    controllers.map(controller => controller.update(payload))
  })

  bridge.connect(options.get())
}

run(__resourceQuery)

// @ts-ignore
if (module?.hot) {
  // @ts-ignore
  module.hot.accept()
}
