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

interface Controller {
  update: (payload) => void
}

interface BaseOptions {
  timeout: number
  reload: boolean
  name: string
  path: string
}

interface Options extends BaseOptions {
  'bud.overlay': boolean
  'bud.indicator': boolean
}

import * as bridge from './bridge.js'

const run = async (query: string) => {
  if (typeof window === 'undefined') {
    return
  } else if (typeof window.EventSource === 'undefined') {
    return console.error(`\
The hot middleware client requires EventSource to work.
This browser requires a polyfill: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools,
`)
  }

  const querystring = await import('querystring')

  const controllers: Array<Controller> = []

  const FALLBACK_OPTS: Options = {
    ['bud.overlay']: true,
    ['bud.indicator']: true,
    timeout: 20 * 1000,
    reload: false,
    name: 'bud',
    path: '/__bud/hmr',
  }

  const options: Options = Object.entries(
    querystring.parse(query.slice(1)),
  ).reduce((a: Options, [k, v]: [keyof Options, any]) => {
    if (v === 'true') v = true
    if (v === 'false') v = false
    return {...a, [k]: v}
  }, FALLBACK_OPTS)

  if (options['bud.indicator']) {
    const controllerModule = await import(
      '../components/indicator/index.cjs'
    )
    const controller = await controllerModule.make()
    controller?.update && controllers.push(controller)
  }

  if (options['bud.overlay']) {
    const controllerModule = await import(
      '../components/overlay/index.cjs'
    )
    const controller = await controllerModule.make()
    controller?.update && controllers.push(controller)
  }

  bridge.setHandler(payload => {
    if (!payload) return
    if (payload.action === 'reload') window.location.reload()
    controllers.map(controller => controller.update(payload))
  })

  bridge.options.set(options)
  bridge.connect(bridge.options.get())
}

run(__resourceQuery)

export {}
