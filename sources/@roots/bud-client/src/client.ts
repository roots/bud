/* eslint-disable no-console */
/* global __resourceQuery */

import './interface'

import * as components from './components/index.js'
import makeEventSource from './hmr/events.js'
import * as clientOptions from './options'

/**
 * Initializes bud.js HMR handling
 *
 * @public
 */
export default async (queryString: string) => {
  /**
   * Webpack hot interface
   */
  const webpackHot: __WebpackModuleApi.Hot = module.hot

  /* Set client options from URL params */
  const options = clientOptions.setFromParameters(queryString)

  /**
   * Returns true if environment supports HMR
   */
  if (typeof window?.EventSource === `undefined`) {
    console.error(
      `[bud] hot module reload requires EventSource to work. https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools`,
    )

    return false
  }

  /**
   * Webpack HMR check handler
   */
  const check = async () =>
    webpackHot.status() === `idle` &&
    (await webpackHot.check(false).then(async modules => {
      modules && (await update())
    }))

  /**
   * Webpack HMR unaccepted module handler
   */
  const onUnacceptedOrDeclined = (
    info: __WebpackModuleApi.HotNotifierInfo,
  ) => {
    console.warn(`[${options.name}] ${info.type}`, info)
    options.reload && window.location.reload()
  }

  /**
   * Webpack HMR error handler
   */
  const onErrored = error => {
    const message = `[${error?.moduleId ?? options.name}] ${
      error?.error ?? `error`
    }`
    console.error(message)
    components.controllers.map(controller =>
      controller.update({
        type: `accept-errored`,
        action: `built`,
        errors: [{message}],
      }),
    )
  }

  /**
   * Webpack HMR update handler
   */
  const update = async () => {
    webpackHot.status() === `ready` &&
      (await webpackHot.apply({
        autoApply: false,
        ignoreUnaccepted: true,
        ignoreDeclined: true,
        ignoreErrored: true,
        onErrored,
        onUnaccepted: onUnacceptedOrDeclined,
        onDeclined: onUnacceptedOrDeclined,
      }))
  }

  /* Instantiate eventSource */
  const eventSource = makeEventSource(global.EventSource).make(options)

  /* Instantiate indicator, overlay */
  await components.make(options)

  /* Instantiate HMR event source and register client listeners */
  eventSource.addMessageListener(async (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data)
      if (!data) return
      if (data.action === `reload`) window.location.reload()

      components.controllers.map(controller => controller.update(data))

      if (__webpack_hash__ !== eventSource.currentHash) await check()
    } catch (error) {}
  })
}
