/* eslint-disable no-console */
/* global __resourceQuery */

import * as components from './components/index.js'
import {injectEvents} from './events.js'
import * as clientOptions from './options.js'

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
  const check = async () => {
    if (webpackHot.status() === `idle`)
      await webpackHot.check(true).then(async modules => {
        if (modules) await update()
      })
  }

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
        errors: [{name: error.name ?? error.moduleId ?? `error`, message}],
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

  /* Instantiate indicator, overlay */
  await components.make(options)

  /* Instantiate eventSource */
  const events = injectEvents(EventSource).make(options)

  const listener = async (payload: Payload) => {
    try {
      if (!payload) return

      components.controllers.map(controller => controller.update(payload))

      if (__webpack_hash__ !== payload.hash) await check()
    } catch (error) {
      console.error(`[bud]`, error)
    }
  }

  /* Instantiate HMR event source and register client listeners */
  events.addMessageListener(listener)
}
